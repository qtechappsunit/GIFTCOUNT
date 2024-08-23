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
import ROUTES, {couponsData, foodCategories} from '../../utils';
import themes from '../../assets/themes';
import RestaurantCard from '../../components/RestaurantCard';
import {useNavigation} from '@react-navigation/native';
import CongratsModal from '../../components/CongratsModal';
import fonts from '../../assets/fonts';
import icons from '../../assets/icons';
import {useSelector} from 'react-redux';
import {SvgXml} from 'react-native-svg';
import ManualEntryModal from '../../components/ManualEntryModal';
import {RootState} from '../../Store/Reducer';
import Button from '../../components/Button';

const Home = () => {
  const [catId, setCatId] = useState(1);
  const [visible, setVisible] = useState(false);
  const [manualCode, setManualCode] = useState(false);
  const [search, setSearch] = useState('');
  const {userType} = useSelector((state: RootState) => state?.authReducer);

  const nav = useNavigation();

  const renderCategories = () => {
    return (
      <FlatList
        horizontal
        style={styles.categoriesWrapper}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentWrapper}
        data={foodCategories}
        renderItem={({item}) => (
          <FoodCategories
            key={item.id}
            catImage={item.image}
            catName={item.title}
            onCatPress={() => setCatId(item?.id)}
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
        <Text style={styles.headerText}>
          {userType === 'owner' ? 'My Offers' : 'Available Coupons'}
        </Text>
      </View>
    );
  };

  const renderCards = () => {
    return (
      <FlatList
        data={couponsData}
        scrollEnabled={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          // console.log('Rendering item:', item);
          return (
            <RestaurantCard
              key={item.id}
              name={item.title}
              onPress={() => nav.navigate(ROUTES.RestaurantDetail)}
              discount={`${item.discount}%`}
              validity={item?.validity}
              image={item.coupon_image}
              hour={item.hours}
            />
          );
        }}
        contentContainerStyle={styles.cardWrapper}
        ListHeaderComponent={ListHeaderComponent}
      />
    );
  };

  const onChangeText = async text => {
    setSearch(text);
  };

  return (
    <Wrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <Header />
        {userType == 'owner' ? (
          <TouchableOpacity
            onPress={() => nav.navigate(ROUTES.CreateCouponScreen)}
            style={styles.addCouponView}>
            <View style={styles.addIconView}>
              <SvgXml xml={icons.addOutlineWhiteIcon} />
            </View>
            <Text style={styles.addText}>Add Discount Coupon</Text>
          </TouchableOpacity>
        ) : null}
        <SearchBar
          placeholder={'Search dishes, restaurants'}
          value={search}
          onChangeText={text => onChangeText(text)}
        />
        {userType === 'customer' && (
          <>
            <View style={styles.buttonView}>
              <Button
                buttonText="Scan Code"
                style={styles.buttonStyle}
                textStyle={styles.buttonText}
                onPress={() => nav.navigate(ROUTES.QRCode)}
              />
              <Button
                buttonText="Input Code"
                style={[styles.buttonStyle, {backgroundColor: 'white'}]}
                textStyle={{color: themes.black}}
                onPress={() => setManualCode(true)}
              />
            </View>
            <ManualEntryModal visible={manualCode} setVisible={setManualCode} />
          </>
        )}
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
    flex: 1,
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
    padding: hp(1),
  },
  message: {
    color: themes.primary,
    fontSize: hp(2.5),
    alignSelf: 'center',
    fontFamily: fonts.markRegular,
  },
});
