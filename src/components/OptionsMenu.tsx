import { StyleSheet } from 'react-native';
import React from 'react';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import themes from '../assets/themes';
import icons from '../assets/icons';
import SVGIcons from './SVGIcons';

const OptionsMenu = ({ data, onSelect }) => {
  return (
    <>
      <Menu>
        <MenuTrigger>
          <SVGIcons
            image={icons.Menu}
            style={{ transform: [{ rotate: '180deg' }] }}
          />
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
              text={item.option}
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
