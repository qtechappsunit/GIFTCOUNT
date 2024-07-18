import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import images from '../assets/images';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import themes from '../assets/themes';

const OptionsMenu = ({data, onSelect}) => {
  return (
    <>
      <Menu>
        <MenuTrigger>
          <Image source={images.moreOptions} style={styles.moreIconStyle} />
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={styles.container}
          customStyles={{
            optionsContainer: {
              marginHorizontal: hp(-4),
              width: '45%',
              backgroundColor: 'rgba(255,255,255,10)',
              paddingVertical: hp(1),
            },
            optionsWrapper: {
              alignItems: 'center',
            },
          }}>
          {data.map((item, ind) => (
            <MenuOption
              style={styles.innerContainer}
              key={ind}
              onSelect={() => onSelect(ind)}
              text={item.text}
              customStyles={{
                optionText: {
                  fontSize: hp(2),
                  color: themes.light_black1,
                  fontWeight: 'bold',
                  marginVertical: hp(0.2),
                },
              }}
            />
          ))}
        </MenuOptions>
      </Menu>
    </>
  );
};

export default OptionsMenu;

const styles = StyleSheet.create({
  moreIconStyle: {
    height: hp(4),
    width: hp(4),
    tintColor: themes.heading,
    marginRight: hp(1),
  },
  container: {
    borderRadius: 15,
    marginTop: hp(6),
  },
  innerContainer: {
    alignItems: 'center',
    borderRadius: 15,
  },
});
