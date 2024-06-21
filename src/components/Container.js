import React from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import images from '../assets/images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Container = ({children, logo}) => {
  return (
    <ImageBackground
      source={images.bgImage}
      style={styles.bg}
      resizeMode="cover">
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.inner}
          automaticallyAdjustKeyboardInsets={true}>
          {logo ? <Image source={images.logo} style={styles.logo} /> : null}
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Container;

const styles = StyleSheet.create({
  inner: {
    paddingHorizontal: wp(3),
    overflow: 'visible',
  },
  logo: {
    resizeMode: 'contain',
    width: wp(40),
    height: wp(40),
    alignSelf: 'flex-end',
    marginTop: hp(3),
    marginBottom: -hp(4),
  },
  bg: {
    width: wp(100),
    height: hp(100),
  },
});
