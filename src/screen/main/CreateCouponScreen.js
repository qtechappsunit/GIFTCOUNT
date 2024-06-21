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
import images from '../../assets/images';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import DateModal from '../../components/DateModal';
import moment from 'moment';

const data = [
  {
    id: 1,
    title: 'Mon',
  },
  {
    id: 2,
    title: 'Tue',
  },
  {
    id: 3,
    title: 'Wed',
  },
  {
    id: 4,
    title: 'Thu',
  },
  {
    id: 5,
    title: 'Fri',
  },
  {
    id: 6,
    title: 'Sat',
  },
  {
    id: 7,
    title: 'Sun',
  },
];

const cruisineData = [
  {
    id: 1,
    title: 'Bar B Que',
  },
  {
    id: 2,
    title: 'Chinese',
  },
  {
    id: 3,
    title: 'Thai',
  },
  {
    id: 4,
    title: 'Asian',
  },
  {
    id: 5,
    title: 'Mexican',
  },
  {
    id: 6,
    title: 'Italian',
  },
  {
    id: 7,
    title: 'Sea Food',
  },
];

const CreateCouponScreen = () => {
  const [state, setState] = useState({
    coupon_name: '',
    discount: '',
    minimum_value: '',
    code_val: '',
    date: 'Select Date',
    hours: '',
    desc: '',
    isPickerVisible: false,
  });
  const nav = useNavigation();

  const onChangeText = (value, text) => {
    setState({
      ...state,
      [value]: text,
    });
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
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
        fontSize: wp(3.5),
      }}
      style={{marginVertical: wp(2), width: wp(25)}}
      disableText={false}
    />
  );

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
            setValue={text => onChangeText('coupon_name', text)}
            width={wp(50)}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.couponText}>Discount</Text>
          <CustomInput
            value={state.discount}
            setValue={text => onChangeText('discount', text)}
            width={wp(50)}
            leftText={'%'}
            keyboardType={'numeric'}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.couponText}>Minimum{`\n`}Order Value</Text>
          <CustomInput
            value={state.minimum_value}
            setValue={text => onChangeText('minimum_value', text)}
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
            value={state.code_val}
            setValue={text => onChangeText('code_val', text)}
            width={wp(35)}
            keyboardType={'numeric'}
          />
        </View>
        <View style={styles.whiteLine} />
        <Text style={styles.couponText}>Date Validation</Text>
        <View style={styles.inputView}>
          <View style={styles.inputView}>
            <View style={styles.round} />
            <Text style={styles.subText}>Till valid date</Text>
          </View>
          {/* <CustomInput
            value={state.date}
            setValue={text => onChangeText('date', text)}
            width={wp(35)}
            keyboardType={'numeric'}
          /> */}
          <DateModal
            onConfirm={(date) => {
              setState({
                ...state,
                date: moment(date).format('MM/DD/YYYY')
              })
            }}
            mode={"date"}
            text={state.date}
          />
        </View>
        <View style={[styles.inputView, {justifyContent: 'flex-start'}]}>
          <View style={styles.round} />
          <Text style={styles.subText}>Weekdays validation</Text>
        </View>
        <FlatList
          data={data}
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
            setValue={text => onChangeText('hours', text)}
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
          setValue={text => onChangeText('desc', text)}
          width={wp(90)}
          placeholder={'write item description'}
          placeholderTextColor={themes.placeholder_color}
          multiline={true}
          numberOfLines={2}
          borderRadius={10}
        />
        <View style={styles.whiteLine} />
        <Text style={[styles.couponText, {marginBottom: hp(2)}]}>
          Select Cruisine
        </Text>
        <FlatList
          data={cruisineData}
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
        <Text style={[styles.couponText, {marginBottom: hp(2)}]}>
          Add Image
        </Text>
        <TouchableOpacity style={styles.uploadImageView}>
          <SvgXml xml={icons.uploadIcon} />
          <Text style={styles.createText}>Add Image (325 X 125)</Text>
        </TouchableOpacity>
        <View style={styles.inputView}>
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
        </View>
        <Button
          buttonText={'Generate'}
          onPress={() => nav.goBack()}
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
    padding: 20,
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

});
