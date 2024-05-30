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
import AnalyticsScreen from '../screen/main/AnalyticsScreen';
import PayrollScreen from '../screen/main/PayrollScreen';

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
        name={ROUTES.AnalyticStack}
        component={AnalyticalStack}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={styles.iconView}>
                <SVGIcons image={icons.redAnalyticsIcon} />
              </View>
            ) : (
              <SVGIcons image={icons.whiteAnalyticsIcon} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const AnalyticalStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
      }}
      initialRouteName={ROUTES.AnalyticsScreen}
    >
      <Stack.Screen name={ROUTES.AnalyticsScreen} component={AnalyticsScreen} />
      <Stack.Screen name={ROUTES.PayrollScreen} component={PayrollScreen} />
    </Stack.Navigator>
  )
}

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
