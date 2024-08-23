import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import themes from '../assets/themes';
import images from '../assets/images';
import fonts from '../assets/fonts';

const Header = () => {
  return (
    <View style={styles.headerView}>
      <View style={styles.wrapper}>
        {/* <TouchableOpacity
          style={styles.iconView}
          activeOpacity={0.9}
          // onPress={() => alert('working in progress')}
        >
          <SVGIcons image={icons.Menu} />
        </TouchableOpacity> */}
        <Image source={images.userImage} style={styles.userImage} />
        <Text style={styles.userNameStyle}>{'Mark'}</Text>
      </View>
      <Image source={images.logo} style={styles.logoStyle} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  userImage: {
    width: wp(15),
    height: wp(15),
    borderRadius: 100,
    // resizeMode: 'contain'
  },
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
