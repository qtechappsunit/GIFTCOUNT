import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Container from '../../components/Container';
import images from '../../assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import themes from '../../assets/themes';
import fonts from '../../assets/fonts';
import InputField from '../../components/InputField';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const nav = useNavigation();

  return (
    <Container logo={true}>
      <Text style={styles.forgot}>Driver</Text>
      <Text style={styles.heading}>Signup</Text>
      <Text style={styles.forgot}>Please enter your registered email {`\n`}and password</Text>
      <View style={styles.uploadImageView}>
        <Image source={images.uploadImage} style={styles.uploadImage} />
        <Text style={styles.upText}>upload image</Text>
      </View>
      <View style={styles.inputView}>
        <InputField
          placeholder={'First Name'}
          style={styles.input}
          icon={icons.userIcon}
        />
        <InputField
          placeholder={'Last Name'}
          style={styles.input}
          icon={icons.userIcon}
        />
        <InputField
          placeholder={'Email'}
          style={styles.input}
          icon={icons.emailIcon}
        />
        <InputField
          placeholder={'Phone number'}
          style={styles.input}
          icon={icons.telePhone}
        />
        <InputField
          placeholder={'Bank IBAN'}
          style={styles.input}
          icon={icons.bankIcon}
        />
        <InputField
          placeholder={'Physical Address'}
          style={styles.input}
          icon={icons.locIcon}
        />
        <InputField
          placeholder={'Password'}
          style={styles.input}
          icon={icons.password}
          secureTextEntry={true}
        />
        <InputField
          placeholder={'Confirm Password'}
          style={styles.input}
          icon={icons.password}
          secureTextEntry={true}
        />
      </View>
      <Button
        buttonText={'Submit'}
        style={styles.btn}
        onPress={() => nav.goBack()}
      />
    </Container>
  );
};

export default Register

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    marginVertical: hp(2)
  },
  input: {
    marginBottom: wp(2)
  },
  inputView: {
    alignSelf: 'center',
    marginTop: wp(5)
  },
  upText: {
    fontFamily: fonts.lexendRegular,
  },
  uploadImage: {
    resizeMode: 'contain',
    width: wp(15),
    height: wp(15)
  },
  uploadImageView: {
    backgroundColor: themes.gray1,
    width: wp(30),
    height: wp(30),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10
  },
  heading: {
    color: themes.white,
    fontWeight: 'bold',
    fontSize: hp(4.5),
    fontFamily: fonts.markRegular,
  },
  forgot: {
    color: themes.primary,
    marginBottom: hp(1.5),
    fontSize: hp(2.3),
    fontFamily: fonts.lexendBold,
  },
});