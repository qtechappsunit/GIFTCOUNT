import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Wrapper from '../../components/Wrapper';
import Header from '../../components/Header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import themes from '../../assets/themes';
import fonts from '../../assets/fonts';
import CustomInput from '../../components/CustomInput';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {SvgXml} from 'react-native-svg';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import DateModal from '../../components/DateModal';
import moment from 'moment';
import {launchImageLibrary} from 'react-native-image-picker';
import {Weekdays} from '../../utils';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';

const CreateCouponScreen = ({route}) => {
  const [state, setState] = useState({
    coupon_name: '',
    discount: '',
    minimum_value: '',
    code_usage: '',
    date: 'Select Date',
    hours: '',
    desc: '',
    // isPickerVisible: false,
    coupon_image: '',
    time_val: false,
    date_val: false,
    week_val: false,
    week_days: [],
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {
      label: 'Bar B Que',
      value: 1,
    },
    {
      label: 'Fast Food',
      value: 2,
    },
    {
      label: 'Pizza',
      value: 3,
    },
    {
      label: 'Japanese',
      value: 4,
    },
    {
      label: 'Chinese',
      value: 5,
    },
  ]);
  const nav = useNavigation();

  const {user} = useSelector(state => state.authReducer);

  const onChange = (value: string, text: string) => {
    setState({
      ...state,
      [value]: text,
    });
  };

  const renderItem = ({item}) => (
    <BouncyCheckbox
      size={25}
      fillColor={themes.red1}
      unFillColor={themes.navy_blue}
      text={item?.title}
      iconStyle={{borderColor: themes?.red1}}
      textStyle={{
        fontFamily: fonts.regular,
        color: themes?.white,
        textDecorationLine: 'none',
        fontSize: wp(3.5),
      }}
      style={{marginVertical: wp(2), width: wp(25)}}
      disableText={false}
    />
  );

  const renderPickerItems = () => (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={val => setValue(val)}
      setItems={setItems}
      placeholder={'Select Cuisines'}
      style={styles.dropView}
      textStyle={styles.dropText}
      dropDownContainerStyle={styles.dropdownStyle}
    />
  );

  const onSelectImage = async () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        quality: 0.5,
      },
    };

    await launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('cancelled', response.didCancel);
      } else {
        setState({
          ...state,
          coupon_image: response.assets[0].uri,
        });
      }
    });
  };

  const onGenerateCoupon = async () => {
    nav.goBack();
  };

  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Header />
        <Text style={styles.createText}>Create{`\n`}Discount Coupon</Text>
        <View style={styles.line} />
        <View style={styles.inputView}>
          <Text style={styles.couponText}>Coupon{`\n`}Name</Text>
          <CustomInput
            value={state.coupon_name}
            setValue={text => onChange('coupon_name', text)}
            width={wp(50)}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.couponText}>Discount</Text>
          <CustomInput
            value={state.discount}
            setValue={text => onChange('discount', text)}
            width={wp(50)}
            leftText={'%'}
            keyboardType={'numeric'}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.couponText}>Minimum{`\n`}Order Value</Text>
          <CustomInput
            value={state.minimum_value}
            setValue={text => onChange('minimum_value', text)}
            width={wp(50)}
            rightText={'$'}
            keyboardType={'numeric'}
          />
        </View>
        <View style={styles.whiteLine} />
        <Text style={styles.couponText}>Code Validation</Text>
        <View style={styles.inputView}>
          <View style={styles.inputView}>
            <View style={styles.round} />
            <Text style={styles.subText}>Number of{`\n`}coupon usage</Text>
          </View>
          <CustomInput
            value={state.code_usage}
            setValue={text => onChange('code_usage', text)}
            width={wp(35)}
            keyboardType={'numeric'}
          />
        </View>
        <View style={styles.whiteLine} />
        <Text style={styles.couponText}>Date Validation</Text>
        <View style={styles.inputView}>
          <View style={styles.inputView}>
            {/* <View style={styles.round} /> */}
            <BouncyCheckbox
              size={25}
              fillColor={themes.navy_blue}
              iconStyle={styles.round}
              isChecked={state.date_val}
              onPress={isChecked => onChange('date_val', isChecked)}
              disableText={true}
            />
            <Text style={styles.subText}>Till valid date</Text>
          </View>
          <DateModal
            onConfirm={date => {
              setState({
                ...state,
                date: moment(date).format('YYYY-MM-DD'),
              });
            }}
            mode={'date'}
            text={state.date}
          />
        </View>
        <View style={[styles.inputView, {justifyContent: 'flex-start'}]}>
          {/* <View style={styles.round} /> */}
          <BouncyCheckbox
            size={25}
            fillColor={themes.navy_blue}
            iconStyle={styles.round}
            isChecked={state.week_val}
            onPress={isChecked => onChange('week_val', isChecked)}
            disableText={true}
          />
          <Text style={styles.subText}>Weekdays validation</Text>
        </View>
        <FlatList
          data={Weekdays}
          keyExtractor={item => item?.id}
          renderItem={renderItem}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          style={{
            marginVertical: wp(3),
          }}
        />
        <View style={styles.row}>
          <View style={styles.verticalLine} />
          <View style={{width: wp(65)}}>
            <BouncyCheckbox
              size={25}
              fillColor={themes.primary}
              unFillColor={themes.navy_blue}
              isChecked={state.time_val}
              text={'Time Validation'}
              iconStyle={{borderColor: themes?.red1}}
              textStyle={{
                fontFamily: fonts.lexendSemiBold,
                color: themes?.white,
                fontSize: wp(3.5),
                textDecorationLine: 'none',
              }}
              style={{marginVertical: 0}}
              disableText={false}
            />
          </View>
        </View>
        <View style={styles.hourRow}>
          <Text style={styles.hourText}>Hours</Text>
          <CustomInput
            value={state.hours}
            setValue={text => onChange('hours', text)}
            width={wp(40)}
            placeholderTextColor={themes.placeholder_color}
            keyboardType={'numeric'}
            placeholder={'(22:00 - 23:59)'}
          />
        </View>
        <View style={styles.whiteLine} />
        <Text style={[styles.couponText, {marginBottom: hp(2)}]}>
          Description
        </Text>
        <CustomInput
          value={state.desc}
          setValue={text => onChange('desc', text)}
          width={wp(90)}
          placeholder={'write item description'}
          placeholderTextColor={themes.placeholder_color}
          multiline={true}
          numberOfLines={2}
          borderRadius={10}
        />
        <View style={styles.whiteLine} />
        <Text style={[styles.couponText, {marginBottom: hp(2)}]}>
          Select Cuisine
        </Text>
        {renderPickerItems()}
        {/* <FlatList
          data={data?.data}
          keyExtractor={item => item?.id}
          renderItem={renderPickerItems}
          numColumns={3}
          ListEmptyComponent={listEmptyComponent}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          style={{
            marginVertical: wp(3),
          }}
        /> */}
        <Text style={[styles.couponText, {marginBottom: hp(2)}]}>
          Add Image
        </Text>
        <TouchableOpacity
          style={[styles.uploadImageView, {padding: !state.coupon_image && 20}]}
          onPress={() => onSelectImage()}>
          {state.coupon_image ? (
            <Image
              source={{uri: state.coupon_image}}
              style={styles.couponImageStyle}
            />
          ) : (
            <>
              <SvgXml xml={icons.uploadIcon} />
              <Text style={styles.createText}>Add Image (325 X 125)</Text>
            </>
          )}
        </TouchableOpacity>
        {/* <View style={styles.inputView}>
          <View style={styles.miniImageView}>
            <Image source={images.restaurant3} style={styles.mini} />
            <SvgXml xml={icons.deleteIcon} style={styles.deleteIcon} />
          </View>
          <View style={styles.miniImageView}>
            <Image source={images.burger} style={styles.mini} />
            <SvgXml xml={icons.deleteIcon} style={styles.deleteIcon} />
          </View>
          <View style={styles.miniImageView}>
            <Image source={images.restaurant3} style={styles.mini} />
            <SvgXml xml={icons.deleteIcon} style={styles.deleteIcon} />
          </View>
          <View style={styles.miniImageView}>
            <Image source={images.burger} style={styles.mini} />
            <SvgXml xml={icons.deleteIcon} style={styles.deleteIcon} />
          </View>
        </View> */}
        <Button
          buttonText={'Generate'}
          onPress={() => onGenerateCoupon()}
          style={styles.btn}
        />
      </ScrollView>
    </Wrapper>
  );
};

export default CreateCouponScreen;

const styles = StyleSheet.create({
  miniImageView: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: themes.red1,
    overflow: 'hidden',
    width: wp(18),
    height: wp(18),
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  btn: {
    alignSelf: 'center',
    marginVertical: hp(4),
  },
  mini: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  uploadImageView: {
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: themes.red1,
  },
  hourText: {
    color: themes.primary,
  },
  hourRow: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    width: wp(70),
    alignItems: 'center',
    marginTop: hp(2),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  verticalLine: {
    height: wp(15),
    width: wp(20),
    borderLeftWidth: 1,
    borderLeftColor: themes.white,
    borderBottomWidth: 1,
    borderBottomColor: themes.white,
    marginRight: wp(2),
  },
  subText: {
    color: themes.white,
    fontFamily: fonts.lexendSemiBold,
    fontSize: wp(4),
  },
  round: {
    width: wp(10),
    height: wp(10),
    borderRadius: 100,
    backgroundColor: themes.navy_blue,
    marginRight: wp(4),
  },
  whiteLine: {
    borderBottomColor: themes.white,
    borderBottomWidth: 1,
    alignSelf: 'center',
    width: wp(60),
    marginVertical: hp(3),
  },
  couponText: {
    color: themes.primary,
    fontSize: wp(6),
    fontFamily: fonts.lexendSemiBold,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: wp(3),
  },
  line: {
    borderBottomWidth: wp(2),
    width: wp(55),
    borderBottomColor: themes.red1,
    marginVertical: hp(1),
  },
  createText: {
    color: themes.white,
    fontSize: wp(6.5),
    fontFamily: fonts.lexendBold,
  },
  container: {
    width: wp(100),
    paddingHorizontal: wp(3),
  },
  couponImageStyle: {
    height: hp(15),
    resizeMode: 'cover',
    aspectRatio: 3,
  },
  dropdownStyle: {
    width: wp(90),
    alignSelf: 'center',
    backgroundColor: themes.navy_blue,
    borderWidth: 2,
    borderColor: themes.red,
  },
  dropText: {
    color: themes.white,
    textAlign: 'center',
  },
  dropView: {
    width: wp(90),
    backgroundColor: themes.navy_blue,
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: hp(1),
    marginBottom: hp(3),
    borderColor: themes.red,
    borderWidth: 2,
  },
});
