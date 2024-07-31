import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import themes from '../assets/themes';
import fonts from '../assets/fonts';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Button from './Button';
import Loader from './Loader';


interface ModalProps {
    modalVisible: boolean,
    setModalVisible: () => void,
    cuisine_types: [],
    indicator: boolean,
    setValue: () => void
}

const CuisineTypeModal = (props: ModalProps) => {
    const [selectedIds, setSelectedIds] = useState([])


    console.log('dataa',props.cuisine_types)

    useEffect(() => {

        props.setValue(selectedIds)

    },[selectedIds])


    const handleCheckPress = (isChecked, val) => {
        setSelectedIds(prevIds => {
            if (isChecked) {
              return prevIds.includes(val?.id) ? prevIds : [...prevIds, val?.id];
            } else {
              return prevIds.filter(existingId => existingId !== val?.id);
            }
          });
    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => props.setModalVisible(!props.modalVisible)}>
            <TouchableWithoutFeedback onPress={() => props.setModalVisible(!props.modalVisible)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Select{`\n`}Cuisine Type</Text>
                        {props.cuisine_types?.length < 1 ?
                                    <Text style={styles.message}>No Cuisine Types</Text>
                            :
                        props.indicator ?
                            <Loader size={'small'} color={themes.red} style={{alignSelf: 'center'}} />
                            :
                        props.cuisine_types?.map(val => (
                            <BouncyCheckbox
                                key={val?.id}
                                size={25}
                                fillColor={themes.navy_blue}
                                unFillColor="#FFFFFF"l
                                text={val?.title}
                                isChecked={val?.pivot ? val?.pivot?.cuisine_type_id : selectedIds.includes(val?.id)}
                                iconStyle={{ borderColor: themes.navy_blue, borderRadius: 5 }}
                                innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
                                textStyle={{ textDecorationLine: 'none' }}
                                style={{ marginBottom: wp(3) }}
                                onPress={(isChecked) => handleCheckPress(isChecked, val)}
                            />
                        ))}
                        <Button
                            buttonText={'Submit'}
                            style={styles.btn}
                            onPress={() => props.setModalVisible(!props.modalVisible)}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default CuisineTypeModal;

const styles = StyleSheet.create({
    btn: {
        alignSelf: 'center',
        marginVertical: hp(2),
        width: wp(70),
    },
    modalText: {
        color: themes.red1,
        fontFamily: fonts.markRegular,
        fontSize: wp(6),
        marginBottom: wp(5),
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
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
    message: {
        color: themes.light_black,
        marginVertical: hp(1),
        fontSize: hp(2),
        fontFamily: fonts.markRegular,
        alignSelf: 'center',
    }
});