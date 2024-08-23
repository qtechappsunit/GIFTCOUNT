import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import themes from '../../assets/themes';
import fonts from '../../assets/fonts';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InputField from '../../components/InputField';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import ROUTES, { ShowMessage } from '../../utils';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthParams } from '../../routes';
import { RouteProp, useNavigation } from '@react-navigation/native';


interface OTPScreenProps {
    navigation: StackNavigationProp<AuthParams, 'OTPScreen'>,
    route: RouteProp<AuthParams, 'ForgetPassword'>
}

const OTPScreen = (props: OTPScreenProps) => {

    const [OTPCode, setOTPCode] = useState<number>('')

    const nav = useNavigation()

    const onResendCodePress = async () => {
        
    }

    const onSubmitPress = async () => {
        nav.navigate(ROUTES.ResetPasswordScreen,{type: 'reset'})
    }

    return (
        <Container logo={true}>
            <View style={styles.inner}>
                <Text style={styles.heading}>OTP Sent</Text>
                <Text style={styles.text}>
                    Check your email to view the OTP
                </Text>
                <InputField
                    placeholder={'Enter OTP'}
                    style={styles.input}
                    value={OTPCode.toString()}
                    onChangeText={(text) => setOTPCode(text)}
                    textColor={themes.placeholder_color}
                    keyboardType={'numeric'}
                    icon={icons.password}
                />
                    <TouchableOpacity activeOpacity={0.9} onPress={() => onResendCodePress()}>
                        <Text style={styles.resendText}>Resend Code</Text>
                    </TouchableOpacity>
                <Button
                    buttonText={'Submit'}
                    style={styles.btn}
                    onPress={() => onSubmitPress()}
                />
            </View>
        </Container>
    );
};

export default OTPScreen;

const styles = StyleSheet.create({
    input: {
        marginBottom: hp(2.4),
    },
    btn: {
        marginVertical: hp(2)
    },
    text: {
        color: themes.primary,
        marginVertical: hp(1.5),
        fontSize: hp(2.3),
        fontFamily: fonts.lexendBold,
        textAlign: 'center'
    },
    inner: {
        height: hp(80),
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        color: themes.white,
        fontSize: hp(4),
        fontFamily: fonts.markRegular,
    },
    resendText: {
        color: themes.primary,
        fontWeight: 'bold',
        fontSize: hp(2),
        marginBottom: hp(2),
        marginTop: hp(1),
    },
    timerDigits: {
        color: themes.primary,
        fontWeight: 'bold'
    }
});