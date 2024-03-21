import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AuthContainer from '../../components/AuthContainer';
import {typeImages} from '../../utils';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const GetStart = () => {
  const navigation = useNavigation();

  return (
    <AuthContainer logoImageStyle={{marginVertical: hp('1%')}}>
      {typeImages.map(item => (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Login')}>
          <Image source={item.image} style={styles.imageStyle} />
        </TouchableOpacity>
      ))}
    </AuthContainer>
  );
};

export default GetStart;

const styles = StyleSheet.create({
  imageStyle: {
    alignSelf: 'center',
    height: hp('22%'),
    width: hp('36.5%'),
    marginBottom: hp('3%'),
  },
});
