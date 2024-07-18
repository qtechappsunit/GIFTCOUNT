import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Container from '../../components/Container';
import themes from '../../assets/themes';
import fonts from '../../assets/fonts';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../assets/images';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import ROUTES from '../../utils';

const AnalyticsScreen = () => {
    const nav = useNavigation();

    return (
        <Container logo={true}>
            <Text style={styles.text}>Driver</Text>
            <Text style={styles.heading}>Hi Mark,</Text>
            <Text style={styles.text}>
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur
            </Text>
            <View style={styles.box}>
                <Text style={styles.subHead}>Points</Text>
                <Image source={images.star} style={styles.icon} />
                <View>
                    <Text style={styles.innerHead}>Points{`\n`}Earned</Text>
                    <Text style={styles.innerVal}>60</Text>
                </View>
                <View>
                    <Text style={styles.innerHead}>Points{`\n`}Worth</Text>
                    <Text style={styles.innerVal}>$5</Text>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.subHead}>QR codes</Text>
                <Image source={images.qrCode} style={styles.icon} />
                <View>
                    <Text style={styles.innerHead}>QR codes{`\n`}scanned</Text>
                    <Text style={styles.innerVal}>60</Text>
                </View>
                <View>
                    <Text style={styles.innerHead}>Links{`\n`}clicked</Text>
                    <Text style={styles.innerVal}>30</Text>
                </View>
            </View>
            <Button
                buttonText={'Payroll History'}
                style={styles.btn}
                onPress={() => nav.navigate(ROUTES.PayrollScreen)}
            />
        </Container>
    );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({
    btn: {
        // width: wp(90),
        alignSelf: 'center',
        marginVertical: hp(5),
        paddingVertical: hp(2.5)
    },
    innerVal: {
        color: themes.red1,
        fontSize: wp(8),
        fontFamily: fonts.lexendBold
    },
    innerHead: {
        color: themes.navy_blue,
        textAlign: 'center',
        fontSize: wp(3),
    },
    icon: {
        resizeMode: 'contain',
        width: wp(15),
        height: wp(15),
        marginLeft: wp(18)
    },
    subHead: {
        color: themes.red1,
        fontFamily: fonts.markRegular,
        fontSize: wp(4),
        transform: [{ rotate: '-90deg' }],
        position: 'absolute',
        left: 0
    },
    box: {
        backgroundColor: themes.gray1,
        padding: 20,
        borderRadius: 20,
        marginBottom: hp(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    heading: {
        color: themes.white,
        // fontWeight: 'bold',
        fontSize: hp('4%'),
        fontFamily: fonts.markRegular,
    },
    text: {
        color: themes.primary,
        marginVertical: hp(1.5),
        fontSize: hp(2.3),
        fontFamily: fonts.lexendBold,
    },
});