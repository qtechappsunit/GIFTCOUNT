import {Linking} from 'react-native';
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
    image: images.restaurant1,
    name: 'Rose Garden Restaurant',
    discount: '50% Discount',
    items: 'Burger - Chicken - Riche - Wings',
    rating: '5.7',
    validity: '24-04-2024',
  },
  {
    id: 2,
    image: images.restaurant2,
    name: 'Rose Garden Restaurant',
    discount: '40% Discount',
    items: 'Burger - Chicken - Riche - Wings',
    rating: '4.7',
    validity: '24-04-2024',
  },
];

export const multipleImages = [
  {
    id: 1,
    image: images.detail,
  },
  {
    id: 2,
    image: images.detail,
  },
  {
    id: 3,
    image: images.detail,
  },
  {
    id: 4,
    image: images.detail,
  },
  {
    id: 5,
    image: images.detail,
  },
];

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
