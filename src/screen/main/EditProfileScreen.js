import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import themes from '../../assets/themes';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../../assets/fonts';
import images from '../../assets/images';
import { SvgXml } from 'react-native-svg';
import icons from '../../assets/icons';
import InputField from '../../components/InputField';
import { useNavigation } from '@react-navigation/native';
import ROUTES from '../../utils';
import { useSelector } from 'react-redux';

const EditProfileScreen = () => {
    const { userType } = useSelector(state => state?.authReducer);
    const nav = useNavigation();

    return (
        <Container logo={true}>
            {userType == 'rider' ? (
                <Text style={styles.text}>Driver</Text>
            ) : userType == 'customer' ? (
                <Text style={styles.text}>Customer</Text>
            ) : (
                <Text style={styles.text}>Restaurant Owner</Text>
            )}
            <Text style={styles.heading}>Hi Mark,</Text>
            <Text style={styles.text}>
                Please enter your registered email {`\n`} and password.
            </Text>
            <View style={styles.userImageView}>
                <Image source={images.userImage} style={styles.userImage} />
                <SvgXml xml={icons.redPencilIcon} style={styles.pencilIcon} />
            </View>
            <View style={styles.fieldRow}>
                <InputField
                    placeholder={'Mark Ventura'}
                    style={styles.input}
                    icon={icons.userIcon}
                />
                <SvgXml xml={icons.yellowPencilIcon} />
            </View>
            <View style={styles.fieldRow}>
                <InputField
                    placeholder={'m.ventura@gmail.com'}
                    style={styles.input}
                    icon={icons.emailIcon}
                />
                <SvgXml xml={icons.yellowPencilIcon} />
            </View>
            <View style={styles.fieldRow}>
                <InputField
                    placeholder={'+1 234 678 3125'}
                    style={styles.input}
                    icon={icons.telePhone}
                />
                <SvgXml xml={icons.yellowPencilIcon} />
            </View>
            {userType == 'rider' ? (
                <View style={styles.fieldRow}>
                    <InputField
                        placeholder={'Bank IBAN'}
                        style={styles.input}
                        icon={icons.bankIcon}
                    />
                    <SvgXml xml={icons.yellowPencilIcon} />
                </View>
            ) : null}
            {userType != 'owner' ? (
                <View style={styles.fieldRow}>
                    <InputField
                        placeholder={'Physical Address'}
                        style={styles.input}
                        icon={icons.locIcon}
                    />
                    <SvgXml xml={icons.yellowPencilIcon} />
                </View>
            ) : (
                <>
                    <View style={styles.fieldRow}>
                        <InputField
                            placeholder={'Restaurant Address'}
                            style={styles.input}
                            icon={icons.locIcon}
                        />
                        <SvgXml xml={icons.yellowPencilIcon} />
                    </View>
                    <View style={styles.fieldRow}>
                        <InputField
                            placeholder={'Restaurant Name'}
                            style={styles.input}
                            icon={icons.grayHomeIcon}
                        />
                        <SvgXml xml={icons.yellowPencilIcon} />
                    </View>
                    <View style={styles.fieldRow}>
                        <InputField
                            placeholder={'Restaurant Website'}
                            style={styles.input}
                            icon={icons.websiteIcon}
                        />
                        <SvgXml xml={icons.yellowPencilIcon} />
                    </View>
                </>
            )}
            <TouchableOpacity onPress={() => nav.navigate(ROUTES.Login)}>
                <Text style={[styles.heading, styles.border]}>Logout</Text>
            </TouchableOpacity>
            <View style={styles.view} />
        </Container>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    border: {
        borderBottomColor: themes.red,
        borderBottomWidth: 2,
        alignSelf: 'center'
    },
    view: {
        height: 80
    },
    input: {
        width: wp(80),
        marginBottom: wp(2)
    },
    fieldRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    pencilIcon: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    userImage: {
        resizeMode: 'contain',
        width: wp(30),
        height: wp(30),
    },
    userImageView: {
        alignSelf: 'center',
        borderWidth: 5,
        borderColor: themes.white,
        borderRadius: 30,
        overflow: 'hidden',
        marginVertical: hp(2)
    },
    text: {
        color: themes.primary,
        marginVertical: hp(1.5),
        fontSize: hp(2.3),
        fontFamily: fonts.lexendBold,
    },
    heading: {
        color: themes.white,
        fontWeight: 'bold',
        fontSize: hp('4%'),
        fontFamily: fonts.markRegular,
    },
}); 