import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import AppStatusBar from '../components/AppStatusBar';
import ROUTES from '../utils';
import MainStack from './MainStack';
import Points from '../screen/main/Points';
import OTPScreen from '../screen/auth/OTPScreen';
import ResetPasswordScreen from '../screen/auth/ResetPasswordScreen';
import ForgetPassword from '../screen/auth/ForgetPassword';

export type AuthParams = {
  AuthStack: undefined,
  MainStack: undefined,
  OTPScreen: {
    type: string
  }
  ForgetPassword: undefined,
  ResetPasswordScreen: undefined,
  Points: undefined
}

const Stack = createNativeStackNavigator<AuthParams>();


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
          <Stack.Screen
            name={ROUTES.ForgetPassword}
            component={ForgetPassword}
          />
          <Stack.Screen name={ROUTES.OTPScreen} component={OTPScreen} />
          <Stack.Screen
            name={ROUTES.ResetPasswordScreen}
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
