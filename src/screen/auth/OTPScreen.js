import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Container from '../../components/Container';
import themes from '../../assets/themes';
import fonts from '../../assets/fonts';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InputField from '../../components/InputField';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import ROUTES from '../../utils';

const OTPScreen = () => {
    const nav = useNavigation();

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
                    textColor={themes.placeholder_color}
                    keyboardType={'email-address'}
                    icon={icons.password}
                />
                <Button
                    buttonText={'Submit'}
                    style={styles.btn}
                    onPress={() => nav.navigate(ROUTES.ResetPasswordScreen,{type: 'reset'})}
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
});