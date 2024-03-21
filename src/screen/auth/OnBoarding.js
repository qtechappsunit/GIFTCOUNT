import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import AuthContainer from '../../components/AuthContainer';
import AppIntroSlider from 'react-native-app-intro-slider';
import {slides} from '../../utils';
import themes from '../../assets/themes';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SVGIcons from '../../components/SVGIcons';
import icons from '../../assets/icons';
import {useNavigation} from '@react-navigation/native';

const OnBoarding = () => {
  const sliderRef = useRef();
  const navigation = useNavigation();

  const renderItem = ({item}) => {
    return (
      <View style={styles.contentWrapper}>
        <Text style={styles.textStyle}>{item.text}</Text>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.nextButton}>
        <SVGIcons image={icons.arrowNext} />
      </View>
    );
  };

  return (
    <AuthContainer>
      <AppIntroSlider
        ref={sliderRef}
        renderItem={renderItem}
        data={slides}
        renderNextButton={renderNextButton}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        renderDoneButton={renderNextButton}
        onDone={() => navigation.navigate('GetStart')}
      />
    </AuthContainer>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  textStyle: {
    color: themes.primary,
    marginLeft: hp('3%'),
    fontSize: hp('3.4%'),
    width: hp('42%'),
    fontWeight: 'bold',
  },
  contentWrapper: {
    // paddingTop: hp('3%'),
  },
  nextButton: {
    backgroundColor: themes.primary,
    height: hp('6%'),
    width: hp('6%'),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationWrapper: {
    flexDirection: 'row',
    gap: 10,
  },
  dotStyle: {
    backgroundColor: themes.black,
    right: 142,
    position: 'relative',
  },
  activeDotStyle: {
    backgroundColor: themes.primary,
    right: 142,
    position: 'relative',
    height: hp('1%'),
    width: hp('4%'),
  },
});
