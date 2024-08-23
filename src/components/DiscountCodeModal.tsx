import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../assets/images';
import themes from '../assets/themes';
import fonts from '../assets/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from './Button';
import icons from '../assets/icons';
import RedirectingModal from './RedirectingModal';

const DiscountCodeModal = ({modalVisible, setModalVisible}) => {
  const [redirect, setRedirect] = useState(false);

  const onRestaurantCall = async () => {};

  const onRestaurantWeb = async () => {
    setRedirect(!redirect);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <View style={styles.centeredView}>
        <ImageBackground
          source={images.congratsModalBg}
          resizeMode="cover"
          style={styles.modalView}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setModalVisible(false)}
            style={{alignSelf: 'flex-end'}}>
            <Image source={images.cross} style={styles.crossStyle} />
          </TouchableOpacity>
          <Text style={styles.modalText}>Discount Code</Text>
          <View style={styles.row}>
            {['B', 'B', '5', '6', '7', 'M']?.map((val, ind) => (
              <View key={ind} style={styles.codeLetterView}>
                <Text style={[styles.codeLetter]}>{val}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.disText}>Use the code get 50% discount</Text>
          <Button
            buttonText={'CALL RESTAURANT'}
            style={styles.button}
            leftIcon={icons.phoneWhiteIcon}
            onPress={() => onRestaurantCall()}
          />
          <Button
            buttonText={'RESTAURANT WEBSITE'}
            style={styles.button}
            leftIcon={icons.websiteIconWhite}
            onPress={() => onRestaurantWeb()}
          />
          {/* {isBlurred &&
            <Button
              buttonText={'AVAIL COUPON'}
              style={styles.button}
              onPress={toggleBlur}
            />
          } */}
          <RedirectingModal visible={redirect} setVisible={setRedirect} />
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default DiscountCodeModal;

const styles = StyleSheet.create({
  button: {
    marginVertical: hp(1),
  },
  disText: {
    color: themes.light_black2,
    fontSize: wp(5),
  },
  codeLetter: {
    fontFamily: fonts.markRegular,
    fontSize: wp(5),
    color: themes.white,
  },
  codeLetterView: {
    backgroundColor: themes.navy_blue,
    padding: 15,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: hp(1),
  },
  modalText: {
    textAlign: 'center',
    fontSize: wp(6.5),
    color: themes.light_black1,
    fontFamily: fonts.markRegular,
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
    padding: hp(2.5),
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
    width: wp(90),
  },
  crossStyle: {
    height: hp(3.4),
    width: hp(3.4),
  },
  blurredText: {
    height: 1,
    color: themes.white,
    shadowOpacity: 1,
    shadowColor: 'red',
    shadowOffset: {width: 10, height: 10},
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});
