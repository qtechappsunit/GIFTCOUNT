import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../assets/images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import themes from '../../assets/themes';
import fonts from '../../assets/fonts';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const Points = () => {
  const nav = useNavigation();
  const [showGift, setShowGift] = useState(true);
  // State for giftLid animation
  const [giftLidTop] = useState(new Animated.Value(height / 4.1));
  // State for view50initial animation
  const [view50ZIndex] = useState(new Animated.Value(0));
  const [view50Top] = useState(new Animated.Value(height / 2.5));
  // State for sparkles animation
  const [sparklesZIndex] = useState(new Animated.Value(0));
  const [sparklesTop] = useState(new Animated.Value(height / 3.6));
  const [sparklesWidth] = useState(new Animated.Value(wp(0)));

  useEffect(() => {
    const animateAll = () => {
      Animated.sequence([
        // Gift Lid animation
        Animated.timing(giftLidTop, {
          toValue: height / 12,
          duration: 500,
          useNativeDriver: false,
        }),
        // view50initial animation
        Animated.parallel([
          Animated.timing(view50ZIndex, {
            toValue: 10,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(view50Top, {
            toValue: height / 3.3,
            duration: 500,
            useNativeDriver: false,
          }),
        ]),
        // Sparkles animation
        Animated.parallel([
          Animated.timing(sparklesZIndex, {
            toValue: 5,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(sparklesTop, {
            toValue: height / 3.6,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(sparklesWidth, {
            toValue: wp(90),
            duration: 500,
            useNativeDriver: false,
          }),
        ]),
        Animated.delay(1000),
      ]).start(() => {
        setShowGift(false);
      });
    };

    animateAll();
  }, []);

  return (
    <ImageBackground
      style={styles.cont}
      source={images.splashBg}
      resizeMode={'cover'}>
      <View style={styles.inner}>
        {showGift ? (
          <>
            {/* Gift Lid */}
            <Animated.Image
              style={[
                styles.giftLid,
                {
                  top: giftLidTop,
                },
              ]}
              source={images.giftLid}
            />
            {/* view50initial */}
            <Animated.View
              style={[
                styles.view50initial,
                {
                  zIndex: view50ZIndex,
                  top: view50Top,
                },
              ]}>
              <Text style={styles.text50Initial}>50</Text>
              <Text style={styles.pointsTextInitial}>Points</Text>
            </Animated.View>
            {/* Sparkles */}
            <Animated.Image
              style={[
                styles.sparkles,
                {
                  zIndex: sparklesZIndex,
                  top: sparklesTop,
                  width: sparklesWidth,
                },
              ]}
              source={images.giftSparkles}
            />
            <Image source={images.giftBox} style={styles.giftBox} />
          </>
        ) : (
          <>
            <View style={styles.view50}>
              <Text style={styles.text50}>50</Text>
              <Text style={styles.pointsText}>Points</Text>
            </View>
            <Text style={styles.collectedText}>Collected</Text>
            <View style={styles.btnView}>
              <Button buttonText={'View Points'} onPress={() => nav.goBack()} />
              <TouchableOpacity
                onPress={() => nav.goBack()}
                style={styles.otherBtn}>
                <Text style={styles.otherText}>Other{'\n'}Restaurant</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

export default Points;

const styles = StyleSheet.create({
  giftLid: {
    width: wp(45),
    height: wp(45),
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 10,
  },
  view50initial: {
    position: 'absolute',
    zIndex: 0,
    top: height / 2.5,
    backgroundColor: themes.red1,
    aspectRatio: 1,
    borderRadius: 200,
    padding: 15,
    shadowColor: themes.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sparkles: {
    resizeMode: 'contain',
    width: wp(30),
    height: wp(30),
    position: 'absolute',
    zIndex: 0,
    top: height / 3.6,
  },
  pointsTextInitial: {
    color: themes.white,
    textAlign: 'center',
    fontSize: wp(4),
    fontFamily: fonts.bold,
  },
  text50Initial: {
    color: themes.white,
    textAlign: 'center',
    fontSize: wp(6),
    fontFamily: fonts.bold,
  },
  giftBox: {
    resizeMode: 'contain',
    width: wp(40),
    height: wp(40),
  },
  otherText: {
    color: themes.white,
    textAlign: 'center',
    fontFamily: fonts.bold,
  },
  otherBtn: {
    width: wp(20),
    marginLeft: wp(2),
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  collectedText: {
    color: themes.red1,
    fontFamily: fonts.bold,
    fontSize: wp(10),
  },
  pointsText: {
    color: themes.white,
    textAlign: 'center',
    fontSize: wp(8),
    fontFamily: fonts.bold,
  },
  text50: {
    fontSize: wp(25),
    textAlign: 'center',
    fontFamily: fonts.bold,
    color: themes.white,
  },
  view50: {
    backgroundColor: themes.red1,
    padding: 25,
    aspectRatio: 1,
    borderRadius: 200,
    marginBottom: hp(2),
  },
  inner: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cont: {
    height: height,
    width: width,
    padding: wp(3),
  },
});
