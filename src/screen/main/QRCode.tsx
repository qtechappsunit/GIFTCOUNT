import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
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
import {useSelector} from 'react-redux';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('window').height;

const QRCode = () => {
  const {userType} = useSelector(state => state.authReducer);

  const nav = useNavigation();

  const onSuccess = e => {
    console.log('onSuccess e', e);
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     nav.navigate(ROUTES.Points);
  //   }, 2000);
  // }, []);

  const QRCodeImage = () => {
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
              <Image source={images.QRimage} style={styles.qrImage} />
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

  const QRCodeCamera = () => {
    return (
      <View>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => nav.goBack()}
            style={[
              styles.backView,
              {
                alignItems: 'center',
                backgroundColor: themes.red,
                borderRadius: 19,
                justifyContent: 'center',
                position: 'absolute',
                left: 20,
                top: 20,
                zIndex: 1,
              },
            ]}>
            <SVGIcons
              image={icons.arrowNext}
              style={{transform: [{rotate: '180deg'}]}}
            />
          </TouchableOpacity>
        </View>
        <QRCodeScanner
          cameraType="back"
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.torch} 
          cameraStyle={styles.cameraCont}
        />
        <Image
          source={images.redCorner}
          style={[styles.redcorner1, {top: hp(5), left: hp(5)}, styles.redImg]}
        />
        <Image
          source={images.redCorner}
          style={[styles.redcorner2, {top: hp(5), right: hp(5)}, styles.redImg]}
        />
        <Image
          source={images.redCorner}
          style={[
            styles.redcorner3,
            {bottom: -hp(85), left: hp(5)},
            styles.redImg,
          ]}
        />
        <Image
          source={images.redCorner}
          style={[
            styles.redcorner4,
            {bottom: -hp(85), right: hp(5)},
            styles.redImg,
          ]}
        />
      </View>
    );
  };

  return userType === 'rider' ? QRCodeImage() : QRCodeCamera();
};

export default QRCode;

const styles = StyleSheet.create({
  qrImage: {
    resizeMode: 'contain',
    width: wp(60),
    height: wp(60),
  },
  redcorner4: {
    position: 'absolute',
    bottom: -hp(14),
    right: 0,
    transform: [{rotate: '180deg'}],
  },
  redcorner3: {
    position: 'absolute',
    bottom: -hp(14),
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
    height: height,
    width: width,
  },
  redCorners: {
    marginTop: hp(2),
    padding: wp(5),
    paddingBottom: wp(10),
    alignSelf: 'center',
  },
  desText: {
    color: themes.darkBlue,
    fontSize: wp(5),
    textAlign: 'center',
    fontFamily: fonts.bold,
    marginBottom: wp(5),
  },
  qrView: {
    width: wp(80),
    backgroundColor: themes.primary,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: hp(15),
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
    marginLeft: hp(0.7),
    borderRadius: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: hp(7),
  },
  cont: {
    height: hp(110),
    width: wp(100),
    padding: wp(3),
  },
});
