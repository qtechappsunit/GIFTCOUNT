import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import themes from '../assets/themes';

const DateModal = ({onConfirm,text, mode}) => {
  const [isVisible, setIsVisible] = useState();

  return (
    <TouchableOpacity
      style={styles.dateContainer}
      activeOpacity={0.9}
      onPress={() => setIsVisible(true)}>
      <DateTimePickerModal
        isVisible={isVisible}
        mode={mode}
        onConfirm={onConfirm}
        onCancel={() => setIsVisible(false)}
      />
      <Text style={styles.dateText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default DateModal;

const styles = StyleSheet.create({
  dateContainer: {
    padding: hp(1.8),
    width: '38%',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: themes.navy_blue,
    paddingHorizontal: 15,
  },
  dateText: {
    color: themes.white,
    fontSize: hp(1.7),
  },
});
