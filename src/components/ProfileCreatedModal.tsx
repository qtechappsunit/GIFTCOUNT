import React from 'react';
import { Image, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import themes from '../assets/themes';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../assets/images';
import fonts from '../assets/fonts';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import ROUTES from '../utils';

const ProfileCreatedModal = ({ modalVisible, setModalVisible }) => {


    const nav = useNavigation();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image source={images.profileCreatedImage} style={styles.profileCreatedImage} />
                        <Text style={styles.modalText}>Profile Successfully{`\n`}Created!</Text>
                        <Text style={styles.bodyText}>Congratulations! Your profile has been{`\n`}successfully created</Text>
                        <Button
                            buttonText={'My Dashboard'}
                            style={styles.btn}
                            onPress={() => nav.navigate(ROUTES.MainStack)}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ProfileCreatedModal;

const styles = StyleSheet.create({
    btn: {
        alignSelf: 'center',
        marginVertical: hp(2),
        width: wp(55),
        borderRadius: 100
    },
    bodyText: {
        color: themes.gray2,
        fontFamily: fonts.markRegular,
        fontSize: wp(3),
        textAlign: 'center',
    },
    modalText: {
        color: themes.navy_blue,
        fontFamily: fonts.lexendSemiBold,
        fontSize: wp(6),
        marginBottom: wp(5),
        textAlign: 'center'
    },
    profileCreatedImage: {
        width: wp(40),
        height: wp(40),
        borderRadius: 100,
        marginBottom: wp(3)
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        alignItems: 'center',
        margin: 20,
        backgroundColor: themes.white,
        borderRadius: 20,
        padding: 35,
        width: wp(80),
        shadowColor: themes.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

});