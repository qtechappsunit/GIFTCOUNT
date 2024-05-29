import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ROUTES from '../utils';
import Home from '../screen/main/Home';
import QRCode from '../screen/main/QRCode';
import Profile from '../screen/main/Profile';
import SVGIcons from '../components/SVGIcons';
import icons from '../assets/icons';
import themes from '../assets/themes';
import { Platform, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RestaurantDetail from '../screen/main/RestaurantDetail';
import EditProfileScreen from '../screen/main/EditProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabBarHeight = Platform.select({
  ios: hp('10%'),
  android: hp('9%'),
});

const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopWidth: 0,
          height: TabBarHeight,
          backgroundColor: themes.red,
        },
      }}>
      <Tab.Screen
        name={ROUTES.EditProfileScreen}
        component={EditProfileScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={styles.iconView}>
                {/* <SVGIcons image={icons.home_active} /> */}
                <SVGIcons image={icons.userRedIcon} />
              </View>
            ) : (
              <SVGIcons image={icons.userIcon} />
            ),
        }}
      />
      <Tab.Screen
        name={ROUTES.Home}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={styles.iconView}>
                {/* <SVGIcons image={icons.qrcode_active} /> */}
                <SVGIcons image={icons.home_active} />
              </View>
            ) : (
              // <SVGIcons image={icons.qrcode} />
              <SVGIcons image={icons.home} />
            ),
        }}
      />
      <Tab.Screen
        name={ROUTES.Profile}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            // focused ? (
            //   <View style={styles.iconView}>
            //     <SVGImage image={icons.home_active} />
            //   </View>
            // ) : (
            <SVGIcons image={icons.profile} />
          ),
          // ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  iconView: {
    backgroundColor: themes.white,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('5.5%'),
    borderRadius: 30,
    width: hp('11%'),
  },
});
