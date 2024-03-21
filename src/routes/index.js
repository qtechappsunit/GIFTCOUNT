import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import AppStatusBar from '../components/AppStatusBar';

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
          <Stack.Screen name="AuthStack" component={AuthStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
