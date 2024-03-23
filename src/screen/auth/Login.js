import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import themes from '../../assets/themes';
import InputField from '../../components/InputField';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import ROUTES, {socialIcons} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import AuthContainer from '../../components/AuthContainer';

const Login = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.scrollContainer}>
      <AuthContainer logoImageStyle={{marginVertical: hp('1%')}}>
        <View style={styles.screen}>
          <Text style={styles.heading}>Login</Text>
          <Text style={styles.text}>
            Please enter your registered email and password.
          </Text>
          <View style={styles.inputWrapper}>
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
          </View>
          <Button
            buttonText={'Submit'}
            onPress={() => navigation.navigate(ROUTES.MainStack)}
          />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate(ROUTES.Register)}>
            <Text style={[styles.text, {marginTop: hp('2%')}]}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
          <View style={styles.border} />
          <View style={styles.lineCircle}>
            <Text style={styles.ORtext}>OR</Text>
          </View>
        </View>
        <Text style={styles.socialMediatext}>Login using</Text>
        <View style={styles.socialWrapper}>
          {socialIcons.map(item => (
            <Image source={item.icon} />
          ))}
        </View>
      </AuthContainer>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: themes.secondary,
  },
  screen: {
    alignItems: 'center',
  },
  heading: {
    color: themes.red,
    fontWeight: 'bold',
    fontSize: hp('4%'),
  },
  text: {
    color: themes.primary,
    marginTop: hp('1%'),
    fontSize: hp('2%'),
  },
  inputWrapper: {
    paddingTop: hp('4%'),
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
    fontWeight: 'bold',
  },
  socialMediatext: {
    color: themes.primary,
    fontSize: hp('2%'),
    alignSelf: 'center',
    marginTop: hp('3.5%'),
  },
  socialWrapper: {
    flexDirection: 'row',
    paddingTop: hp('3%'),
    justifyContent: 'space-evenly',
  },
});
