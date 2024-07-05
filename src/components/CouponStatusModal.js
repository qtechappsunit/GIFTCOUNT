import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import themes from '../assets/themes';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const CouponStatusModal = ({setVisible, visible, onStatusChange}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(!visible)}>
      <TouchableWithoutFeedback onPress={() => setVisible(!visible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want {'\n'}to change Coupon{'\n'} Status ?
            </Text>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.9}
                onPress={() => onStatusChange('yes')}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.9}
                onPress={() => onStatusChange('no')}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CouponStatusModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: themes.white,
    borderRadius: 20,
    paddingVertical: 65,
    alignItems: 'center',
    shadowColor: themes.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: wp(90),
  },
  modalText: {
    textAlign: 'center',
    fontSize: hp(3),
    color: themes.light_black1,
    fontWeight: 'bold',
  },
  buttonView: {
    flexDirection: 'row',
    gap: 30,
    paddingTop: hp(3),
  },
  buttonStyle: {
    backgroundColor: themes.light_black1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
    borderRadius: 10,
    padding: hp(1.5),
  },
  buttonText: {
    color: themes.white,
    fontWeight: 'bold',
    fontSize: hp(2),
  },
});
