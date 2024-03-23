import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Wrapper from '../../components/Wrapper';
import Swiper from 'react-native-swiper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {multipleImages} from '../../utils';
import themes from '../../assets/themes';

const RestaurantDetail = () => {
  const renderImages = () => {
    return (
      <Swiper activeDotStyle={styles.activeStyle}>
        {multipleImages.map(item => (
          <Image source={item.image} style={styles.imageStyle} />
        ))}
      </Swiper>
    );
  };

  return <Wrapper>{renderImages()}</Wrapper>;
};

export default RestaurantDetail;

const styles = StyleSheet.create({
  swiperWrapper: {
    height: '50%',
  },
  imageStyle: {
    // height: hp('40%'),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: '100%',
  },
  activeStyle: {
    // height: hp('3%'),
    borderColor: themes.white,
    backgroundColor: 'transparent',
    padding: 5,
    borderRadius: 100,
    borderWidth: 2,
    // width: hp('3%'),
  },
});
