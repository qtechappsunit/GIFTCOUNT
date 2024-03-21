import {ImageBackground, StyleSheet, Image} from 'react-native';
import React from 'react';
import themes from '../assets/themes';
import images from '../assets/images';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AuthContainer = ({children, logoImageStyle}) => {
  return (
    <ImageBackground
      style={styles.backgroundStyle}
      source={images.background}
      imageStyle={styles.imageStyle}>
        <Image 
          source={images.logo}
          style={[styles.logoStyle,logoImageStyle]}
        />
      {children}
    </ImageBackground>
  );
};

export default AuthContainer;

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: themes.secondary,
    flex: 1,
  },
  imageStyle: {
    opacity: 0.2,
    top: hp('-24%'),
    position: 'absolute',
    width: '100%', 
    height: hp('55%')
  },
  logoStyle:{
    height: hp('40%'),
    marginVertical: hp('17%'),
    alignSelf: 'center',
    width: hp('40%')
  },

});
