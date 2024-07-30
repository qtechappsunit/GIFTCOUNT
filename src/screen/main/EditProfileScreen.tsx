import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

interface EditProfileProps {
  navigation: BottomTabNavigationProp<tabBarParams, 'EditProfileScreen'>
}

interface InputFields {
  username: string,
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
    username: user?.type === 'owner' ? user?.owner_name : user?.first_name + user?.last_name,
    email: user?.email,
    phone_number: user?.phone_number,
    bank_IBAN: user?.bank_IBAN,
    street: user?.street,
    city: user?.city,
    state: user?.state,
    zip_code: user?.zip_code,
    profile_pic: user?.profile_pic ,
    restaurant_name: user?.restaurant_name,
    restaurant_web: user?.restaurant_web,
    cuisine_types: []
  })
  const [open, setOpen] = useState<boolean>(false)



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
        <Image source={state.profile_pic ? {uri: state.profile_pic} : images.user} style={styles.userImage} />
        <SvgXml xml={icons.redPencilIcon} style={styles.pencilIcon} onPress={() => onSelectImage()} />
      </View>
      <View style={styles.fieldRow}>
        <InputField
          placeholder={'Mark Ventura'}
          textColor={themes.placeholder_color}
          style={styles.input}
          value={state.username}
          icon={icons.userIcon}
        />
        <SvgXml xml={icons.yellowPencilIcon} />
      </View>
      <View style={styles.fieldRow}>
        <InputField
          placeholder={'m.ventura@gmail.com'}
          textColor={themes.placeholder_color}
          value={state.email}
          keyboardType={'email-address'}
          style={styles.input}
          icon={icons.emailIcon}
        />
        <SvgXml xml={icons.yellowPencilIcon} />
      </View>
      <View style={styles.fieldRow}>
        <InputField
          placeholder={'+1 234 678 3125'}
          style={styles.input}
          value={state.phone_number}
          textColor={themes.placeholder_color}
          keyboardType={'numeric'}
          icon={icons.telePhone}
        />
        <SvgXml xml={icons.yellowPencilIcon} />
      </View>
      <View style={styles.fieldRow}>
        <InputField
          placeholder={'Street'}
          textColor={themes.placeholder_color}
          style={styles.input}
          value={state.street}
          icon={icons.locIcon}
        />
        <SvgXml xml={icons.yellowPencilIcon} />
      </View>
      <View style={styles.fieldRow}>
        <InputField
          placeholder={'City'}
          textColor={themes.placeholder_color}
          value={state.city}
          style={styles.input}
          icon={icons.locIcon}
        />
        <SvgXml xml={icons.yellowPencilIcon} />
      </View>
      <View style={styles.fieldRow}>
        <InputField
          placeholder={'State'}
          textColor={themes.placeholder_color}
          style={styles.input}
          value={state.state}
          icon={icons.locIcon}
        />
        <SvgXml xml={icons.yellowPencilIcon} />
      </View>
      <View style={styles.fieldRow}>
        <InputField
          placeholder={'Zip-code'}
          textColor={themes.placeholder_color}
          style={styles.input}
          value={state.zip_code}
          keyboardType={'numeric'}
          icon={icons.locIcon}
        />
        <SvgXml xml={icons.yellowPencilIcon} />
      </View>
      {user?.type == 'rider' ? (
        <View style={styles.fieldRow}>
          <InputField
            placeholder={'Bank IBAN'}
            style={styles.input}
            value={state.bank_IBAN}
            textColor={themes.placeholder_color}
            icon={icons.bankIcon}
          />
          <SvgXml xml={icons.yellowPencilIcon} />
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
            />
            <SvgXml xml={icons.yellowPencilIcon} />
          </View> */}
          <View style={styles.fieldRow}>
            <InputField
              placeholder={'Restaurant Name'}
              textColor={themes.placeholder_color}
              style={styles.input}
              value={state.restaurant_name}
              icon={icons.grayHomeIcon}
            />
            <SvgXml xml={icons.yellowPencilIcon} />
          </View>
          <View style={styles.fieldRow}>
            <InputField
              placeholder={'Restaurant Website'}
              style={styles.input}
              icon={icons.websiteIcon}
              value={state.restaurant_web}
              textColor={themes.placeholder_color}
            />

            <SvgXml xml={icons.yellowPencilIcon} />
          </View>
          <TouchableOpacity onPress={() => setOpen(!open)} style={styles.fieldRow}>
            <InputField
              placeholder={'Select Cuisine Types'}
              style={styles.input}
              icon={icons.cuisineIcon}
              // value={state.cuisine_types}
              textColor={themes.placeholder_color}
              editable={false}
            />
            <SvgXml xml={icons.yellowPencilIcon} />
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity onPress={() => onLogoutPress()}>
        <Text style={[styles.heading, styles.border]}>Logout</Text>
      </TouchableOpacity>
      <Button
        buttonText={'Change Password'}
        style={{ alignSelf: 'center', marginVertical: hp(4) }}
        onPress={() =>
          props.navigation.navigate(ROUTES.ResetPasswordScreen, { type: 'change' })
        }
      />
       <CuisineTypeModal
        modalVisible={open}
        cuisine_types={user?.cuisines}
        setModalVisible={setOpen}
        setValue={(type) => setState({
          ...state,
          cuisine_type: type
        })}
      />
      <View style={styles.view} />
    </Container>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  border: {
    borderBottomColor: themes.red,
    borderBottomWidth: 2,
    alignSelf: 'center',
  },
  view: {
    height: 80,
  },
  input: {
    width: wp(80),
    marginBottom: wp(2),
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});
