import { StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import themes from '../assets/themes';
import images from '../assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const AuthContainer = ({ children, logoImageStyle, scrollEnabled }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.backgroundStyle} scrollEnabled={scrollEnabled}>
      <Image source={images.background} style={styles.imageStyle} />
      <Image source={images.logo} style={[styles.logoStyle, logoImageStyle]} />
      {children}
    </ScrollView>
  );
};

export default AuthContainer;

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: themes.secondary,
    flex: 1,
    paddingHorizontal: wp(3)
  },
  imageStyle: {
    opacity: 0.2,
    top: hp('-24%'),
    position: 'absolute',
    width: '100%',
    height: hp('55%'),
  },
  logoStyle: {
    height: hp('35%'),
    marginVertical: hp('17%'),
    alignSelf: 'center',
    width: hp('35%'),
    resizeMode: 'contain',
  },
});
