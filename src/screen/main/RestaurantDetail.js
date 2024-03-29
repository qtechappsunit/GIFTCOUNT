import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Wrapper from '../../components/Wrapper';
import Swiper from 'react-native-swiper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {getUserType, multipleImages} from '../../utils';
import themes from '../../assets/themes';
import SVGIcons from '../../components/SVGIcons';
import icons from '../../assets/icons';
import images from '../../assets/images';
import Button from '../../components/Button';

const RestaurantDetail = () => {
  const [role, setRole] = useState('');

  // console.log('rolee', role);

  useEffect(() => {
    getType();
  }, []);

  const getType = async () => {
    const type = await getUserType('role');
    setRole(type);
  };

  const renderImages = () => {
    return (
      <View style={styles.swiperWrapper}>
        <Swiper
          activeDotStyle={styles.activeStyle}
          dotColor={themes.secondary}
          dotStyle={styles.inactiveStyle}>
          {multipleImages.map(item => (
            <Image
              source={item.image}
              style={styles.imageStyle}
              borderBottomLeftRadius={30}
              borderBottomRightRadius={30}
            />
          ))}
        </Swiper>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View style={styles.contentWrapper}>
        <View style={styles.textWrapper}>
          <SVGIcons image={icons.star} />
          <Text style={styles.ratingText}>{'5.7'}</Text>
          <Text style={styles.validityText}>Validity</Text>
          <Text style={styles.dateText}>{'24-04-2024'}</Text>
        </View>
        <Text style={styles.name}>Rose Garden Restaurant</Text>
        <Text style={styles.descStyle}>
          Garden Restaurant is the perfect spot for an evening out. The historic
          white-columned Merritt House, restored and renovated to its gleaming
          splendor, is home to Galley and Garden.
        </Text>
      </View>
    );
  };

  const onOrderPress = () => {
    alert('working in progress');
  };

  const renderDiscountCard = () => {
    return (
      <>
        <View style={styles.wrapper}>
          <Image source={images.food} style={styles.foodStyle} />
          <View style={styles.discountView}>
            <Text style={styles.discountText}>Flat</Text>
            <Text style={styles.percentage}>50%</Text>
            <Text style={styles.discountText}>Discount</Text>
          </View>
        </View>
        {role == 'customer' && (
          <>
            <Button
              buttonText={'Order Now'}
              style={styles.button}
              onPress={() => onOrderPress()}
            />
          </>
        )}
      </>
    );
  };

  return (
    <Wrapper>
      <ScrollView>
        {renderImages()}
        {renderContent()}
        {renderDiscountCard()}
      </ScrollView>
    </Wrapper>
  );
};

export default RestaurantDetail;

const styles = StyleSheet.create({
  swiperWrapper: {
    height: Platform.OS === 'ios' ? hp('37%') : hp('45%'),
  },
  imageStyle: {
    width: '100%',
  },
  activeStyle: {
    borderColor: themes.white,
    backgroundColor: 'transparent',
    padding: hp('1%'),
    borderRadius: 100,
    borderWidth: 2,
  },
  inactiveStyle: {
    height: hp('1.5%'),
    width: hp('1.5%'),
    borderRadius: 100,
  },
  contentWrapper: {
    paddingTop: hp('2%'),
    padding: hp('2.5%'),
  },
  textWrapper: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingTop: hp('1%'),
  },
  ratingText: {
    color: themes.primary,
    marginRight: hp('0.7%'),
    fontWeight: 'bold',
  },
  validityText: {
    color: themes.red,
    fontWeight: 'bold',
  },
  dateText: {
    color: themes.primary,
    fontSize: hp('1.8%'),
  },
  name: {
    marginTop: hp('2%'),
    color: themes.black,
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
  },
  descStyle: {
    color: themes.white,
    fontSize: hp('1.9%'),
    marginTop: hp('2%'),
  },
  wrapper: {
    paddingTop: hp('1%'),
    flexDirection: 'row',
  },
  foodStyle: {
    height: hp('20%'),
    width: '55%',
  },
  discountView: {
    padding: hp('1%'),
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.primary,
  },
  discountText: {
    color: themes.black,
    fontSize: hp('2.5%'),
  },
  percentage: {
    fontSize: hp('7%'),
    color: themes.black,
    fontWeight: 'bold',
  },
  button: {
    alignSelf: 'center',
    marginTop: hp('4%'),
  },
});
