import { Linking } from 'react-native';
import images from '../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  HomeStack: 'HomeStack',
  AnalyticsScreen: 'AnalyticsScreen',
  PayrollScreen: 'PayrollScreen',
  CreateCouponScreen: 'CreateCouponScreen',
};

export const categories = [
  {
    id: 1,
    cat: images.cat3,
    text: 'All',
  },
  {
    id: 2,
    cat: images.cat1,
    text: 'Pizza',
  },
  {
    id: 3,
    cat: images.cat2,
    text: 'Burger',
  },
  {
    id: 4,
    cat: images.cat5,
    text: 'Mexican',
  },
  {
    id: 5,
    cat: images.cat4,
    text: 'Asian',
  },
];

export const restaurants = [
  {
    id: 1,
    image: images.restaurant3,
    name: 'Burger Den - Coupon 1',
    validity: '24-04-2024',
  },
  {
    id: 2,
    image: images.restaurant3,
    name: 'Burger Den - Coupon 2',
    discount: '50%',
    validity: 'Mon, Tue, Wed, Thu, Fri, Sat & Sun',
    hours: '(22:00 - 23:59)',
  },
];

export const multipleImages = [
  {
    id: 1,
    image: images.restaurant3,
  },
  {
    id: 2,
    image: images.restaurant3,
  },
  {
    id: 3,
    image: images.restaurant3,
  },
  {
    id: 4,
    image: images.restaurant3,
  },
  {
    id: 5,
    image: images.restaurant3,
  },
];

export const OptionsData = [
  {
    id: 1,
    text: 'Scan QR Code',
    icon: images.qr_code,
  },
  {
    id: 2,
    text: 'Input Coupon Code',
    icon: ''
  }
]

export const getUserType = async key => {
  return await AsyncStorage.getItem(key);
};

export const setUserType = (key, type) => {
  AsyncStorage.setItem(key, type);
};

export const linking = async url => {
  await Linking.openURL(url);
};

export default ROUTES;
