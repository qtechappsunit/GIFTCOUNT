import {
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import images from '../assets/images';
import Button from './Button';
import themes from '../assets/themes';
import fonts from '../assets/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const CongratsModal = ({modalVisible, setModalVisible}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <ImageBackground
            source={images.congratsModalBg}
            resizeMode="cover"
            style={styles.modalView}>
            <Text style={styles.congratsText}>Congratulations!</Text>
            <Text style={styles.codeText}>#1234CD2</Text>
            <Text style={styles.disText}>Use coupon to get 50% discount</Text>
            <Button
              buttonText={'GOT IT'}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CongratsModal;

const styles = StyleSheet.create({
  disText: {
    color: themes.black,
    fontSize: wp(4),
    fontFamily: fonts.bold,
    marginBottom: hp(5),
  },
  codeText: {
    color: themes.black,
    fontSize: wp(5.5),
    fontFamily: fonts.bold,
    marginVertical: hp(1.5),
  },
  congratsText: {
    color: themes.black,
    fontFamily: fonts.bold,
    fontSize: wp(6.5),
    marginVertical: hp(2),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: themes.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
});
