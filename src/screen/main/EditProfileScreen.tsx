import React from 'react';
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
import ROUTES from '../../utils';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import { RootState } from '../../Store/Reducer';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { tabBarParams } from '../../routes/MainStack';

interface EditProfileProps {
  navigation: BottomTabNavigationProp<tabBarParams, 'EditProfileScreen'>
}

const EditProfileScreen = (props: EditProfileProps) => {
  const { userType } = useSelector((state: RootState) => state?.authReducer);

  return (
    <Container logo={true}>
      {userType == 'rider' ? (
        <Text style={styles.text}>Driver</Text>
      ) : userType == 'customer' ? (
        <Text style={styles.text}>Customer</Text>
      ) : (
        <Text style={styles.text}>Restaurant Owner</Text>
      )}
      <Text style={styles.heading}>Hi Mark,</Text>
      <Text style={styles.text}>
        Please enter your registered email {`\n`} and password.
      </Text>
      <View style={styles.userImageView}>
        <Image source={images.userImage} style={styles.userImage} />
        <SvgXml xml={icons.redPencilIcon} style={styles.pencilIcon} />
      </View>
      <View style={styles.fieldRow}>
        <InputField
          placeholder={'Mark Ventura'}
          textColor={themes.placeholder_color}
          style={styles.input}
          icon={icons.userIcon}
        />
        <SvgXml xml={icons.yellowPencilIcon} />
      </View>
      <View style={styles.fieldRow}>
        <InputField
          placeholder={'m.ventura@gmail.com'}
          textColor={themes.placeholder_color}
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
          icon={icons.locIcon}
        />
        <SvgXml xml={icons.yellowPencilIcon} />
      </View>
      <View style={styles.fieldRow}>
        <InputField
          placeholder={'City'}
          textColor={themes.placeholder_color}
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
          icon={icons.locIcon}
        />
        <SvgXml xml={icons.yellowPencilIcon} />
      </View>
      <View style={styles.fieldRow}>
        <InputField
          placeholder={'Zip-code'}
          textColor={themes.placeholder_color}
          style={styles.input}
          keyboardType={'numeric'}
          icon={icons.locIcon}
        />
        <SvgXml xml={icons.yellowPencilIcon} />
      </View>
      {userType == 'rider' ? (
        <View style={styles.fieldRow}>
          <InputField
            placeholder={'Bank IBAN'}
            style={styles.input}
            textColor={themes.placeholder_color}
            icon={icons.bankIcon}
          />
          <SvgXml xml={icons.yellowPencilIcon} />
        </View>
      ) : null}
      {userType == 'owner' && (
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
              icon={icons.grayHomeIcon}
            />
            <SvgXml xml={icons.yellowPencilIcon} />
          </View>
          <View style={styles.fieldRow}>
            <InputField
              placeholder={'Restaurant Website'}
              style={styles.input}
              icon={icons.websiteIcon}
              textColor={themes.placeholder_color}
            />
            <SvgXml xml={icons.yellowPencilIcon} />
          </View>
        </>
      )}
      <TouchableOpacity onPress={() => props.navigation.navigate(ROUTES.Login)}>
        <Text style={[styles.heading, styles.border]}>Logout</Text>
      </TouchableOpacity>
      <Button
        buttonText={'Change Password'}
        style={{ alignSelf: 'center', marginVertical: hp(4) }}
        onPress={() =>
          props.navigation.navigate(ROUTES.ResetPasswordScreen, { type: 'change' })
        }
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
    resizeMode: 'contain',
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
