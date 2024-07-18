import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import ROUTES, { typeImages } from '../../utils';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import AuthContainer from '../../components/AuthContainer';
import { useDispatch } from 'react-redux';
import { UserType } from '../../Store/Reducer/AuthReducer';

const GetStart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onTypeSet = type => {
    dispatch(UserType(type))
    navigation.navigate(ROUTES.Login);
  };

  return (
    <AuthContainer logoImageStyle={{ marginVertical: hp('1%') }}>
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
    height: hp(20),
    width: wp(80),
    resizeMode: 'contain',
    marginBottom: hp(1),
  },
});
