import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import images from '../../assets/images'
import { useNavigation } from '@react-navigation/native'
import themes from '../../assets/themes'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import fonts from '../../assets/fonts'

const PayrollScreen = () => {
    const nav = useNavigation();

    return (
        <Container logo={true}>
            <TouchableOpacity onPress={() => nav.goBack()} style={styles.backTouch}>
                <Image source={images.back} style={styles.back} />
            </TouchableOpacity>
            <Text style={styles.heading}>Payroll History</Text>
            <Text style={styles.text}>
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur
            </Text>
        </Container>
    )
}

export default PayrollScreen

const styles = StyleSheet.create({
    heading: {
        color: themes.white,
        fontWeight: 'bold',
        fontSize: hp('4%'),
        fontFamily: fonts.markRegular,
    },
    text: {
        color: themes.primary,
        marginVertical: hp(1.5),
        fontSize: hp(2.3),
        fontFamily: fonts.lexendBold,
    },
    back: {
        resizeMode: 'contain',
        width: wp(5),
        height: wp(5)
    },
    backTouch: {
        backgroundColor: themes.navy_blue,
        padding: 13,
        position: 'absolute',
        top: hp(10),
        borderRadius: 50,
        aspectRatio: 1,
    },
})