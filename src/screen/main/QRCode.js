import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../../components/AuthContainer';
import images from '../../assets/images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SVGIcons from '../../components/SVGIcons';
import icons from '../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import themes from '../../assets/themes';
import fonts from '../../assets/fonts';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import ROUTES from '../../utils';

const {height, width} = Dimensions.get('window');

const QRCode = () => {
  const nav = useNavigation();

  const onSuccess = e => {
    console.log('onSuccess e', e);
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );
  };

  useEffect(() => {
    setTimeout(() => {
      nav.navigate(ROUTES.Points);
    }, 2000);
  }, []);

  return (
    <ImageBackground
      style={styles.cont}
      source={images.splashBg}
      resizeMode={'cover'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => nav.goBack()}
            style={styles.backView}>
            <SVGIcons
              image={icons.arrowNext}
              style={{transform: [{rotate: '180deg'}]}}
            />
          </TouchableOpacity>
          <Text style={styles.headText}>Scan QR Code</Text>
          <View />
        </View>
        <View style={styles.qrView}>
          <Text style={styles.desText}>
            Scan the QR Code to {'\n'} Collect your Points
          </Text>
          <TouchableOpacity style={styles.redCorners}>
            <QRCodeScanner
              cameraType="back"
              onRead={onSuccess}
              flashMode={RNCamera.Constants.FlashMode.torch}
              cameraStyle={styles.cameraCont}
            />
            <Image
              source={images.redCorner}
              style={[styles.redcorner1, styles.redImg]}
            />
            <Image
              source={images.redCorner}
              style={[styles.redcorner2, styles.redImg]}
            />
            <Image
              source={images.redCorner}
              style={[styles.redcorner3, styles.redImg]}
            />
            <Image
              source={images.redCorner}
              style={[styles.redcorner4, styles.redImg]}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default QRCode;

const styles = StyleSheet.create({
  redcorner4: {
    position: 'absolute',
    bottom: -hp(17),
    right: 0,
    transform: [{rotate: '180deg'}],
  },
  redcorner3: {
    position: 'absolute',
    bottom: -hp(17),
    left: 0,
    transform: [{rotateX: '180deg'}],
  },
  redcorner2: {
    position: 'absolute',
    top: -hp(17),
    right: 0,
    transform: [{rotateY: '180deg'}],
  },
  redcorner1: {
    position: 'absolute',
    top: -hp(17),
    left: 0,
  },
  redImg: {
    resizeMode: 'contain',
    width: wp(10),
    aspectRatio: 1,
    zIndex: 10,
  },
  cameraCont: {
    height: hp(45),
    width: wp(55),
    alignSelf: 'center',
  },
  redCorners: {
    width: wp(70),
    height: hp(50),
    marginTop: hp(2),
    padding: wp(5),
    alignSelf: 'center',
  },
  desText: {
    color: themes.darkBlue,
    fontSize: wp(5),
    textAlign: 'center',
    fontFamily: fonts.bold,
  },
  qrView: {
    width: wp(80),
    backgroundColor: themes.primary,
    alignSelf: 'center',
    padding: 10,
    marginTop: hp(10),
    borderRadius: 15,
  },
  headText: {
    color: themes.darkBlue,
    fontSize: wp(6),
    fontFamily: fonts.bold,
  },
  backView: {
    backgroundColor: themes.red,
    padding: 8,
    aspectRatio: 1,
    borderRadius: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cont: {
    height: height,
    width: width,
    padding: wp(3),
  },
});
