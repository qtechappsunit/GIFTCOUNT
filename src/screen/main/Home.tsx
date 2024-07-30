import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Wrapper from '../../components/Wrapper';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FoodCategories from '../../components/FoodCategories';
import ROUTES, {categories, OptionsData, restaurants} from '../../utils';
import themes from '../../assets/themes';
import RestaurantCard from '../../components/RestaurantCard';
import {useNavigation} from '@react-navigation/native';
import CongratsModal from '../../components/CongratsModal';
import fonts from '../../assets/fonts';
import icons from '../../assets/icons';
import {useSelector} from 'react-redux';
import {SvgXml} from 'react-native-svg';
import OptionsMenu from '../../components/OptionsMenu';
import ManualEntryModal from '../../components/ManualEntryModal';
import { RootState } from '../../Store/Reducer';

const Home = () => {
  const {user} = useSelector((state: RootState) => state?.authReducer);
  const navigation = useNavigation();
  const nav = useNavigation();
  const [catId, setCatId] = useState(0);
  const [visible, setVisible] = useState(false);
  const [manualCode, setManualCode] = useState(false);

  const renderCategories = () => {
    return (
      <ScrollView
        horizontal
        style={styles.categoriesWrapper}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentWrapper}>
        {categories.map((item, i) => (
          <FoodCategories
            key={i}
            catImage={item.cat}
            catName={item.text}
            onCatPress={() => setCatId(i)}
            catStyle={{
              backgroundColor: catId == i ? themes.primary : themes.white,
            }}
          />
        ))}
      </ScrollView>
    );
  };

  const ListHeaderComponent = () => {
    const handleSelect = (index: number) => {
      if (index == 0) {
        nav.navigate(ROUTES.QRCode);
      } else {
        setManualCode(true);
      }
    };

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: hp(4),
        }}>
        <Text style={styles.headerText}>Available Coupons</Text>
        {user?.type === 'customer' && (
          <>
            <OptionsMenu
              data={OptionsData}
              onSelect={index => handleSelect(index)}
            />
            <ManualEntryModal visible={manualCode} setVisible={setManualCode} />
          </>
        )}
      </View>
    );
  };

  const renderCards = () => {
    return (
      <FlatList
        data={restaurants}
        scrollEnabled={false}
        renderItem={({item, index}) => (
          <RestaurantCard
            key={index}
            name={item.name}
            onPress={() => navigation.navigate(ROUTES.RestaurantDetail)}
            discount={item.discount}
            date={item.validity}
            image={item?.image}
            hour={item?.hours}
          />
        )}
        contentContainerStyle={styles.cardWrapper}
        ListHeaderComponent={ListHeaderComponent}
      />
    );
  };

  return (
    <Wrapper>
      <ScrollView
        // contentContainerStyle={styles.screen}
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
        {renderCategories()}
        {renderCards()}
      </ScrollView>
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
    paddingTop: hp('4%'),
    marginHorizontal: hp('-1%'),
    flexDirection: 'row',
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
});
