import {Platform, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import themes from '../assets/themes';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SVGIcons from './SVGIcons';
import icons from '../assets/icons';
import fonts from '../assets/fonts';

const SearchBar = ({value, onChangeText, placeholder,style}) => {
  return (
    <View style={[styles.searchView, style]}>
      <SVGIcons image={icons.search} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={themes.light_black}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchView: {
    backgroundColor: themes.white,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    padding: Platform.OS === 'ios' ? hp('2.5%') : hp('1%'),
    width: '89%',
  },
  input: {
    width: '93%',
    color: themes.light_black,
    fontSize: hp(1.8),
    fontFamily: fonts.regular,
  },
});
