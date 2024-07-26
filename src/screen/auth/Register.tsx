import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import images from '../../assets/images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import themes from '../../assets/themes';
import fonts from '../../assets/fonts';
import InputField from '../../components/InputField';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';
import CuisineTypeModal from '../../components/CuisineTypeModal';
import ProfileCreatedModal from '../../components/ProfileCreatedModal';
import { launchImageLibrary } from 'react-native-image-picker';

interface InputField {
  username: string,
  restaurant_name: string,
  restaurant_web: string,
  cuisine_type: string,
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  street: string,
  city: string,
  state: string,
  zip_code: string,
  bank_iban: number,
  profile_pic: string,
  password: any,
  cpassword: any
}


const Register = () => {
  const { userType } = useSelector(state => state?.authReducer);
  const [open, setOpen] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [state, setState] = useState<InputField>({
    username: '',
    first_name: '',
    last_name: '',
    restaurant_name: '',
    restaurant_web: '',
    cuisine_type: '',
    phone: '',
    bank_iban: '',
    street: '',
    city: '',
    state: '',
    zip_code: '',
    email: '',
    profile_pic: '',
    password: '',
    cpassword: '',

  })

  console.log('stateee profile', state.cuisine_type)

  const onSelectPhoto = async () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        quality: 0.5,
      },
    };

    await launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('cancelled', response.didCancel);
      } else {
        setState({
          ...state,
          profile_pic: response.assets[0].uri
        })
      }
    });
  }

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
      <Text style={styles.forgot}>
        Please enter your registered email {`\n`}and password
      </Text>
      <TouchableOpacity activeOpacity={0.8} onPress={() => onSelectPhoto()}>
        {state.profile_pic ?
          <Image
            source={{ uri: state.profile_pic }}
            style={styles.userImage}
            borderRadius={20}
          />
          :
          <View style={styles.uploadImageView}>
            <Image source={images.uploadImage} style={styles.uploadImage} />
            <Text style={styles.upText}>upload image</Text>
          </View>
        }
      </TouchableOpacity>
      <View style={styles.inputView}>
        {userType == 'rider' || userType == 'customer' ? (
          <>
            <InputField
              placeholder={'First Name'}
              textColor={themes.placeholder_color}
              value={state.first_name}
              style={styles.input}
              icon={icons.userIcon}
            />
            <InputField
              placeholder={'Last Name'}
              textColor={themes.placeholder_color}
              style={styles.input}
              value={state.last_name}
              icon={icons.userIcon}
            />
            {/* {userType === 'customer' && ( */}

            {/* )} */}
            <InputField
              placeholder={'Phone number'}
              textColor={themes.placeholder_color}
              style={styles.input}
              keyboardType={'numeric'}
              value={state.phone}
              icon={icons.telePhone}
            />
          </>
        ) : (
          <>
            <InputField
              placeholder={'Restaurant Name'}
              style={styles.input}
              textColor={themes.placeholder_color}
              value={state.restaurant_name}
              icon={icons.grayHomeIcon}
            />
            <InputField
              placeholder={'Owner Name'}
              style={styles.input}
              value={state.username}
              textColor={themes.placeholder_color}

              icon={icons.userIcon}
            />
            {/* <InputField
              placeholder={'Restaurant Address'}
              style={styles.input}
              textColor={themes.placeholder_color}
              icon={icons.locIcon}
            /> */}
            <InputField
              placeholder={'Restaurant Phone'}
              style={styles.input}
              keyboardType={'numeric'}
              value={state.phone}
              textColor={themes.placeholder_color}
              icon={icons.telePhone}
            />
            <InputField
              placeholder={'Restaurant Website'}
              style={styles.input}
              textColor={themes.placeholder_color}
              value={state.restaurant_web}
              icon={icons.websiteIcon}
            />
            <TouchableOpacity onPress={() => setOpen(!open)}>
              <InputField
                placeholder={'Select Cuisine Types'}
                style={styles.input}
                icon={icons.cuisineIcon}
                value={state.cuisine_type}
                textColor={themes.placeholder_color}
                editable={false}
                rightIcon={icons.downArrow}
              />
            </TouchableOpacity>
          </>
        )}
        <InputField
          placeholder={'Street'}
          textColor={themes.placeholder_color}
          style={styles.input}
          icon={icons.locIcon}
        />
        <InputField
          placeholder={'City'}
          textColor={themes.placeholder_color}
          style={styles.input}
          icon={icons.locIcon}
        />
        <InputField
          placeholder={'State'}
          textColor={themes.placeholder_color}
          style={styles.input}
          icon={icons.locIcon}
        />
        <InputField
          placeholder={'Zip-code'}
          textColor={themes.placeholder_color}
          keyboardType={'numeric'}
          style={styles.input}
          icon={icons.locIcon}
        />
        <InputField
          placeholder={'Email'}
          style={styles.input}
          textColor={themes.placeholder_color}
          keyboardType={'email-address'}
          icon={icons.emailIcon}
        />
        {userType == 'rider' ? (
          <>
            <InputField
              placeholder={'Bank IBAN'}
              style={styles.input}
              textColor={themes.placeholder_color}
              icon={icons.bankIcon}
            />
            {/* <InputField
              placeholder={'Physical Address'}
              style={styles.input}
              textColor={themes.placeholder_color}
              icon={icons.locIcon}
            /> */}
          </>
        ) : null}
        <InputField
          placeholder={'Password'}
          style={styles.input}
          icon={icons.password}
          textColor={themes.placeholder_color}
          secureTextEntry={true}
        />
        <InputField
          placeholder={'Confirm Password'}
          style={styles.input}
          icon={icons.password}
          textColor={themes.placeholder_color}
          secureTextEntry={true}
        />
      </View>
      <Button
        buttonText={'Submit'}
        style={styles.btn}
        onPress={() => setOpenProfileModal(!openProfileModal)}
      />
      <CuisineTypeModal
        modalVisible={open}
        setModalVisible={setOpen}
        setValue={(type) => setState({
          ...state,
          cuisine_type: type
        })}
      />
      <ProfileCreatedModal
        modalVisible={openProfileModal}
        setModalVisible={setOpenProfileModal}
      />
    </Container>
  );
};

export default Register;

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    marginVertical: hp(2),
  },
  input: {
    marginBottom: wp(2),
  },
  inputView: {
    alignSelf: 'center',
    marginTop: wp(5),
  },
  upText: {
    fontFamily: fonts.lexendRegular,
  },
  uploadImage: {
    resizeMode: 'contain',
    width: wp(15),
    height: wp(15),
  },
  uploadImageView: {
    backgroundColor: themes.gray1,
    width: wp(30),
    height: wp(30),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  heading: {
    color: themes.white,
    fontSize: hp(4.5),
    fontFamily: fonts.markRegular,
  },
  forgot: {
    color: themes.primary,
    marginBottom: hp(1.5),
    fontSize: hp(2.3),
    fontFamily: fonts.lexendBold,
  },
  userImage: {
    height: hp(15),
    alignSelf: 'center',
    width: hp(15)
  }
});
