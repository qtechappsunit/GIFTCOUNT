import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import themes from '../assets/themes'
import Button from './Button'
import fonts from '../assets/fonts'

const ConfirmationModal = ({ visible, onRequestClose, onPressOut, onCancel, onConfirm, modalText,isLoading }) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <TouchableOpacity style={styles.modalWrapper} onPress={onPressOut} activeOpacity={2}>
                <View style={styles.modalView}>
                    <Text style={styles.text}>{modalText}</Text>
                    <View style={styles.buttonWrapper}>
                        <Button
                            buttonText={'Cancel'}
                            style={styles.cancelButton}
                            onPress={onCancel}
                            textStyle={{ color: themes.white }}
                        />
                        <Button
                            buttonText={'Confirm'}
                            onPress={onConfirm}
                            indicator={isLoading}
                            style={styles.confirmButton}
                            textStyle={{ color: themes.white }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default ConfirmationModal

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(51, 51, 51, 0.5)'
    },
    modalView: {
        alignItems: 'center',
        backgroundColor: themes.primary,
        paddingVertical: 20,
        elevation: 6,
        borderRadius: 10,
        width: '80%',
        padding: hp('1%'),
    },
    text: {
        color: themes.black,
        textAlign: 'center',
        fontFamily: fonts.markRegular,
        fontSize: hp('2.5%')
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: hp('4%'),
        // backgroundColor: 'red',
        gap: 10,
    },
    cancelButton: {
        backgroundColor: themes.black,
        width: '45%'
    },
    confirmButton: {
        width: '45%'
    }
})