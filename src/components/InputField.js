import {Platform, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import themes from '../assets/themes';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SVGIcons from './SVGIcons';

const InputField = ({keyboardType, placeholder, value, onChangeText, icon, style, secureTextEntry}) => {
  return (
    <View style={[styles.inputStyle,style]}>
      <SVGIcons image={icon} style={styles.inputIcon} />
      <TextInput
        placeholder={placeholder}
        secureTextEntry
        placeholderTextColor={themes.placeholder_color}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: themes.navy_blue,
    flexDirection: 'row',
    padding: Platform.OS === 'ios' ? hp('2%') : hp('0.5%'),
    width: hp('40%'),
    borderRadius: 100,
  },
  input: {
    color: themes.placeholder_color,
    width: '80%',
    opacity: 0.7,
    fontSize: hp('2%'),
  },
  inputIcon: {
    marginLeft: Platform.OS === 'android' && hp('1%'),
    marginTop: Platform.OS === 'android' && hp('1.7%'),
  },
});
