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
import { RootState } from '../../Store/Reducer';
import { requestPermission, ShowMessage } from '../../utils';

interface InputField {
  type: string,
  owner_name: string,
  restaurant_name: string,
  restaurant_web: string,
  cuisine_type: number[],
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  street: string,
  city: string,
  state: string,
  zip_code: string,
  bank_iban: string,
  profile_pic: string,
  password: any,
  cpassword: any
}

const Register = () => {
  const { userType } = useSelector((state: RootState) => state?.authReducer);
  const [open, setOpen] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [state, setState] = useState<InputField>({
    type: userType,
    owner_name: '',
    first_name: '',
    last_name: '',
    restaurant_name: '',
    restaurant_web: '',
    cuisine_type: [],
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



  const onSelectPhoto = async () => {
   const status = await requestPermission('media')
   if(status === 'granted') { 
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
  } else {
    return ShowMessage('Media Access','Permission Denied','warning')
  }
  }

  const onChange = (value: string, text: string) => {
    setState({
      ...state,
      [value]: text
    })
  }

  const onSubmitPress = async () => {
    setOpenProfileModal(!openProfileModal)
  }

  return (
    <Container logo={true}>
      {userType == 'driver' ? (
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
        {userType == 'driver' || userType == 'customer' ? (
          <>
            <InputField
              placeholder={'First Name'}
              textColor={themes.placeholder_color}
              onChangeText={(text) => onChange('first_name', text)}
              value={state.first_name}
              style={styles.input}
              icon={icons.userIcon}
            />
            <InputField
              placeholder={'Last Name'}
              textColor={themes.placeholder_color}
              style={styles.input}
              onChangeText={(text) => onChange('last_name', text)}
              value={state.last_name}
              icon={icons.userIcon}
            />
            {/* {userType === 'customer' && ( */}

            {/* )} */}
            <InputField
              placeholder={'Phone number'}
              textColor={themes.placeholder_color}
              style={styles.input}
              onChangeText={(text) => onChange('phone', text)}
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
              onChangeText={(text) => onChange('restaurant_name', text)}
              value={state.restaurant_name}
              icon={icons.grayHomeIcon}
            />
            <InputField
              placeholder={'Owner Name'}
              style={styles.input}
              value={state.owner_name}
              onChangeText={(text) => onChange('owner_name', text)}
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
              onChangeText={(text) => onChange('phone', text)}
              textColor={themes.placeholder_color}
              icon={icons.telePhone}
            />
            <InputField
              placeholder={'Restaurant Website'}
              style={styles.input}
              textColor={themes.placeholder_color}
              value={state.restaurant_web}
              onChangeText={(text) => onChange('restaurant_web', text)}
              icon={icons.websiteIcon}
            />
            <TouchableOpacity onPress={() => setOpen(!open)}>
              <InputField
                placeholder={'Select Cuisine Types'}
                style={styles.input}
                icon={icons.cuisineIcon}
                // value={state.cuisine_type}
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
          value={state.street}
          onChangeText={(text) => onChange('street', text)}
          icon={icons.locIcon}
        />
        <InputField
          placeholder={'City'}
          textColor={themes.placeholder_color}
          style={styles.input}
          value={state.city}
          onChangeText={(text) => onChange('city', text)}
          icon={icons.locIcon}
        />
        <InputField
          placeholder={'State'}
          textColor={themes.placeholder_color}
          style={styles.input}
          value={state.state}
          onChangeText={(text) => onChange('state', text)}
          icon={icons.locIcon}
        />
        <InputField
          placeholder={'Zip-code'}
          textColor={themes.placeholder_color}
          keyboardType={'numeric'}
          length={6}
          value={state.zip_code}
          onChangeText={(text) => onChange('zip_code', text)}
          style={styles.input}
          icon={icons.locIcon}
        />
        <InputField
          placeholder={'Email'}
          style={styles.input}
          textColor={themes.placeholder_color}
          keyboardType={'email-address'}
          value={state.email}
          onChangeText={(text) => onChange('email', text)}
          icon={icons.emailIcon}
        />
        {userType == 'driver' ? (
          <>
            <InputField
              placeholder={'Bank IBAN'}
              style={styles.input}
              value={state.bank_iban}
              textColor={themes.placeholder_color}
              onChangeText={(text) => onChange('bank_iban', text)}
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
          value={state.password}
          onChangeText={(text) => onChange('password', text)}
          textColor={themes.placeholder_color}
          secureTextEntry={true}
        />
        <InputField
          placeholder={'Confirm Password'}
          style={styles.input}
          icon={icons.password}
          value={state.cpassword}
          onChangeText={(text) => onChange('cpassword', text)}
          textColor={themes.placeholder_color}
          secureTextEntry={true}
        />
      </View>
      <Button
        buttonText={'Submit'}
        style={styles.btn}
        onPress={() => onSubmitPress()}
      />
      <CuisineTypeModal
        modalVisible={open}
        setModalVisible={setOpen}
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
