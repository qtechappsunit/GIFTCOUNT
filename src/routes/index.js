import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import AppStatusBar from '../components/AppStatusBar';
import ROUTES from '../utils';
import MainStack from './MainStack';
import RestaurantDetail from '../screen/main/RestaurantDetail';
import Points from '../screen/main/Points';
import OTPScreen from '../screen/auth/OTPScreen';
import ResetPasswordScreen from '../screen/auth/ResetPasswordScreen';
import QRCode from '../screen/main/QRCode';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <>
      <AppStatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}>
          <Stack.Screen name={ROUTES.AuthStack} component={AuthStack} />
          <Stack.Screen name={ROUTES.MainStack} component={MainStack} />
          <Stack.Screen name={ROUTES.Points} component={Points} />
          {/* <Stack.Screen name={ROUTES.RestaurantDetail} component={RestaurantDetail} /> */}
          <Stack.Screen name={ROUTES.OTPScreen} component={OTPScreen} />
          <Stack.Screen name={ROUTES.ResetPasswordScreen} component={ResetPasswordScreen} />
          <Stack.Screen name={ROUTES.QRCode} component={QRCode} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
