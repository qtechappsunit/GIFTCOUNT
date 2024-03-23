import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import themes from '../assets/themes';

const FoodCategories = ({catName, catImage, onCatPress, catStyle}) => {
  return (
    <TouchableOpacity style={[styles.categoryStyle,catStyle]} activeOpacity={0.9} onPress={onCatPress}>
      <Image source={catImage} style={styles.imageStyle} borderRadius={100} />
      <Text style={styles.text}>{catName}</Text>
    </TouchableOpacity>
  );
};

export default FoodCategories;

const styles = StyleSheet.create({
  categoryStyle: {
    padding: hp('1%'),
    alignItems: 'center',
    borderRadius: 100,
    marginRight: hp('2%'),
  },
  imageStyle: {
    height: hp('6%'),
    width: hp('6%'),
  },
  text: {
    color: themes.light_black,
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
  },
});
