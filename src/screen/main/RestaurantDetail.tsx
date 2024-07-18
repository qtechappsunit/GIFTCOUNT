import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Wrapper from '../../components/Wrapper';
import Swiper from 'react-native-swiper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ROUTES, {multipleImages} from '../../utils';
import themes from '../../assets/themes';
import SVGIcons from '../../components/SVGIcons';
import icons from '../../assets/icons';
import images from '../../assets/images';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import fonts from '../../assets/fonts';
import {useSelector} from 'react-redux';
import DiscountCodeModal from '../../components/DiscountCodeModal';
import DropDownPicker from 'react-native-dropdown-picker';
import CouponStatusModal from '../../components/CouponStatusModal';

const RestaurantDetail = () => {
  const {userType} = useSelector(state => state?.authReducer);
  const nav = useNavigation();
  const [visible, setVisible] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
    {label: 'Delete', value: 'Delete'},
    {label: 'Edit', value: 'Edit'},
  ]);

  const renderImages = () => {
    return (
      <View style={styles.swiperWrapper}>
        <TouchableOpacity onPress={() => nav.goBack()} style={styles.backArrow}>
          <SVGIcons
            image={icons.arrowNext}
            style={{transform: [{rotate: '180deg'}]}}
          />
        </TouchableOpacity>
        <Swiper
          activeDotStyle={styles.activeStyle}
          dotColor={themes.secondary}
          dotStyle={styles.inactiveStyle}>
          {multipleImages.map((item, ind) => (
            <Image
              key={ind}
              source={item.image}
              style={styles.imageStyle}
              borderBottomLeftRadius={30}
              borderBottomRightRadius={30}
            />
          ))}
        </Swiper>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View style={styles.contentWrapper}>
        {/* <View style={styles.textWrapper}>
          <SVGIcons image={icons.star} />
          <Text style={styles.ratingText}>{'5.7'}</Text>
          <Text style={styles.validityText}>Validity</Text>
          <Text style={styles.dateText}>{'24-04-2024'}</Text>
        </View> */}
        <Text style={styles.name}>Burger Den - Coupon 1</Text>
        <Text style={styles.descStyle}>
          Garden Restaurant is the perfect spot for an evening out. The historic
          white-columned Merritt House, restored and renovated to its gleaming
          splendor, is home to Galley and Garden.
        </Text>
        <View style={styles.row}>
          <Text style={styles.subHead}>Min order value</Text>
          <Text style={styles.subVal}>$20</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.subHead}>Validity</Text>
          <Text style={styles.subVal}>24-04-2024</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.subHead}>Code Validation</Text>
          <Text style={styles.subVal}>1</Text>
        </View>
      </View>
    );
  };

  const renderDiscountCard = () => {
    return (
      <>
        <View style={styles.wrapper}>
          <Image source={images.burger} style={styles.foodStyle} />
          <View style={styles.discountView}>
            {userType == 'rider' ? (
              <>
                <TouchableOpacity
                  style={[styles.btn, {marginBottom: hp(2)}]}
                  onPress={() => nav.navigate(ROUTES.QRCode)}>
                  <Text style={styles.btnText}>Get QR code</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => alert('Link copied')}>
                  <Text style={styles.btnText}>Copy Link</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.discountText}>Flat</Text>
                <Text style={styles.percentage}>50%</Text>
                <Text style={styles.discountText}>Discount</Text>
              </>
            )}
          </View>
        </View>
        {userType == 'customer' ? (
          <Button
            buttonText={'Get Discount Code'}
            style={styles.button}
            onPress={() => setVisible(!visible)}
          />
        ) : null}
        <View style={{height: hp(2)}} />
        <DiscountCodeModal
          modalVisible={visible}
          setModalVisible={setVisible}
        />
      </>
    );
  };

  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderImages()}
        {renderContent()}
        {renderDiscountCard()}
        {userType == 'owner' ? (
          <>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setConfirmationModal}
              setValue={val => {
                setValue(val);
                setOpen(false);
              }}
              setItems={setItems}
              placeholder={'Active'}
              style={styles.dropView}
              textStyle={styles.dropText}
              dropDownContainerStyle={styles.dropdownStyle}
              showArrowIcon={true}
              showTickIcon={false}
            />
            <CouponStatusModal
              visible={confirmationModal}
              setVisible={setConfirmationModal}
              onStatusChange={value => {
                if (value === 'yes') {
                  setOpen(true);
                }
                setConfirmationModal(!confirmationModal);
              }}
            />
          </>
        ) : null}
      </ScrollView>
    </Wrapper>
  );
};

export default RestaurantDetail;

const styles = StyleSheet.create({
  dropdownStyle: {
    width: wp(70),
    alignSelf: 'center',
    backgroundColor: themes.navy_blue,
    borderWidth: 2,
    borderColor: themes.green1,
  },
  dropText: {
    color: themes.white,
    textAlign: 'center',
  },
  dropView: {
    width: wp(70),
    backgroundColor: themes.navy_blue,
    alignSelf: 'center',
    borderRadius: 50,
    marginBottom: hp(3),
    borderColor: themes.green1,
    borderWidth: 2,
  },
  btnText: {
    color: themes.white,
    fontFamily: fonts.lexendExtraBold,
  },
  btn: {
    backgroundColor: themes.red1,
    paddingVertical: hp(2),
    paddingHorizontal: hp(3.5),
    width: '90%',
    alignItems: 'center',
    borderRadius: 50,
  },
  subVal: {
    fontFamily: fonts.lexendBold,
    color: themes.primary,
  },
  subHead: {
    width: wp(40),
    fontFamily: fonts.lexendBold,
    color: themes.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  backArrow: {
    padding: 10,
    aspectRatio: 1,
    backgroundColor: themes.white,
    position: 'absolute',
    top: 15,
    zIndex: 10,
    borderRadius: 50,
    left: 15,
  },
  swiperWrapper: {
    height: Platform.OS === 'ios' ? hp('37%') : hp('45%'),
  },
  imageStyle: {
    width: '100%',
    resizeMode: 'cover',
    height: hp(45),
  },
  activeStyle: {
    borderColor: themes.white,
    backgroundColor: 'transparent',
    padding: hp('1%'),
    borderRadius: 100,
    borderWidth: 2,
  },
  inactiveStyle: {
    height: hp('1.5%'),
    width: hp('1.5%'),
    borderRadius: 100,
    backgroundColor: themes.white,
  },
  contentWrapper: {
    paddingTop: hp('2%'),
    padding: hp('2.5%'),
  },
  textWrapper: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingTop: hp('1%'),
  },
  ratingText: {
    color: themes.primary,
    marginRight: hp('0.7%'),
    fontWeight: 'bold',
  },
  validityText: {
    color: themes.red,
    fontWeight: 'bold',
  },
  dateText: {
    color: themes.primary,
    fontSize: hp('1.8%'),
  },
  name: {
    marginTop: hp('2%'),
    color: themes.white,
    fontSize: hp(2.8),
    fontFamily: fonts.lexendBold,
  },
  descStyle: {
    color: themes.primary,
    fontSize: hp(2),
    marginTop: hp(2),
    fontFamily: fonts.lexendBold,
  },
  wrapper: {
    paddingTop: hp('1%'),
    flexDirection: 'row',
  },
  foodStyle: {
    height: hp(30),
    width: '55%',
  },
  discountView: {
    padding: hp('1%'),
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.primary,
  },
  discountText: {
    color: themes.black,
    fontSize: hp('2.5%'),
    fontFamily: fonts.markRegular,
  },
  percentage: {
    fontFamily: fonts.markRegular,
    fontSize: hp('7%'),
    color: themes.black,
    fontWeight: 'bold',
  },
  button: {
    alignSelf: 'center',
    marginTop: hp('4%'),
  },
});
