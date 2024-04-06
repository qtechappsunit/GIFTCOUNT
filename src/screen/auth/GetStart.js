import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import ROUTES, {setUserType, typeImages} from '../../utils';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import AuthContainer from '../../components/AuthContainer';

const GetStart = () => {
  const navigation = useNavigation();

  const onTypeSet = type => {
    setUserType('role', type);
    navigation.navigate(ROUTES.Login);
  };

  return (
    <AuthContainer logoImageStyle={{marginVertical: hp('1%')}}>
      {typeImages.map((item, index) => (
        <TouchableOpacity
          activeOpacity={0.9}
          key={index}
          onPress={() => onTypeSet(item.type)}>
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
    height: hp(25),
    width: wp(80),
    resizeMode: 'contain',
    marginBottom: hp('5%'),
  },
});
