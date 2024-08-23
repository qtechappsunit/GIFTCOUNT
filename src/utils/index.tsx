import {Linking, Platform} from 'react-native';
import images from '../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import themes from '../assets/themes';
import {PERMISSIONS, request} from 'react-native-permissions';

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
    type: 'driver',
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

export const cuisineTypes = [
  {
    id: 1,
    title: 'Bar B Que',
  },
  {
    id: 2,
    title: 'Fast Food',
  },
  {
    id: 3,
    title: 'Pizza',
  },
  {
    id: 4,
    title: 'Japanese',
  },
  {
    id: 5,
    title: 'Chinese',
  },
  {
    id: 6,
    title: 'Thai',
  },
];

export const foodCategories = [
  {
    id: 1,
    title: 'All',
    image: images.cat3,
  },
  {
    id: 2,
    title: 'Pizza',
    image: images.cat1,
  },
  {
    id: 3,
    title: 'Burger',
    image: images.cat2,
  },
  {
    id: 4,
    title: 'Mexican',
    image: images.cat5,
  },
  {
    id: 5,
    title: 'Asian',
    image: images.cat4,
  },
];

export const couponsData = [
  {
    id: 1,
    coupon_image: images.restaurant3,
    title: 'Burger Den - Coupon 1',
    validity: '24-04-2024',
    discount: 50,
  },
  {
    id: 2,
    coupon_image: images.restaurant3,
    title: 'Burger Den - Coupon 2',
    validity: '24-04-2024',
    discount: 50,
    hours: '(22:00-23:59)'
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

export const couponOptions = [
  {
    id: 1,
    option: 'Edit Coupon',
  },
  {
    id: 2,
    option: 'Delete Coupon',
  },
];

export const Weekdays = [
  {
    id: 1,
    title: 'Mon',
  },
  {
    id: 2,
    title: 'Tue',
  },
  {
    id: 3,
    title: 'Wed',
  },
  {
    id: 4,
    title: 'Thur',
  },
  {
    id: 5,
    title: 'Fri',
  },
  {
    id: 6,
    title: 'Sat',
  },
  {
    id: 7,
    title: 'Sun',
  },
];

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
    statusBarHeight: 0,
    backgroundColor: themes.red,
    color: themes.white,
    icon: 'auto',
    animated: true,
  });
};


export const requestPermission = async permissionType => {
  let permissionSet;
  const apiLevel = Platform.constants.Release;
  // console.log('hello world', apiLevel);
  if (Platform.OS === 'ios') {
    switch (permissionType) {
      case 'media':
        permissionSet = Platform.select({
          ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        });
        break;

      default:
        console.log('unknown permission type');
    }
  } else if (Platform.OS === 'android') {
    switch (permissionType) {
      case 'media':
        if (apiLevel < 10) {
          permissionSet = Platform.select({
            android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          });
        } else {
          return 'granted';
        }
        break;

      default:
        console.log('unknown permission type');
    }
  }
  if (permissionSet) {
    const status = await request(permissionSet);
    return status;
  }
};

export default ROUTES;
