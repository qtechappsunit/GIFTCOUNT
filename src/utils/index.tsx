import { Linking } from 'react-native';
import images from '../assets/images'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import themes from '../assets/themes';


export const slides = [
  {
    key: 1,
    text: 'Delicious savings, every bite.',
  },
  {
    key: 2,
    text: 'Treat yourself, for less.',
  },
  {
    key: 3,
    text: 'The perfect gift: savings and satisfaction.',
  },
];

export const typeImages = [
  {
    id: 1,
    image: images.driver,
    type: 'rider',
  },
  {
    id: 2,
    image: images.customer,
    type: 'customer',
  },
  {
    id: 3,
    image: images.restaurantOwner,
    type: 'owner',
  },
];

export const socialIcons = [
  {
    id: 1,
    icon: images.facebook,
  },
  {
    id: 2,
    icon: images.gmail,
  },
  {
    id: 3,
    icon: images.apple,
  },
];

const ROUTES = {
  AuthStack: 'AuthStack',
  MainStack: 'MainStack',
  OnBoarding: 'OnBoarding',
  Starting: 'GetStart',
  Login: 'Login',
  Register: 'Register',
  Home: 'Home',
  QRCode: 'QRCode',
  Profile: 'Profile',
  RestaurantDetail: 'RestaurantDetail',
  Points: 'Points',
  ForgetPassword: 'ForgetPassword',
  OTPScreen: 'OTPScreen',
  ResetPasswordScreen: 'ResetPasswordScreen',
  EditProfileScreen: 'EditProfileScreen',
  AnalyticStack: 'AnalyticStack',
  ProfileStack: 'ProfileStack',
  HomeStack: 'HomeStack',
  AnalyticsScreen: 'AnalyticsScreen',
  PayrollScreen: 'PayrollScreen',
  CreateCouponScreen: 'CreateCouponScreen',
};


export const getUserType = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export const setUserType = (key: string, type: string) => {
  AsyncStorage.setItem(key, type);
};

export const linking = async (url: string) => {
  await Linking.openURL(url);
};

export const ShowMessage = (message, description, type) => {
  return showMessage({
    message: message,
    description: description,
    type: type,
    duration: 3000,
    backgroundColor: themes.red,
    color: themes.white,
    icon: "auto",
    animated: true,

  });
}


export const getRequiredFields = (userType: string) => {
  const commonFields = ['phone', 'street', 'city', 'state', 'zip_code', 'email', 'password', 'profile_pic'];
  const userFields = {
    rider: ['first_name', 'last_name', 'bank_iban'],
    customer: ['first_name', 'last_name'],
    owner: ['restaurant_name', 'owner_name', 'restaurant_web', 'cuisine_type'],
  };

  return [...userFields[userType], ...commonFields]
};

export const validateFields = (state: any, userType: string) => {
  const requiredFields = getRequiredFields(userType)

  for (let field of requiredFields) {
    if (!state[field]) {
      return `Please enter your ${field.replace('_', ' ')}`
    }
  }

  if (state.password.length < 6) {
    return 'Password is too short'
  }

  if (state.password !== state.cpassword) {
    return 'Password does not match'
  }
};

export const validateQRCodeFormat = (data) => {
  const parts = data.split(':');
  return parts.length === 2 && parts.every(part => part.trim().length > 0);
};

export const parseQRCodeData = (data) => {

  try {
    const [couponId, driverId] = data.split(':');
    if (!isValidId(couponId) || !isValidId(driverId)) {
      console.log('Invalid IDs');
    }
    return { couponId, driverId };
  } catch (error) {
    return null;
  }
};

const isValidId = (id) => /^[a-zA-Z0-9]+$/.test(id);







export default ROUTES;
