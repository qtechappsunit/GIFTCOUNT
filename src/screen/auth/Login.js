import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AuthContainer from '../../components/AuthContainer';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import themes from '../../assets/themes';
import InputField from '../../components/InputField';
import icons from '../../assets/icons';
import Button from '../../components/Button';

const Login = () => {
  return (
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
          onPress={() => alert('working in progress')}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => alert('working in progress')}>
          <Text style={[styles.text, {marginTop: hp('2%')}]}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
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
});
