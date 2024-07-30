import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Container from '../../components/Container';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import themes from '../../assets/themes';
import fonts from '../../assets/fonts';
import InputField from '../../components/InputField';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import ROUTES, { ShowMessage } from '../../utils';
import { useSendCodeEmailMutation } from '../../Store/services';
import FormData from 'form-data';

const ForgetPassword = () => {
  const [email, setEmail] = useState<string>('')

  const nav = useNavigation();

  const [sendCodeEmail, { isLoading }] = useSendCodeEmailMutation()

  const onSubmitPress = async () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;


    if (!email) {
      return ShowMessage('Forget Password', 'Please enter your email', 'warning')
    } else if (emailRegex.test(email) == false) {
      return ShowMessage('Forget Password', 'Invalid email', 'warning')
    }
    else {
      var data = new FormData()
      data.append('email', email)
      await sendCodeEmail(data).unwrap().then((res) => {
        if (res.success) {
          nav.navigate(ROUTES.OTPScreen, { id: res.data.id, code: res.data.code, email: res.data.email })
          return ShowMessage('Forget Password', res.message, 'success')
        } else {
          return ShowMessage('Forget Password', res.message, 'warning')
        }
      }).catch((error) => {
        console.log('send code on email error =====>', error)
        return ShowMessage('Forget Password', 'Some problem occured', 'danger')
      })
    }
  }

  return (
    <Container logo={true}>
      <View style={styles.inner}>
        <Text style={styles.heading}>Forget Password</Text>
        <Text style={styles.text}>
          Enter your email address below, and we’ll send you an OTP to reset
          your password{' '}
        </Text>
        <InputField
          placeholder={'Email'}
          style={styles.input}
          textColor={themes.placeholder_color}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType={'email-address'}
          icon={icons.emailIcon}
        />
        <Button
          buttonText={'Submit'}
          style={styles.btn}
          indicator={isLoading}
          onPress={() => onSubmitPress()}
        />
      </View>
    </Container>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  input: {
    marginBottom: hp(2.4),
  },
  btn: {
    marginVertical: hp(2),
  },
  text: {
    color: themes.primary,
    marginVertical: hp(1.5),
    fontSize: hp(2.3),
    marginBottom: hp(2),
    fontFamily: fonts.lexendBold,
    textAlign: 'center',
  },
  inner: {
    height: hp(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: themes.white,
    fontSize: hp(4),
    fontFamily: fonts.markRegular,
  },
});
