import { Platform, StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import themes from '../assets/themes';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SVGIcons from './SVGIcons';
import fonts from '../assets/fonts';

const InputField = ({
  keyboardType,
  placeholder,
  value,
  onChangeText,
  icon,
  style,
  secureTextEntry,
  rightIcon,
  editable,
}) => {
  return (
    <View style={[styles.inputStyle, style]}>
      <SVGIcons image={icon} style={styles.inputIcon} />
      <TextInput
        placeholder={placeholder}
        secureTextEntry
        placeholderTextColor={themes.placeholder_color}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        editable={editable}
      />
      {rightIcon ? (
        <SVGIcons image={rightIcon} style={styles.inputIcon} />
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
