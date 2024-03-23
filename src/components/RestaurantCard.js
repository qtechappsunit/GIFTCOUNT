import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import images from '../assets/images';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import themes from '../assets/themes';
import SVGIcons from './SVGIcons';
import icons from '../assets/icons';

const RestaurantCard = ({onPress, name, items, rating, discount,date}) => {
  return (
    <TouchableOpacity
      style={styles.cardStyle}
      activeOpacity={0.9}
      onPress={onPress}>
      <View style={styles.wrapper}>
        <Image
          source={images.restaurant1}
          style={styles.imageStyle}
          borderRadius={12}
        />
        <View style={styles.discountStyle}>
          <Text style={styles.discountText}>{discount}</Text>
        </View>
      </View>
      <Text style={styles.name}>{name}</Text>
        <Text style={styles.itemText}>{items}</Text>
        <View style={styles.textWrapper}>
            <SVGIcons image={icons.star} />
            <Text style={styles.ratingText}>{rating}</Text>
          <Text style={styles.validityText}>Validity</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  cardStyle: {
    marginBottom: hp('7')
  },
  imageStyle: {
    height: hp('20%'),
    width: '95%',
  },
  discountStyle: {
    backgroundColor: themes.red,
    position: 'absolute',
    right: 32,
    bottom: hp('1%') - hp('3.5%'),
    marginBottom: hp('1%'),
    paddingVertical: hp('0.5%'),
    paddingHorizontal: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  discountText: {
    color: themes.white,
    marginBottom: hp('0.2%'),
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  wrapper: {
    position: 'relative',
  },
  name: {
    color: themes.white,
    fontSize: hp('2.2%'),
    marginTop: hp('3%'),
    fontWeight: 'bold',
  },
  itemText: {
    color: themes.primary,
    fontSize: hp('1.7%'),
    marginTop: hp('0.8%'),
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
  dateText:{
    color: themes.primary,
    fontSize: hp('1.8%')
  }
});
