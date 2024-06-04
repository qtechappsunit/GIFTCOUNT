import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import themes from '../assets/themes';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../assets/fonts';
import SVGIcons from './SVGIcons';

const Button = ({ onPress, buttonText, style, leftIcon }) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      {leftIcon ? (
        <SVGIcons image={leftIcon} style={styles.leftIcon} />
      ) : null}
      <Text style={styles.textStyle}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  leftIcon: {
    position: 'absolute',
    left: wp(6)
  },
  buttonStyle: {
    backgroundColor: themes.red,
    borderRadius: 10,
    width: hp('40%'),
    padding: hp(1.8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    color: themes.white,
    fontSize: hp('2%'),
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: fonts.bold,
  },
});
