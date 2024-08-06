import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
  Alert,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import images from '../../assets/images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SVGIcons from '../../components/SVGIcons';
import icons from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import themes from '../../assets/themes';
import fonts from '../../assets/fonts'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/Reducer';
import QRCodeGenerator from 'react-native-qrcode-svg';
import { useQrCodeScanMutation } from '../../Store/services';
import { parseQRCodeData, ShowMessage, validateQRCodeFormat } from '../../utils';
import Spinner from 'react-native-loading-spinner-overlay';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('window').height;

const QRCode = ({ route }) => {
  const [scanning, setScanning] = useState(true);
  const scanTimeoutRef = useRef(null);
  const { user } = useSelector((state: RootState) => state.authReducer);
  const [qrCodeScan, { isLoading }] = useQrCodeScanMutation()

  const nav = useNavigation();

  const { driver_id, coupon_id } = route?.params || {};
  console.log('driver id', driver_id )
  console.log('coupon id',coupon_id)

  const qrCodeValue = `${driver_id}:${coupon_id}`;

  useEffect(() => {
   if(user?.type === 'customer') { 
    scanTimeoutRef.current = setTimeout(() => {
      if (scanning) {
        ShowMessage('QRCODE', 'The QR code could not be read. Please try again.','warning');
        setScanning(false);
      }
    }, 10000); 

    return () => clearTimeout(scanTimeoutRef.current);
  }
  }, [scanning]);


  const onSuccess = (e: any) => {
    clearTimeout(scanTimeoutRef.current);
    if (validateQRCodeFormat(e.data)) {
      const parsedData = parseQRCodeData(e.data);
      if (parsedData) {
        Alert.alert(
          'Scan Successful',
          'The QR code was successfully scanned! Do you want to proceed?',
          [
            {
              text: 'Yes',
              onPress: () => {
                const { driverId, couponId } = parsedData;
                scannedQrCode(couponId, driverId)
              }
            },
            {
              text: 'No',
              onPress: () => {
                setScanning(true)
                return ShowMessage('QRCODE','The scan process has been cancelled. Please try scanning again.','warning')
              },
              style: 'cancel',
            }
          ]
        );
      } else {
        console.log('Data parsing error');
        setScanning(true); 
      }
    } else {
      console.log('Invalid QR code format');
      setScanning(true); 
    }
    setScanning(false)
  };

  const scannedQrCode = async (coupon_id, driver_id) => {
    var data = new FormData()
    data.append('coupon_id',coupon_id)
    data.append('driver_id',driver_id)

    await qrCodeScan(data).unwrap().then((res) => {
      console.log('qr code scan response ===>',res)
      if(res.success){
        nav.navigate('Home')
        return ShowMessage('QRCODE',res.message,'success')
      } else {
        return ShowMessage('QRCODE',res.message,'warning')
      }
    }).catch((error) => {
      console.log('qr code scan error =====>',error)
      return ShowMessage('QRCODE','Some problem occured','danger')
    })
  }


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
                style={{ transform: [{ rotate: '180deg' }] }}
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
              <QRCodeGenerator
                value={qrCodeValue}
                backgroundColor='transparent'
                size={220}
              />
              {/* <Image source={images.QRimage} style={styles.qrImage} /> */}
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
         <Spinner
          visible={isLoading}
          color={themes.white}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
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
              style={{ transform: [{ rotate: '180deg' }] }}
            />
          </TouchableOpacity>
        </View>
        <QRCodeScanner
          cameraType="back"
          onRead={onSuccess}
          // flashMode={RNCamera.Constants.FlashMode.torch}
          cameraStyle={styles.cameraCont}
        />
        <Image
          source={images.redCorner}
          style={[styles.redcorner1, { top: hp(5), left: hp(5) }, styles.redImg]}
        />
        <Image
          source={images.redCorner}
          style={[styles.redcorner2, { top: hp(5), right: hp(5) }, styles.redImg]}
        />
        <Image
          source={images.redCorner}
          style={[
            styles.redcorner3,
            { bottom: -hp(85), left: hp(5) },
            styles.redImg,
          ]}
        />
        <Image
          source={images.redCorner}
          style={[
            styles.redcorner4,
            { bottom: -hp(85), right: hp(5) },
            styles.redImg,
          ]}
        />
      </View>
    );
  };

  return user?.type === 'rider' ? QRCodeImage() : QRCodeCamera();
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
    transform: [{ rotate: '180deg' }],
  },
  redcorner3: {
    position: 'absolute',
    bottom: -hp(14),
    left: 0,
    transform: [{ rotateX: '180deg' }],
  },
  redcorner2: {
    position: 'absolute',
    top: -hp(17),
    right: 0,
    transform: [{ rotateY: '180deg' }],
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
  spinnerTextStyle:{
    color: themes.white
  }
  
});
