import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import themes from '../../assets/themes';
import InputField from '../../components/InputField';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import ROUTES, { socialIcons } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import AuthContainer from '../../components/AuthContainer';
import fonts from '../../assets/fonts';
import { useSelector } from 'react-redux';

const Login = () => {
  const { userType } = useSelector(state => state?.authReducer);
  const navigation = useNavigation();

  return (
    <AuthContainer logoImageStyle={{ marginVertical: hp('1%') }}>
      <View style={styles.screen}>
        {userType == 'rider' ? (
          <Text style={styles.heading}>Driver Login</Text>
        ) : userType == 'customer' ? (
          <Text style={styles.heading}>Customer Login</Text>
        ) : (
          <Text style={styles.heading}>Restaurant Owner{`\n`} Login</Text>
        )}
        <Text style={styles.text}>
          Please enter your registered email {`\n`} and password.
        </Text>
        <InputField
          placeholder={'Email'}
          style={styles.input}
          keyboardType={'email-address'}
          icon={icons.emailIcon}
        />
        <InputField
          placeholder={'Password'}
          style={styles.input}
          icon={icons.password}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.forgotTouch} onPress={() => navigation.navigate(ROUTES.OTPScreen)}>
          <Text style={styles.forgot}>
            Forgot password
          </Text>
        </TouchableOpacity>
        <Button
          buttonText={'Submit'}
          onPress={() => navigation.navigate(ROUTES.MainStack)}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.dontTouch}
          onPress={() => navigation.navigate(ROUTES.Register)}
        >
          <Text style={[styles.text, { marginRight: wp(1), color: themes.white }]}>
            Don't have an account?
          </Text>
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.border} />
        <View style={styles.lineCircle}>
          <Text style={styles.ORtext}>OR</Text>
        </View>
      </View>
      <Text style={styles.socialMediatext}>Login using</Text>
      <View style={styles.socialWrapper}>
        {socialIcons.map((item, ind) => (
          <Image source={item.icon} key={ind} />
        ))}
      </View>
    </AuthContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  forgotTouch: {
    alignSelf: 'flex-end'
  },
  dontTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2%')
  },
  forgot: {
    color: themes.primary,
    marginBottom: hp(1.5),
    fontSize: hp(2.3),
    fontFamily: fonts.lexendBold,
    alignSelf: "flex-end"
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: themes.secondary,
  },
  screen: {
    alignItems: 'center',
  },
  heading: {
    color: themes.white,
    fontWeight: 'bold',
    fontSize: hp('4%'),
    fontFamily: fonts.markRegular,
    textAlign: 'center'
  },
  text: {
    color: themes.primary,
    marginVertical: hp(1.5),
    fontSize: hp(2.3),
    fontFamily: fonts.lexendBold,
    textAlign: 'center'
  },
  input: {
    marginBottom: hp('2.4%'),
  },
  border: {
    borderBottomColor: themes.red,
    padding: hp('2.4%'),
    width: hp('30%'),
    borderBottomWidth: 2,
  },
  lineCircle: {
    borderRadius: 100,
    backgroundColor: themes.navy_blue,
    height: hp('4%'),
    width: hp('4%'),
    borderWidth: 2,
    position: 'absolute',
    bottom: hp('1%') - hp('3%'),
    borderColor: themes.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ORtext: {
    color: themes.white,
    fontSize: hp('1.5%'),
    fontFamily: fonts.bold,
  },
  socialMediatext: {
    color: themes.primary,
    fontSize: hp('2%'),
    alignSelf: 'center',
    marginTop: hp('3.5%'),
    fontFamily: fonts.regular,
  },
  socialWrapper: {
    flexDirection: 'row',
    paddingTop: hp('3%'),
    justifyContent: 'space-evenly',
    marginBottom: hp(2),
    width: wp(60),
    alignSelf: 'center',
  },
});
