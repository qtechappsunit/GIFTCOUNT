import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import RedirectingModal from '../../components/RedirectingModal';
import {useNavigation} from '@react-navigation/native';
import fonts from '../../assets/fonts';

const RestaurantDetail = () => {
  const nav = useNavigation();
  const [role, setRole] = useState('');
  const [visible, setVisible] = useState(false);

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
        <TouchableOpacity onPress={() => nav.goBack()} style={styles.backArrow}>
          <SVGIcons
            image={icons.arrowNext}
            style={{transform: [{rotate: '180deg'}]}}
          />
        </TouchableOpacity>
        <Swiper
          activeDotStyle={styles.activeStyle}
          dotColor={themes.secondary}
          dotStyle={styles.inactiveStyle}>
          {multipleImages.map((item, ind) => (
            <Image
              key={ind}
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
              onPress={() => setVisible(!visible)}
            />
          </>
        )}
        <View style={{height: hp(1)}} />
        <RedirectingModal visible={visible} setVisible={setVisible} />
      </>
    );
  };

  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderImages()}
        {renderContent()}
        {renderDiscountCard()}
      </ScrollView>
    </Wrapper>
  );
};

export default RestaurantDetail;

const styles = StyleSheet.create({
  backArrow: {
    padding: 10,
    aspectRatio: 1,
    backgroundColor: themes.white,
    position: 'absolute',
    top: 15,
    zIndex: 10,
    borderRadius: 50,
    left: 15,
  },
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
    fontSize: hp(2.8),
    fontFamily: fonts.medium,
  },
  descStyle: {
    color: themes.white,
    fontSize: hp(2),
    marginTop: hp('2%'),
    fontFamily: fonts.regular,
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
    fontFamily: fonts.markRegular,
  },
  percentage: {
    fontFamily: fonts.markRegular,
    fontSize: hp('7%'),
    color: themes.black,
    fontWeight: 'bold',
  },
  button: {
    alignSelf: 'center',
    marginTop: hp('4%'),
  },
});
