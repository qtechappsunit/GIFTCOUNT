import { FlatList, ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Wrapper from '../../components/Wrapper';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FoodCategories from '../../components/FoodCategories';
import ROUTES, { categories, restaurants } from '../../utils';
import themes from '../../assets/themes';
import RestaurantCard from '../../components/RestaurantCard';
import { useNavigation } from '@react-navigation/native';
import CongratsModal from '../../components/CongratsModal';
import fonts from '../../assets/fonts';
import icons from '../../assets/icons';
import { useSelector } from 'react-redux';
import { SvgXml } from 'react-native-svg';

const Home = () => {
  const { userType } = useSelector(state => state?.authReducer);
  const navigation = useNavigation();
  const nav = useNavigation();
  const [catId, setCatId] = useState(0);
  const [visible, setVisible] = useState(false);

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

  const renderCards = () => {
    return (
      <FlatList
        data={restaurants}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
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
        ListHeaderComponent={() => (
          <View style={styles.openRestaurantView}>
            <Text style={styles.headerText}>Available Coupons</Text>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.seeText}>See All</Text>
              <SVGIcons image={icons.seeAllArrow} />
            </View> */}
          </View>
        )}
      />
    );
  };

  return (
    <Wrapper>
      <Header />
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}>
        {userType == 'owner' ? (
          <TouchableOpacity onPress={() => nav.navigate(ROUTES.CreateCouponScreen)} style={styles.addCouponView}>
            <View style={styles.addIconView}>
              <SvgXml xml={icons.addOutlineWhiteIcon} />
            </View>
            <Text style={styles.addText}>Add Discount Coupon</Text>
          </TouchableOpacity>
        ) : null}
        <SearchBar />
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
    aspectRatio: 1
  },
  addCouponView: {
    alignItems: 'center',
    width: wp(89),
    padding: wp(5),
    marginBottom: wp(5),
    borderWidth: 5,
    borderColor: themes.red1,
    borderRadius: 10
  },
  seeText: {
    color: themes.primary,
    fontFamily: fonts.regular,
  },
  openRestaurantView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(90),
    justifyContent: 'space-between',
    marginBottom: hp(3),
  },
  screen: {
    marginLeft: hp('2.5%'),
  },
  categoriesWrapper: {
    paddingTop: hp('4%'),
    marginHorizontal: hp('-3%'),
    flexDirection: 'row',
  },
  contentWrapper: {
    paddingHorizontal: hp('3%'),
  },
  cardWrapper: {
    paddingTop: hp('5%'),
  },
  headerText: {
    color: themes.heading,
    fontWeight: 'bold',
    fontSize: hp('2.8%'),
    fontFamily: fonts.bold,
  },
});
