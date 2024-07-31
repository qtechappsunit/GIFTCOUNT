import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import themes from '../../assets/themes';
import InputField from '../../components/InputField';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import ROUTES, { ShowMessage, socialIcons } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import AuthContainer from '../../components/AuthContainer';
import fonts from '../../assets/fonts';
import { useSelector } from 'react-redux';
import { useLoginMutation } from '../../Store/services';
import { RootState } from '../../Store/Reducer';

interface InputField {
  email: string,
  password: string
}

const Login = () => {
  const { userType } = useSelector((state: RootState) => state?.authReducer);
  const navigation = useNavigation();

  const [state, setState] = useState<InputField>({
    email: '',
    password: ''
  })

  const [login, { isLoading }] = useLoginMutation()

  const onLoginPress = async () => {
    if (!state.email) {
      return ShowMessage('Signin', 'Please enter your email', 'warning')
    } else if (!state.password) {
      return ShowMessage('Signin', 'Please enter your password', 'warning')
    } else {
      const data = new FormData()
      data.append('email', state.email)
      data.append('password', state.password)
      await login(data).unwrap().then((res) => {
        // console.log('login response =====>', res)
        if (res.success) {
          return ShowMessage('Signin', res.message, 'success')
        } else {
          return ShowMessage('Signin', res.message, 'warning')
        }
      }).catch((error) => {
        console.log('login error =====>', error)
        return ShowMessage('Signin','Some problem occured','danger')
      })
    }
  }

  return (
    <AuthContainer
      logoImageStyle={{ marginVertical: hp('-5%') }}
      scrollEnabled={false}>
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
          value={state.email}
          onChangeText={(text) => setState({
            ...state,
            email: text
          })}
          textColor={themes.placeholder_color}
          icon={icons.emailIcon}
        />
        <InputField
          placeholder={'Password'}
          style={styles.input}
          value={state.password}
          onChangeText={(text) => setState({
            ...state,
            password: text
          })}
          icon={icons.password}
          textColor={themes.placeholder_color}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.forgotTouch}
          onPress={() => navigation.navigate(ROUTES.ForgetPassword)}>
          <Text style={styles.forgot}>Forgot password</Text>
        </TouchableOpacity>
        <Button
          buttonText={'Submit'}
          indicator={isLoading}
          onPress={() => onLoginPress()}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.dontTouch}
          onPress={() => navigation.navigate(ROUTES.Register)}>
          <Text
            style={[styles.text, { marginRight: wp(1), color: themes.white }]}>
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
          <View
            style={
              ind == 2 && {
                height: hp(5),
                width: hp(5),
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: themes.black,
                borderRadius: 100,
              }
            }>
            <Image
              source={item.icon}
              key={ind}
              style={
                ind == 1
                  ? { height: hp(6), width: hp(6) }
                  : ind == 2
                    ? { tintColor: themes.white, height: hp(2.7), width: hp(2.7) }
                    : styles.imageStyle
              }
            />
          </View>
        ))}
      </View>
    </AuthContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  forgotTouch: {
    alignSelf: 'flex-end',
    marginRight: hp(4)
  },
  dontTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  forgot: {
    color: themes.primary,
    marginBottom: hp(1.5),
    fontSize: hp(2.1),
    fontFamily: fonts.lexendBold,
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
    // fontWeight: 'bold',
    marginTop: hp(2.5),
    marginBottom: hp(0.7),
    fontSize: hp('3.7%'),
    fontFamily: fonts.markRegular,
    textAlign: 'center',
  },
  text: {
    color: themes.primary,
    // marginVertical: hp(0),
    fontSize: hp(2.1),
    fontFamily: fonts.lexendBold,
    textAlign: 'center',
  },
  input: {
    marginBottom: hp('1%'),
    marginTop: hp(2),
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
  imageStyle: {
    height: hp(5),
    width: hp(5),
  },
});
