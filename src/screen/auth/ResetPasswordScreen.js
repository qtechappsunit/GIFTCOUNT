import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Container from '../../components/Container';
import themes from '../../assets/themes';
import fonts from '../../assets/fonts';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InputField from '../../components/InputField';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import ROUTES from '../../utils';
import { useNavigation } from '@react-navigation/native';

const ResetPasswordScreen = () => {
    const nav = useNavigation();

    return (
        <Container logo={true}>
            <View style={styles.inner}>
                <Text style={styles.heading}>Reset Password</Text>
                <Text style={styles.text}>
                    Please enter your new password
                </Text>
                <InputField
                    placeholder={'Enter new password'}
                    style={styles.input}
                    keyboardType={'email-address'}
                    icon={icons.password}
                />
                <InputField
                    placeholder={'Retype new password'}
                    style={styles.input}
                    keyboardType={'email-address'}
                    icon={icons.password}
                />
                <Button
                    buttonText={'Submit'}
                    style={styles.btn}
                    onPress={() => nav.navigate(ROUTES.Login)}
                />
            </View>
        </Container>
    );
};

export default ResetPasswordScreen;

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
        fontWeight: 'bold',
        fontSize: hp(4),
        fontFamily: fonts.markRegular,
    },
});