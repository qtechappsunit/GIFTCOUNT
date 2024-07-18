import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import themes from '../assets/themes';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import fonts from '../assets/fonts';

const ManualEntryModal = ({setVisible, visible}) => {
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(!visible)}>
      <TouchableWithoutFeedback onPress={() => setVisible(!visible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter Discount Code</Text>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              textContentType="oneTimeCode"
              autoComplete={Platform.select({
                android: 'sms-otp',
                default: 'one-time-code',
              })}
              testID="my-code-input"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor delay={1000} /> : null)}
                </Text>
              )}
            />
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.9}
              onPress={() => setVisible(!visible)}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ManualEntryModal;

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
    paddingVertical: 36,
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
    fontFamily: fonts.markRegular,
  },
  buttonView: {
    flexDirection: 'row',
    gap: 30,
    paddingTop: hp(3),
  },
  buttonStyle: {
    backgroundColor: themes.red,
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    borderRadius: 10,
    marginTop: hp(1),
    padding: hp(1.5),
  },
  buttonText: {
    color: themes.white,
    fontWeight: 'bold',
    fontSize: hp(2),
  },
  cell: {
    width: hp(5.5),
    paddingVertical: hp(1),
    fontSize: hp(2.8),
    marginHorizontal: hp(0.5),
    marginVertical: hp(3),
    borderRadius: 10,
    backgroundColor: themes.light_black1,
    color: themes.white,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
