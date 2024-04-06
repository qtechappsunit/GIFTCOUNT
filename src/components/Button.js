import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import themes from '../assets/themes';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import fonts from '../assets/fonts';

const Button = ({onPress, buttonText, style}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <Text style={styles.textStyle}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: themes.red,
    borderRadius: 10,
    width: hp('40%'),
    padding: hp('1.5%'),
  },
  textStyle: {
    color: themes.white,
    fontSize: hp('2%'),
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: fonts.bold,
  },
});
