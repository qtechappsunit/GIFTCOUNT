import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Container from '../../components/Container';
import themes from '../../assets/themes';
import fonts from '../../assets/fonts';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InputField from '../../components/InputField';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import ROUTES, { ShowMessage } from '../../utils';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useChangePasswordMutation, useResetPasswordMutation } from '../../Store/services';
import FormData from 'form-data';

interface ResetPasswordProps {
  route: RouteProp<AuthParams, 'ResetPasswordScreen'>
}

const ResetPasswordScreen = (props: ResetPasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const nav = useNavigation();

  const [resetPassword, { isLoading: isResetPasswordLoading }] = useResetPasswordMutation()
  const [changePassword, { isLoading: isChangePasswordLoading }] = useChangePasswordMutation()

  const screenType = props.route?.params?.type;
  const userid = props.route?.params?.id;

  // console.log(userid)

  const onSubmitPress = async () => {
    if (newPassword.length < 6) {
      return ShowMessage(screenType === 'change' ? 'Change Password' : 'Reset Password', 'Password is too short', 'warning')
    }
    else if (newPassword != confirmPassword) {
      return ShowMessage(screenType === 'change' ? 'Change Password' : 'Reset Password', 'Password does not match', 'warning')
    }
    else {
      if (screenType === 'change') {
        var data = new FormData()
        data.append('current_password', currentPassword)
        data.append('new_password', newPassword)
        await changePassword(data).unwrap().then((res) => {
          if (res.success) {
            nav.navigate(ROUTES.EditProfileScreen)
            return ShowMessage('Change Password', res.message, 'success')
          } else {
            return ShowMessage('Change Password', res.message, 'warning')
          }
        }).catch((error) => {
          console.log('error changing the password', error)
          return ShowMessage('Change Password', 'Some problem occured', 'danger')
        })
      } else {
        var data = new FormData()
        data.append('id', userid)
        data.append('password', newPassword)
        await resetPassword(data).unwrap().then((res) => {
          if (res.success) {
            nav.navigate(ROUTES.Login)
            return ShowMessage('Reset Password', res.message, 'success')
          } else {
            return ShowMessage('Reset Password', res.message, 'warning')
          }
        }).catch((error) => {
          console.log('error reseting the password', error)
          return ShowMessage('Reset Password', 'Some problem occured', 'danger')
        })
      }
    }
  }

  return (
    <Container logo={true}>
      <View style={styles.inner}>
        <Text style={styles.heading}>
          {screenType === 'change' ? 'Change Password' : 'Reset Password'}
        </Text>
        <Text style={styles.text}>Please enter your new password</Text>
        {screenType === 'change' && (
          <InputField
            placeholder={'Current Password'}
            style={styles.input}
            secureTextEntry={true}
            value={currentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
            textColor={themes.placeholder_color}
            icon={icons.password}
          />
        )}
        <InputField
          placeholder={'Enter new password'}
          style={styles.input}
          secureTextEntry={true}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          textColor={themes.placeholder_color}
          icon={icons.password}
        />
        <InputField
          placeholder={'Retype new password'}
          style={styles.input}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          textColor={themes.placeholder_color}
          icon={icons.password}
        />
        <Button
          buttonText={'Submit'}
          style={styles.btn}
          indicator={screenType === 'change' ? isChangePasswordLoading : isResetPasswordLoading}
          onPress={() => onSubmitPress()}
        />
      </View>
    </Container>
  );
};

export default ResetPasswordScreen;

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
