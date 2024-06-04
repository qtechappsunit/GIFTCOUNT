import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import images from '../../assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import themes from '../../assets/themes';
import fonts from '../../assets/fonts';
import InputField from '../../components/InputField';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';
import CuisineTypeModal from '../../components/CuisineTypeModal';
import ProfileCreatedModal from '../../components/ProfileCreatedModal';

const Register = () => {
  const { userType } = useSelector(state => state?.authReducer);
  const [open, setOpen] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  return (
    <Container logo={true}>
      {userType == 'rider' ? (
        <Text style={styles.forgot}>Driver</Text>
      ) : userType == 'customer' ? (
        <Text style={styles.forgot}>Customer</Text>
      ) : (
        <Text style={styles.forgot}>Restaurant Owner</Text>
      )}
      <Text style={styles.heading}>Signup</Text>
      <Text style={styles.forgot}>Please enter your registered email {`\n`}and password</Text>
      <View style={styles.uploadImageView}>
        <Image source={images.uploadImage} style={styles.uploadImage} />
        <Text style={styles.upText}>upload image</Text>
      </View>
      <View style={styles.inputView}>
        {userType == 'rider' || userType == 'customer' ? (
          <>
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
              placeholder={'Phone number'}
              style={styles.input}
              icon={icons.telePhone}
            />
          </>
        ) : (
          <>
            <InputField
              placeholder={'Restaurant Name'}
              style={styles.input}
              icon={icons.grayHomeIcon}
            />
            <InputField
              placeholder={'Owner Name'}
              style={styles.input}
              icon={icons.userIcon}
            />
            <InputField
              placeholder={'Restaurant Address'}
              style={styles.input}
              icon={icons.locIcon}
            />
            <InputField
              placeholder={'Restaurant Phone'}
              style={styles.input}
              icon={icons.telePhone}
            />
            <InputField
              placeholder={'Restaurant Website'}
              style={styles.input}
              icon={icons.websiteIcon}
            />
            <TouchableOpacity onPress={() => setOpen(!open)}>
              <InputField
                placeholder={'Select Cuisine Types'}
                style={styles.input}
                icon={icons.cuisineIcon}
                editable={false}
                rightIcon={icons.downArrow}
              />
            </TouchableOpacity>
          </>
        )}
        <InputField
          placeholder={'Email'}
          style={styles.input}
          icon={icons.emailIcon}
        />
        {userType == 'rider' ? (
          <>
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
          </>
        ) : userType == 'customer' ? (
          <>
            <InputField
              placeholder={'Bank IBAN'}
              style={styles.input}
              icon={icons.bankIcon}
            />
          </>
        ) : null}
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
        onPress={() => setOpenProfileModal(!openProfileModal)}
      />
      <CuisineTypeModal modalVisible={open} setModalVisible={setOpen} />
      <ProfileCreatedModal modalVisible={openProfileModal} setModalVisible={setOpenProfileModal} />
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