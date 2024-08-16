import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Wrapper from '../../components/Wrapper';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FoodCategories from '../../components/FoodCategories';
import ROUTES from '../../utils';
import themes from '../../assets/themes';
import RestaurantCard from '../../components/RestaurantCard';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import CongratsModal from '../../components/CongratsModal';
import fonts from '../../assets/fonts';
import icons from '../../assets/icons';
import { useSelector } from 'react-redux';
import { SvgXml } from 'react-native-svg';
import ManualEntryModal from '../../components/ManualEntryModal';
import { RootState } from '../../Store/Reducer';
import { useLazyFilterCouponsByCuisineQuery, useLazyGetAllCouponsQuery, useLazyGetCuisineTypesQuery, useLazyGetCustomerCouponsQuery, useLazyGetOwnerCouponsQuery, useLazySearchCouponsQuery } from '../../Store/services';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import images from '../../assets/images';


const Home = () => {
  const [catId, setCatId] = useState(0);
  const [visible, setVisible] = useState(false);
  const [manualCode, setManualCode] = useState(false);
  const [refreshing, setRefreshing] = useState(false)
  const [search, setSearch] = useState('')
  const [searchPress, setSearchPress] = useState(false)
  const { user } = useSelector((state: RootState) => state?.authReducer);

  const nav = useNavigation();

  const [getAllCoupons, { data: allCoupons, isLoading: allCouponsLoader }] = useLazyGetAllCouponsQuery()
  const [getCuisineTypes, { data: cuisineTypes, isLoading: cuisineTypesLoader }] = useLazyGetCuisineTypesQuery()
  const [getOwnerCoupons, { data: ownerCoupons, isLoading: ownerCouponsLoader }] = useLazyGetOwnerCouponsQuery()
  const [searchCoupons, { data: searchedCoupons, isLoading: searchCouponsLoader }] = useLazySearchCouponsQuery()
  const [filterCouponsByCuisine, { data: filterCouponsByItem, isLoading: filterCouponsLoader }] = useLazyFilterCouponsByCuisineQuery()
  const [getCustomerCoupons, { data: customerCoupons, isLoading: customerCouponsLoader }] = useLazyGetCustomerCouponsQuery()

  // console.log('dataaaa ', customerCoupons?.data?.admin_coupons?.contact(customerCoupons?.data?.scanned_coupons))

  const isFocused = useIsFocused()


  const allTypes = [{ id: 0, title: 'All' }, ...(cuisineTypes?.data || [])]

  const getCouponsData = () => {
    if (search.length > 0 && searchPress) {
      return searchedCoupons?.data;
    }

    if (catId != 0) {
      return filterCouponsByItem?.data;
    }

    if (user?.type === 'owner') {
      return ownerCoupons?.data;
    }

    if (user?.type === 'customer') {
      const combinedCoupons = customerCoupons?.data?.scanned_coupons?.length > 0
        ? [...(customerCoupons?.data?.admin_coupons || []), ...customerCoupons?.data?.scanned_coupons]
        : customerCoupons?.data?.admin_coupons || [];
      return customerCoupons?.data?.admin_coupons;
    }

    return allCoupons?.data;
  };

  const coupons = getCouponsData();

  console.log('dataaaa', coupons)
  const heading = (() => {
    if (user?.type === 'owner') {
      return search?.length > 0 && searchPress ? 'Search Results' : catId != 0 ? 'Filter Results' : 'My Offers'
    } else {
      return search?.length > 0 && searchPress ? 'Search Results' : catId != 0 ? 'Filter Results' : 'Available Coupons'
    }
  })();

  const isLoading = allCouponsLoader || ownerCouponsLoader || searchCouponsLoader || filterCouponsLoader || customerCouponsLoader

  useEffect(() => {
    getCuisineTypes()
    if (user?.type === 'owner') {
      getOwnerCoupons()
    } else if (user?.type === 'customer') {
      getCustomerCoupons()
    } else {
      getAllCoupons()
    }

  }, [user?.type])

  useEffect(() => {

    if (isFocused) {
      getOwnerCoupons()
    }

  }, [isFocused])

  useEffect(() => {

    if (catId != 0) {
      filterCouponsByCuisine(catId)
      // alert('hello world')
    }

  }, [catId])

  useEffect(() => {

    if(search.length > 0 && searchPress) {
      searchCoupons(search)
    }

  },[search,searchPress])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getCuisineTypes().then(() => {
        if (user?.type === 'owner') {
          getOwnerCoupons()
        } else if (user?.type === 'customer') {
          getCustomerCoupons()
        } else {
          getAllCoupons()
        }
      }).finally(() => setRefreshing(false))
    }, 2000);
  }, []);

  const onPressCuisine = (id) => {
    setCatId(id)
  }

  const renderCategories = () => {
    return (
      <FlatList
        horizontal
        style={styles.categoriesWrapper}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentWrapper}
        data={allTypes}
        renderItem={({ item }) => (
          <FoodCategories
            key={item.id}
            catImage={item.id == 0 ? images.cat3 : { uri: item.image }}
            catName={item.title}
            onCatPress={() => onPressCuisine(item?.id)}
            catStyle={{
              backgroundColor: catId == item.id ? themes.primary : themes.white,
            }}
          />
        )}
      />
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: hp(4),
        }}>
        <Text style={styles.headerText}>{heading}</Text>
      </View>
    );
  };

  const listEmptyComponent = () => (
    <Text style={styles.message}>No Coupons Found</Text>
  )


  const renderCards = () => {
    return (
      isLoading ? (
        <Loader
          size={'large'}
          color={themes.primary}
          style={{ alignSelf: 'center', paddingTop: hp(5) }}
        />
      ) : (
        <FlatList
          data={coupons}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            // console.log('Rendering item:', item);

            const scannedValidity =
              item?.coupon?.date_validation !== '0000-00-00'
                ? item?.coupon?.date_validation
                : item?.coupon?.week_validation !== '[]'
                  ? JSON.parse(item?.coupon?.week_validation).join(',')
                  : '0000-00-00';

            const normalValidity =
              item?.date_validation !== '0000-00-00'
                ? item?.date_validation
                : item?.week_validation !== '[]'
                  ? JSON.parse(item?.week_validation).join(',')
                  : '0000-00-00';

            return (
              <RestaurantCard
                key={item.id}
                name={
                  item?.type
                    ? `${item?.coupon?.user?.restaurant_name} - ${item?.coupon?.coupon_name}`
                    : `${item?.user?.restaurant_name} - ${item.coupon_name}`
                }
                onPress={() =>
                  nav.navigate(ROUTES.RestaurantDetail, {
                    id: item?.type ? item?.coupon?.id : item?.id,
                  })
                }
                discount={
                  item?.type
                    ? `${item?.coupon?.discount}%`
                    : `${item.discount}%`
                }
                validity={item?.type ? scannedValidity : normalValidity}
                image={
                  item?.type && item?.coupon?.user?.profile_pic
                    ? { uri: item?.coupon?.user?.profile_pic }
                    : item?.user?.profile_pic
                      ? { uri: item?.user?.profile_pic }
                      : images.dummy
                }
                hour={
                  item?.type && item?.coupon?.time_validation
                    ? `(${item?.coupon?.time_validation})`
                    : item?.time_validation
                      ? `(${item.time_validation})`
                      : null
                }
              />
            );
          }}
          contentContainerStyle={styles.cardWrapper}
          ListEmptyComponent={listEmptyComponent}
          ListHeaderComponent={ListHeaderComponent}
        />
      )
    );
  };

  const onChangeText = async (text) => {
    setSearch(text)
    if (text.length < 1) {
      setSearchPress(false)
    }
  }

  const onSearchIcon = () => {
    setSearchPress(true)
  }

  return (
    <Wrapper>
      {cuisineTypesLoader ?
        <View style={styles.loaderView}>
          <Loader
            size={'large'}
            color={themes.primary}
            style={{ alignSelf: 'center' }}
          />
        </View>
        :
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => onRefresh()}
              refreshing={refreshing}
              colors={[themes.red]}
              tintColor={themes.white}
            />
          }
          showsVerticalScrollIndicator={false}>
          <Header />
          {user?.type == 'owner' ? (
            <TouchableOpacity
              onPress={() => nav.navigate(ROUTES.CreateCouponScreen)}
              style={styles.addCouponView}>
              <View style={styles.addIconView}>
                <SvgXml xml={icons.addOutlineWhiteIcon} />
              </View>
              <Text style={styles.addText}>Add Discount Coupon</Text>
            </TouchableOpacity>
          ) : null}
          <SearchBar placeholder={'Search dishes, restaurants'} value={search} onChangeText={(text) => onChangeText(text)} onSearchPress={() => onSearchIcon()} />
          {user?.type === 'customer' &&
            <>
              <View style={styles.buttonView}>
                <Button buttonText='Scan Code' style={styles.buttonStyle} textStyle={styles.buttonText} onPress={() => nav.navigate(ROUTES.QRCode)} />
                <Button buttonText='Input Code' style={[styles.buttonStyle, { backgroundColor: 'white' }]} textStyle={{ color: themes.black }} onPress={() => setManualCode(true)} />
              </View>
              <ManualEntryModal visible={manualCode} setVisible={setManualCode} />
            </>
          }
          {!searchPress && renderCategories()}
          {renderCards()}
        </ScrollView>
      }
      <CongratsModal modalVisible={visible} setModalVisible={setVisible} />
    </Wrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  addText: {
    fontSize: wp(5.5),
    marginTop: wp(2),
    color: themes.white,
    fontFamily: fonts.lexendBold,
  },
  addIconView: {
    padding: 10,
    borderWidth: 1,
    borderColor: themes.white,
    borderRadius: 50,
    aspectRatio: 1,
  },
  addCouponView: {
    alignItems: 'center',
    alignSelf: 'center',
    width: wp(82),
    padding: wp(5),
    marginBottom: wp(5),
    borderWidth: 5,
    borderColor: themes.red1,
    borderRadius: 10,
  },
  seeText: {
    color: themes.primary,
    fontFamily: fonts.regular,
  },
  categoriesWrapper: {
    paddingTop: hp('2%'),
    marginHorizontal: hp('-1%'),
  },
  contentWrapper: {
    paddingHorizontal: hp('3%'),
  },
  cardWrapper: {
    paddingTop: hp('5%'),
    marginLeft: hp(2.4),
  },
  headerText: {
    color: themes.heading,
    fontWeight: 'bold',
    fontSize: hp('2.8%'),
    fontFamily: fonts.bold,
  },
  iconStyle: {
    height: hp('3.7%'),
    alignSelf: 'center',
    marginRight: hp(2),
    tintColor: themes.heading,
    width: hp('3.7%'),
  },
  loaderView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  buttonView: {
    flexDirection: 'row',
    padding: hp(2.3),
    marginTop: hp(1),
    gap: 12,
  },
  buttonStyle: {
    width: '48.5%',
    borderRadius: 50,
    padding: hp(1)
  },
  message: {
    color: themes.primary,
    fontSize: hp(2.5),
    alignSelf: 'center',
    fontFamily: fonts.markRegular
  }
});
