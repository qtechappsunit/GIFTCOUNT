import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnBoarding from '../screen/auth/OnBoarding'
import GetStart from '../screen/auth/GetStart'
import Login from '../screen/auth/Login'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom'
            }}
        >
            <Stack.Screen name='OnBoarding' component={OnBoarding} />
            <Stack.Screen name='GetStart' component={GetStart} />
            <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
  )
}

export default AuthStack
