import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, { useCallback, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import CongratsModal from '../../components/CongratsModal';
import fonts from '../../assets/fonts';
import icons from '../../assets/icons';
import { useSelector } from 'react-redux';
import { SvgXml } from 'react-native-svg';
import ManualEntryModal from '../../components/ManualEntryModal';
import { RootState } from '../../Store/Reducer';
import { useGetAllCouponsQuery, useGetCuisineTypesQuery, useGetOwnerCouponsQuery } from '../../Store/services';
import Loader from '../../components/Loader';
import Button from '../../components/Button';


const Home = () => {
  const [catId, setCatId] = useState(0);
  const [visible, setVisible] = useState(false);
  const [manualCode, setManualCode] = useState(false);
  const [refreshing, setRefreshing] = useState(false)
  const { user } = useSelector((state: RootState) => state?.authReducer);

  const nav = useNavigation();

  const { refetch: refetchAllCoupons, data: getAllCoupons } = useGetAllCouponsQuery()
  const { refetch: refetchCuisineTypes, data: cuisineTypes, isLoading } = useGetCuisineTypesQuery()
  const { refetch: refetchOwnerCoupons, data: ownerCoupons } = useGetOwnerCouponsQuery()

  // console.log('dataaaa ',ownerCoupons)

  const allTypes = [{ id: 0, title: 'All', image: '' }, ...(cuisineTypes?.data || [])]

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
            catImage={{ uri: item.image }}
            catName={item.title}
            onCatPress={() => setCatId(item.id)}
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
        <Text style={styles.headerText}>{user?.type === 'owner' ? 'My Offers' : 'Available Coupons'}</Text>
      </View>
    );
  };

  const listEmptyComponent = () => {
    <Loader
      size={'large'}
      color={themes.primary}
      style={{ alignSelf: 'center' }}
    />
  }

  const renderCards = () => {
    return (
      <FlatList
        data={user?.type === 'owner' ? ownerCoupons?.data : getAllCoupons?.data}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <RestaurantCard
            key={index}
            name={item.coupon_name}
            onPress={() => nav.navigate(ROUTES.RestaurantDetail, { id: item?.id })}
            discount={`${item.discount}%`}
            validity={item.date_validation != '0000-00-00' ? item.date_validation : item.week_validation != '[]' ? JSON.parse(item.week_validation).join(',') : item.time_validation}
            image={item?.user?.profile_pic ? { uri: item?.user?.profile_pic } : images.dummy}
          />
        )}
        contentContainerStyle={styles.cardWrapper}
        ListEmptyComponent={listEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
      />
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      refetchCuisineTypes().then(() => {
        if (user?.type === 'owner') {
          refetchOwnerCoupons()
        } else {
          refetchAllCoupons()
        }
      }).finally(() => setRefreshing(false))
    }, 2000);
  }, []);

  return (
    <Wrapper>
      {isLoading ?
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
          <SearchBar placeholder={'Search dishes, restaurants'} />
          {user?.type === 'customer' &&
            <>
              <View style={styles.buttonView}>
                <Button buttonText='Scan Code' style={styles.buttonStyle} textStyle={styles.buttonText} onPress={() => nav.navigate(ROUTES.QRCode)} />
                <Button buttonText='Input Code' style={[styles.buttonStyle, { backgroundColor: 'white' }]} textStyle={{ color: themes.black }} onPress={() => setManualCode(true)} />
              </View>
              <ManualEntryModal visible={manualCode} setVisible={setManualCode} />
            </>
          }
          {renderCategories()}
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
});
