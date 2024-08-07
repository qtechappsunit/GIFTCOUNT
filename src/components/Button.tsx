import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';
import themes from '../assets/themes';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../assets/fonts';
import SVGIcons from './SVGIcons';
import Loader from './Loader';

interface ButtonProps {
  onPress: () => void,
  buttonText: string,
  style: ViewStyle,
  leftIcon: string,
  indicator: boolean,
  textStyle: ViewStyle
}

const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, props.style]}
      onPress={props.onPress}
      activeOpacity={0.9}>
      {props.leftIcon ? (
        <SVGIcons image={props.leftIcon} style={styles.leftIcon} />
      ) : null}
      {props.indicator ?
        <Loader size={'small'} color={themes.white} />
      :
      <Text style={[styles.textStyle,props.textStyle]}>{props.buttonText}</Text>
    }
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
