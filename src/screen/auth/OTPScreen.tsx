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
import { RouteProp } from '@react-navigation/native';
import { useSendCodeEmailMutation, useVerifyOTPMutation } from '../../Store/services';
import FormData from 'form-data';


interface OTPScreenProps {
    navigation: StackNavigationProp<AuthParams, 'OTPScreen'>,
    route: RouteProp<AuthParams, 'ForgetPassword'>
}

const OTPScreen = (props: OTPScreenProps) => {
    const { code, id, email } = props?.route?.params;
    console.log('code and id', code, id)

    const [OTPCode, setOTPCode] = useState<number>(code)
    const [timer, setTimer] = useState<number>(60)

    const [sendCodeEmail] = useSendCodeEmailMutation()
    const [verifyOTP, { isLoading }] = useVerifyOTPMutation()

    const startTimer = () => {
        let interval = setInterval(() => {
            setTimer(timer => {
                const time = timer > 0 && timer - 1;
                if (timer === 0) {
                    clearInterval(interval);
                    setTimer(60);
                }
                return time;
            });
        }, 1000);

        return () => clearInterval(interval)
    }


    const onResendCodePress = async () => {
        startTimer()
        var data = new FormData()
        data.append('email', email)
        await sendCodeEmail(data).unwrap().then((res) => {
            if (res.success) {
                setOTPCode(res.data.code)
                return ShowMessage('Resend Code', res.message, 'success')
            }
        }).catch((error) => {
            console.log('error resending the code ====>', error)
            return ShowMessage('Resend Code', 'Some problem occured', 'danger')
        })
    }

    const onSubmitPress = async () => {
        if (OTPCode) {
            var data = new FormData()
            data.append('code', OTPCode),
                data.append('id', id)
            await verifyOTP(data).unwrap().then(res => {
                if (res.success) {
                    props.navigation.navigate(ROUTES.ResetPasswordScreen, { type: 'reset', id: id })
                    return ShowMessage('Verify OTP', res.message, 'success')
                } else {
                    return ShowMessage('Verify OTP', res.message, 'warning')
                }
            }).catch((error) => {
                console.log('otp error ====>', error)
                return ShowMessage('Verify OTP', 'Some problem occured', 'danger')
            })
        }
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
                {timer < 60 ? (
                    <Text style={styles.timerDigits}>
                        {timer < 10 ? timer : '0:' + timer}
                    </Text>
                ) : (
                    <TouchableOpacity activeOpacity={0.9} onPress={() => onResendCodePress()}>
                        <Text style={styles.resendText}>Resend Code</Text>
                    </TouchableOpacity>
                )}
                <Button
                    buttonText={'Submit'}
                    style={styles.btn}
                    indicator={isLoading}
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