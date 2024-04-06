import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import SVGIcons from './SVGIcons';
import icons from '../assets/icons';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import themes from '../assets/themes';
import images from '../assets/images';
import fonts from '../assets/fonts';

const Header = () => {
  return (
    <View style={styles.headerView}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.iconView}
          activeOpacity={0.9}
          // onPress={() => alert('working in progress')}
        >
          <SVGIcons image={icons.Menu} />
        </TouchableOpacity>
        <Text style={styles.userNameStyle}>Rider Name</Text>
      </View>
      <Image source={images.logo} style={styles.logoStyle} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    padding: hp('1.9%'),
    justifyContent: 'space-between',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    backgroundColor: themes.gray,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('6%'),
    width: hp('6%'),
    borderRadius: 100,
  },
  userNameStyle: {
    color: themes.primary,
    fontSize: hp('2.3%'),
    marginLeft: hp('1.5%'),
    fontFamily: fonts.markRegular,
  },
  logoStyle: {
    height: hp('14%'),
    width: hp('14%'),
  },
});
