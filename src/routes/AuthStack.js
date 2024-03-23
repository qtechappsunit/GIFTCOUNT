import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnBoarding from '../screen/auth/OnBoarding'
import GetStart from '../screen/auth/GetStart'
import Login from '../screen/auth/Login'
import ROUTES from '../utils'
import Register from '../screen/auth/Register'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom'
            }}
        >
            <Stack.Screen name={ROUTES.OnBoarding} component={OnBoarding} />
            <Stack.Screen name={ROUTES.Starting} component={GetStart} />
            <Stack.Screen name={ROUTES.Login} component={Login} />
            <Stack.Screen name={ROUTES.Register} component={Register} />
        </Stack.Navigator>
  )
}

export default AuthStack
