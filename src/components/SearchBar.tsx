import {Platform, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';
import themes from '../assets/themes';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SVGIcons from './SVGIcons';
import icons from '../assets/icons';
import fonts from '../assets/fonts';

interface SearchBarProps {
  value: string,
  onChangeText: (param: string) => void,
  placeholder: string,
  style: ViewStyle,
  onSearchPress: () => void
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <View style={[styles.searchView, props.style]}>
     <TouchableOpacity activeOpacity={0.7} onPress={props.onSearchPress}> 
      <SVGIcons image={icons.search}/>
      </TouchableOpacity>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={themes.light_black}
        style={styles.input}
        value={props.value}
        onChangeText={props.onChangeText}
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
