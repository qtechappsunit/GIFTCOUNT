import { Platform, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import React from 'react';
import themes from '../assets/themes';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SVGIcons from './SVGIcons';
import fonts from '../assets/fonts';

interface InputProps {
  keyboardType: 'default' | 'numeric' | 'number-pad' | 'decimal-pad' | 'phone-pad' | 'email-address' | 'url' | 'visible-password',
  placeholder: string,
  value: string,
  onChangeText: (param: string) => void,
  icon: string,
  style: ViewStyle,
  secureTextEntry: boolean,
  rightIcon: string,
  editable: boolean,
  textColor: string
}

const InputField = (props: InputProps) => {
  return (
    <View style={[styles.inputStyle, props.style]}>
      <SVGIcons image={props.icon} style={styles.inputIcon} />
      <TextInput
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        placeholderTextColor={props.textColor ? props.textColor : themes.placeholder_color}
        style={[styles.input, { color: props.textColor }]}
        value={props.value}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        editable={props.editable}
      />
      {props.rightIcon ? (
        <SVGIcons image={props.rightIcon} style={styles.inputIcon} />
      ) : null}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: themes.navy_blue,
    flexDirection: 'row',
    padding: Platform.OS === 'ios' ? hp('2%') : hp('0.5%'),
    width: wp(85),
    borderRadius: 100,
    alignItems: "center"
  },
  input: {
    color: themes.placeholder_color,
    width: '80%',
    opacity: 0.7,
    fontSize: hp('2%'),
    fontFamily: fonts.regular,
  },
  inputIcon: {
    marginLeft: Platform.OS === 'android' && hp('1%'),
  },
});
