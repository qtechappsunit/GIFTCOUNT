import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnBoarding from '../screen/auth/OnBoarding'
import GetStart from '../screen/auth/GetStart'
import Login from '../screen/auth/Login'
import ROUTES from '../utils'
import Register from '../screen/auth/Register'
import ForgetPassword from '../screen/auth/ForgetPassword'
import OTPScreen from '../screen/auth/OTPScreen'
import ResetPasswordScreen from '../screen/auth/ResetPasswordScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthContainer from '../components/AuthContainer'
import Loader from '../components/Loader'
import themes from '../assets/themes'


const Stack = createNativeStackNavigator()

const AuthStack = () => {
    const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(null)

    const checkFirstTimeLaunch = async () => {
        // AsyncStorage.clear()
        const result = await AsyncStorage.getItem('isFirstTime')
        if (result == null) {
            console.log('first time launch')
            setIsFirstTimeLoad(true)
            await AsyncStorage.setItem('isFirstTime', 'false')
        } else {
            setIsFirstTimeLoad(false)
        }
    }

    useEffect(() => {

        checkFirstTimeLaunch()

    }, [])

    if(isFirstTimeLoad == null) {
        return (
            <AuthContainer>
                <Loader size={'large'} color={themes.primary}  />
            </AuthContainer>
        )
    }


    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom'
            }}
        >
            {isFirstTimeLoad ?
                <Stack.Screen name={'IntroductionStack'} component={IntroductionStack} />
                :
                <Stack.Screen
                    name={'LoginStack'}
                    component={LoginStack}
                />
            }
        </Stack.Navigator>
    )
}

const IntroductionStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom'
            }}
        >
            <Stack.Screen name={ROUTES.OnBoarding} component={OnBoarding} />
            <Stack.Screen name={ROUTES.Starting} component={GetStart} />
            <Stack.Screen name={ROUTES.Register} component={Register} />
            <Stack.Screen name={ROUTES.Login} component={Login} />
            <Stack.Screen name={ROUTES.ForgetPassword} component={ForgetPassword} />
            <Stack.Screen
                name={ROUTES.OTPScreen}
                component={OTPScreen}
            />
            <Stack.Screen
                name={ROUTES.ResetPasswordScreen}
                component={ResetPasswordScreen}
            />
        </Stack.Navigator>
    )
}

const LoginStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom'
            }}
        >
            <Stack.Screen name={ROUTES.Login} component={Login} />
            <Stack.Screen name={ROUTES.Register} component={Register} />
            <Stack.Screen name={ROUTES.ForgetPassword} component={ForgetPassword} />
            <Stack.Screen
                name={ROUTES.OTPScreen}
                component={OTPScreen}
            />
            <Stack.Screen
                name={ROUTES.ResetPasswordScreen}
                component={ResetPasswordScreen}
            />
        </Stack.Navigator>
    )
}


export default AuthStack
