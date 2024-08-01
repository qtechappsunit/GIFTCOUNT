import React, { useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import themes from '../../assets/themes';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import fonts from '../../assets/fonts';
import images from '../../assets/images';
import { SvgXml } from 'react-native-svg';
import icons from '../../assets/icons';
import InputField from '../../components/InputField';
import ROUTES, { ShowMessage } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { RootState } from '../../Store/Reducer';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { tabBarParams } from '../../routes/MainStack';
import { Logout } from '../../Store/Reducer/AuthReducer';
import { launchImageLibrary } from 'react-native-image-picker';
import CuisineTypeModal from '../../components/CuisineTypeModal';
import { useEditProfileMutation } from '../../Store/services';

interface EditProfileProps {
  navigation: BottomTabNavigationProp<tabBarParams, 'EditProfileScreen'>
}

interface InputFields {
  owner_name: string,
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  bank_IBAN: string,
  street: string,
  city: string,
  state: string,
  zip_code: string,
  profile_pic: string,
  restaurant_name: string,
  restaurant_web: string,
  cuisine_types: []
}

const EditProfileScreen = (props: EditProfileProps) => {
  const { user } = useSelector((state: RootState) => state?.authReducer);

  const [state, setState] = useState<InputFields>({
    owner_name: user?.owner_name,
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    phone_number: user?.phone_number,
    bank_IBAN: user?.bank_IBAN,
    street: user?.street,
    city: user?.city,
    state: user?.state,
    zip_code: user?.zip_code,
    profile_pic: user?.profile_pic,
    restaurant_name: user?.restaurant_name,
    restaurant_web: user?.restaurant_web,
    cuisine_types: []
  })
  const [open, setOpen] = useState<boolean>(false)


  console.log('user details', state.cuisine_types)
  const [editProfile, { isLoading: editProfileLoading }] = useEditProfileMutation()

  const dispatch = useDispatch()

  const onLogoutPress = () => {
    dispatch(Logout())
    return ShowMessage('Signout', 'Logout Successfully', 'success')
  }

  const onSelectImage = async () => {
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

  const onEditProfile = async () => {
    const formData = new FormData();

    formData.append('first_name', state.first_name)
    formData.append('last_name', state.last_name)
    formData.append('phone_number', state.phone_number)
    formData.append('bank_IBAN', state.bank_IBAN)
    formData.append('street', state.street)
    formData.append('city', state.city)
    formData.append('state', state.state)
    formData.append('zip_code', state.zip_code)
    formData.append('restaurant_name', state.restaurant_name)
    formData.append('owner_name', state.owner_name)
    formData.append('restaurant_web', state.restaurant_web)
    formData.append('cuisine_type_ids', JSON.stringify(state.cuisine_types))
    if (state.profile_pic) {
      formData.append('profile_pic', {
        name: 'image.jpg',
        type: 'image/jpeg',
        uri:
          Platform.OS === 'android'
            ? state.profile_pic
            : state.profile_pic.replace('file://', ''),
      });
    }
    await editProfile(formData).unwrap().then((res) => {
      console.log('edit profile response =====>', res)
      if (res.success) {
        return ShowMessage('Edit Profile', res.message, 'success')
      } else {
        return ShowMessage('Edit Profile', res.message, 'warning')
      }
    }).catch((error) => {
      console.log('edit profile error =====>', error)
      return ShowMessage('Edit Profile', 'Some problem occured', 'danger')
    })

  }

  const onChange = (field, value) => {
    setState({
      ...state,
      [field]: value
    })
  }

  return (
    <Container logo={true}>
      {user?.type == 'rider' ? (
        <Text style={styles.text}>Driver</Text>
      ) : user?.type == 'customer' ? (
        <Text style={styles.text}>Customer</Text>
      ) : (
        <Text style={styles.text}>Restaurant Owner</Text>
      )}
      <Text style={styles.heading}>Hi {user?.type === 'owner' ? user?.owner_name : user?.first_name + user?.last_name}</Text>
      <Text style={styles.text}>
        Please enter your registered email {`\n`} and password.
      </Text>
      <View style={styles.userImageView}>
        <Image source={state.profile_pic ? { uri: state.profile_pic } : images.user} style={styles.userImage} />
        <SvgXml xml={icons.redPencilIcon} style={styles.pencilIcon} onPress={() => onSelectImage()} />
      </View>
      {user?.type === 'owner' ?
        <View style={styles.fieldRow}>
          <InputField
            placeholder={'Owner Name'}
            textColor={themes.placeholder_color}
            style={styles.input}
            onChangeText={(text) => onChange('owner_name', text)}
            value={state.owner_name}
            icon={icons.userIcon}
          />
          {/* <SvgXml xml={icons.yellowPencilIcon} onPress={() => onHandleField()} /> */}
        </View>
        :
        <>
          <View style={styles.fieldRow}>
            <InputField
              placeholder={'First Name'}
              textColor={themes.placeholder_color}
              style={styles.input}
              onChangeText={(text) => onChange('first_name', text)}
              value={state.first_name}
              icon={icons.userIcon}
            />
            {/* <SvgXml xml={icons.yellowPencilIcon} onPress={() => onHandleField()} /> */}
          </View>
          <View style={styles.fieldRow}>
            <InputField
              placeholder={'Last Name'}
              textColor={themes.placeholder_color}
              style={styles.input}
              onChangeText={(text) => onChange('last_name', text)}
              value={state.last_name}
              icon={icons.userIcon}
            />
            {/* <SvgXml xml={icons.yellowPencilIcon} onPress={() => onHandleField()} /> */}
          </View>
        </>
      }
      <View style={styles.fieldRow}>
        <InputField
          placeholder={'email'}
          textColor={themes.placeholder_color}
          value={state.email}
          editable={false}
          keyboardType={'email-address'}
          style={styles.input}
          icon={icons.emailIcon}
        />
        {/* <SvgXml xml={icons.yellowPencilIcon} /> */}
      </View>
      <View style={styles.fieldRow}>
        <InputField
          placeholder={'+1 234 678 3125'}
          style={styles.input}
          value={state.phone_number}
          onChangeText={(text) => onChange('phone_number', text)}
          textColor={themes.placeholder_color}
          keyboardType={'numeric'}
          icon={icons.telePhone}
        />
        {/* <SvgXml xml={icons.yellowPencilIcon} onPress={() => onHandleField()} /> */}
      </View>
      <View style={styles.fieldRow}>
        <InputField
          placeholder={'Street'}
          textColor={themes.placeholder_color}
          onChangeText={(text) => onChange('street', text)}
          style={styles.input}
          value={state.street}
          icon={icons.locIcon}
        />
        {/* <SvgXml xml={icons.yellowPencilIcon} onPress={() => onHandleField()} /> */}
      </View>
      <View style={styles.fieldRow}>
        <InputField
          placeholder={'City'}
          textColor={themes.placeholder_color}
          value={state.city}
          style={styles.input}
          onChangeText={(text) => onChange('city', text)}
          icon={icons.locIcon}
        />
        {/* <SvgXml xml={icons.yellowPencilIcon} onPress={() => onHandleField()} /> */}
      </View>
      <View style={styles.fieldRow}>
        <InputField
          placeholder={'State'}
          textColor={themes.placeholder_color}
          style={styles.input}
          value={state.state}
          onChangeText={(text) => onChange('state', text)}
          icon={icons.locIcon}
        />
        {/* <SvgXml xml={icons.yellowPencilIcon} onPress={() => onHandleField()} /> */}
      </View>
      <View style={styles.fieldRow}>
        <InputField
          placeholder={'Zip-code'}
          textColor={themes.placeholder_color}
          style={styles.input}
          value={state.zip_code}
          onChangeText={(text) => onChange('zip_code', text)}
          keyboardType={'numeric'}
          icon={icons.locIcon}
        />
        {/* <SvgXml xml={icons.yellowPencilIcon} onPress={() => onHandleField()} /> */}
      </View>
      {user?.type == 'rider' ? (
        <View style={styles.fieldRow}>
          <InputField
            placeholder={'Bank IBAN'}
            style={styles.input}
            value={state.bank_IBAN}
            onChangeText={(text) => onChange('bank_IBAN', text)}
            textColor={themes.placeholder_color}
            icon={icons.bankIcon}
          />
          {/* <SvgXml xml={icons.yellowPencilIcon} onPress={() => onHandleField()} /> */}
        </View>
      ) : null}
      {user?.type == 'owner' && (
        // <View style={styles.fieldRow}>
        //   <InputField
        //     placeholder={'Physical Address'}
        //     style={styles.input}
        //     textColor={themes.placeholder_color}
        //     icon={icons.locIcon}
        //   />
        //   <SvgXml xml={icons.yellowPencilIcon} />
        // </View>
        <>
          {/* <View style={styles.fieldRow}>
            <InputField
              placeholder={'Restaurant Address'}
              textColor={themes.placeholder_color}
              style={styles.input}
              icon={icons.locIcon}
              editable={editableField}
            />
            <SvgXml xml={icons.yellowPencilIcon} onPress={() => onHandleField()} />
          </View> */}
          <View style={styles.fieldRow}>
            <InputField
              placeholder={'Restaurant Name'}
              textColor={themes.placeholder_color}
              style={styles.input}
              onChangeText={(text) => onChange('restaurant_name', text)}
              value={state.restaurant_name}
              icon={icons.grayHomeIcon}
            />
            {/* <SvgXml xml={icons.yellowPencilIcon} onPress={() => onHandleField()} /> */}
          </View>
          <View style={styles.fieldRow}>
            <InputField
              placeholder={'Restaurant Website'}
              style={styles.input}
              icon={icons.websiteIcon}
              onChangeText={(text) => onChange('restaurant_web', text)}
              value={state.restaurant_web}
              textColor={themes.placeholder_color}
            />

            {/* <SvgXml xml={icons.yellowPencilIcon} onPress={() => onHandleField()} /> */}
          </View>
          <TouchableOpacity onPress={() => setOpen(!open)} style={styles.fieldRow}>
            <InputField
              placeholder={'Select Cuisine Types'}
              style={styles.input}
              icon={icons.cuisineIcon}
              // value={state.cuisine_types}
              editable={false}
              rightIcon={icons.downArrow}
              textColor={themes.placeholder_color}
            />
            {/* <SvgXml xml={icons.yellowPencilIcon}  onPress={() => setOpen(!open)}/> */}
          </TouchableOpacity>
        </>
      )}
      <Button
        buttonText={'Submit'}
        indicator={editProfileLoading}
        style={{ alignSelf: 'center', marginTop: hp(4) }}
        onPress={() => onEditProfile()}
      />
      <Button
        buttonText={'Change Password'}
        style={{ alignSelf: 'center', marginVertical: hp(3) }}
        onPress={() =>
          props.navigation.navigate(ROUTES.ResetPasswordScreen, { type: 'change' })
        }
      />
      <TouchableOpacity onPress={() => onLogoutPress()} style={{ alignSelf: 'center' }}>
        <Text style={[styles.heading, styles.border]}>Logout</Text>
      </TouchableOpacity>
      <CuisineTypeModal
        modalVisible={open}
        setModalVisible={setOpen}
        setValue={(type) => setState({
          ...state,
          cuisine_types: type
        })}
      />
      <View style={styles.view} />
    </Container>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  view: {
    height: 90,
  },
  input: {
    width: wp(80),
    marginBottom: wp(2),
  },
  fieldRow: {
    // flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  pencilIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  userImage: {
    // resizeMode: 'contain',
    width: wp(30),
    height: wp(30),
  },
  userImageView: {
    overflow: 'hidden',
    borderRadius: 30,
    borderWidth: 5,
    borderRadius: 30,
    borderColor: themes.white,
    alignSelf: 'center',
    marginVertical: 10,
  },
  text: {
    color: themes.primary,
    marginBottom: hp(1.5),
    fontSize: hp(2.3),
    fontFamily: fonts.lexendBold,
  },
  heading: {
    color: themes.white,
    fontSize: hp('4%'),
    fontFamily: fonts.markRegular,

  },
  border: {
    borderBottomColor: themes.red,
    borderBottomWidth: 2,
  }
});
