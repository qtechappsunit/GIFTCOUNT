import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Wrapper from '../../components/Wrapper';
import Swiper from 'react-native-swiper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ROUTES from '../../utils';
import themes from '../../assets/themes';
import SVGIcons from '../../components/SVGIcons';
import icons from '../../assets/icons';
import images from '../../assets/images';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import fonts from '../../assets/fonts';
import { useSelector } from 'react-redux';
import DiscountCodeModal from '../../components/DiscountCodeModal';
import DropDownPicker from 'react-native-dropdown-picker';
import CouponStatusModal from '../../components/CouponStatusModal';
import { RootState } from '../../Store/Reducer';
import { useCouponStatusMutation, useGetCouponDetailsQuery } from '../../Store/services';
import Loader from '../../components/Loader';

const RestaurantDetail = ({ route }) => {
  const { user } = useSelector((state: RootState) => state?.authReducer);
  const nav = useNavigation();
  const [visible, setVisible] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalValue, setModalValue] = useState('')
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Edit', value: 'Edit' },
    { label: 'Delete', value: 'Delete' },
  ]);

  const coupon_id = route?.params?.id

  const [couponStatus, { isLoading: statusLoading }] = useCouponStatusMutation()
  const { data, isLoading } = useGetCouponDetailsQuery(coupon_id)

  // console.log('set value state',value)
  // console.log('coupon details =====>', data?.data)

  const renderImages = (restaurant_image) => {
    return (
      <View style={styles.swiperWrapper}>
        <TouchableOpacity onPress={() => nav.goBack()} style={styles.backArrow}>
          <SVGIcons
            image={icons.arrowNext}
            style={{ transform: [{ rotate: '180deg' }] }}
          />
        </TouchableOpacity>
        <Swiper
          activeDotStyle={styles.activeStyle}
          dotColor={themes.secondary}
          dotStyle={styles.inactiveStyle}>
          {/* {multipleImages.map((item, ind) => ( */}
          <Image
            source={restaurant_image ? {uri: restaurant_image} : images.dummy}
            style={styles.imageStyle}
            borderBottomLeftRadius={30}
            borderBottomRightRadius={30}
          />
          {/* ))} */}
        </Swiper>
      </View>
    );
  };

  const renderContent = (details) => {
    return (
      <View style={styles.contentWrapper}>
        {/* <View style={styles.textWrapper}>
          <SVGIcons image={icons.star} />
          <Text style={styles.ratingText}>{'5.7'}</Text>
          <Text style={styles.validityText}>Validity</Text>
          <Text style={styles.dateText}>{'24-04-2024'}</Text>
        </View> */}
        <Text style={styles.name}>{details?.coupon_name || ''}</Text>
        <Text style={styles.descStyle}>{details?.description || ''}</Text>
        <View style={styles.row}>
          <Text style={styles.subHead}>Min order value</Text>
          <Text style={styles.subVal}>${details?.min_order_value || ''}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.subHead}>Validity</Text>
          <Text style={styles.subVal}>{details?.date_validation != '0000-00-00' ? details?.date_validation : details?.week_validation != '[]' ? JSON.parse(details?.week_validation).join(',') : details?.time_validation || '0000-00-00'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.subHead}>Code Validation</Text>
          <Text style={styles.subVal}>{details?.no_of_coupons || ''}</Text>
        </View>
      </View>
    );
  };

  const renderDiscountCard = (coupon_image,discount,id) => {
    return (
      <>
        <View style={styles.wrapper}>
          <Image source={coupon_image  ? {uri: coupon_image} : images.dummy} style={styles.foodStyle} />
          <View style={styles.discountView}>
            {user?.type == 'rider' ? (
              <>
                <TouchableOpacity
                  style={[styles.btn, { marginBottom: hp(2) }]}
                  onPress={() => nav.navigate(ROUTES.QRCode,{driver_id: user?.id, coupon_id: id})}>
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
                <Text style={styles.percentage}>{discount}%</Text>
                <Text style={styles.discountText}>Discount</Text>
              </>
            )}
          </View>
        </View>
        {user?.type == 'customer' ? (
          <Button
            buttonText={'Get Discount Code'}
            style={styles.button}
            onPress={() => setVisible(!visible)}
          />
        ) : null}
        <View style={{ height: hp(2) }} />
        <DiscountCodeModal
          modalVisible={visible}
          setModalVisible={setVisible}
        />
      </>
    );
  };

  // const renderLoader = () => {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <Loader size={'large'} color={themes.primary} />
  //     </View>
  //   )
  // }

  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* {isLoading ?
          renderLoader()
          : */}
          <>
            {renderImages(data?.data?.user?.profile_pic)}
            {renderContent(data?.data)}
            {renderDiscountCard(data?.data?.coupon_image, data?.data?.discount,data?.data?.id)}
            {user?.type == 'owner' ? (
              <>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={val => {
                    if (modalValue === 'yes') {
                      setValue(val);
                    } else {
                      setValue(val);
                    }
                    setOpen(!open);
                  }}
                  setItems={setItems}
                  placeholder={'Status'}
                  style={styles.dropView}
                  textStyle={styles.dropText}
                  onSelectItem={() => setConfirmationModal(!confirmationModal)}
                  dropDownContainerStyle={styles.dropdownStyle}
                  showArrowIcon={true}
                  showTickIcon={false}
                />
                <CouponStatusModal
                  visible={confirmationModal}
                  setVisible={setConfirmationModal}
                  onStatusChange={(value: string) => {
                    setModalValue(value);
                    setConfirmationModal(false);
                  }}
                />
                {/* /> */}
              </>
            ) : null}
          </>
        {/* } */}
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
