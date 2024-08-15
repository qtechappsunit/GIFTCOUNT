import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/Wrapper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ROUTES, { couponOptions, ShowMessage } from '../../utils';
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
import { useCouponStatusMutation, useGetCouponDetailsQuery, useLazyDeleteDiscountCouponQuery } from '../../Store/services';
import Loader from '../../components/Loader';
import SpinnerLoader from '../../components/SpinnerLoader';
import OptionsMenu from '../../components/OptionsMenu';
import Clipboard from '@react-native-clipboard/clipboard';
import ConfirmationModal from '../../components/ConfirmationModal';

const RestaurantDetail = ({ route }) => {
  const { user } = useSelector((state: RootState) => state?.authReducer);
  const nav = useNavigation();
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [pendingValue, setPendingValue] = useState('')
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Active', value: 1 },
    { label: 'Inactive', value: 0 },
  ]);

  const coupon_id = route?.params?.id

  const [couponStatus, { isLoading: statusLoading }] = useCouponStatusMutation()
  const [deleteDiscountCoupon, { isLoading: deleteLoader }] = useLazyDeleteDiscountCouponQuery()
  const { data, isLoading } = useGetCouponDetailsQuery(coupon_id, {
    refetchOnMountOrArgChange: true,
  })
  // const { refetch: ownerCouponsRefetch } = useLazyGetOwnerCouponsQuery()

  // console.log('set value state', data?.data?.status)
  useEffect(() => {
    if (data) {
      setValue(data?.data?.status)
    }

  }, [data])
  // console.log('coupon details =====>', data?.data)

  const onSelectOptions = (index) => {
    if (index == 0) {
      nav.navigate(ROUTES.CreateCouponScreen, { couponData: data?.data })
    } else {
      setModal(!modal)
    }
  }

  const renderImages = (restaurant_image) => {
    return (
      <View style={styles.swiperWrapper}>
        <TouchableOpacity onPress={() => nav.goBack()} style={styles.backArrow}>
          <SVGIcons
            image={icons.arrowNext}
            style={{ transform: [{ rotate: '180deg' }] }}
          />
        </TouchableOpacity>
        {user?.type === 'owner' &&
          <View style={styles.OptionStyle}>
            <OptionsMenu data={couponOptions} onSelect={(index) => onSelectOptions(index)} />
          </View>
        }
        {/* <Swiper
          activeDotStyle={styles.activeStyle}
          dotColor={themes.secondary}
          dotStyle={styles.inactiveStyle}> */}
        {/* {multipleImages.map((item, ind) => ( */}
        <Image
          source={restaurant_image ? { uri: restaurant_image } : images.dummy}
          style={styles.imageStyle}
          borderBottomLeftRadius={30}
          borderBottomRightRadius={30}
        />
        {/* ))} */}
        {/* </Swiper> */}

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
        <Text style={styles.name}>{details?.user?.restaurant_name + ' - ' + details?.coupon_name || ''}</Text>
        <Text style={styles.descStyle}>{details?.description || ''}</Text>
        <View style={styles.row}>
          <Text style={styles.subHead}>Min order value</Text>
          <Text style={styles.subVal}>${details?.min_order_value || ''}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.subHead}>Validity</Text>
          <Text style={styles.subVal}>{details?.date_validation != '0000-00-00' ? details?.date_validation : details?.week_validation != '[]' ? JSON.parse(details?.week_validation).join(',') : '0000-00-00'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.subHead}>Code Validation</Text>
          <Text style={styles.subVal}>{details?.no_of_coupons || ''}</Text>
        </View>
        {details?.time_validation &&
          <View style={styles.row}>
            <Text style={styles.subHead}>Hours</Text>
            <Text style={styles.subVal}>({details?.time_validation})</Text>
          </View>
        }
      </View>
    );
  };

  const onCopyLink = async () => {
    const template = `to avail the discount coupons${'\n'} download the GiftCount App${'\n'} with this link;`
    Clipboard.setString(template)
    return ShowMessage('Copy Text', 'Link has been copied', 'success')

  }

  const renderDiscountCard = (coupon_image, discount, id) => {
    return (
      <>
        <View style={styles.wrapper}>
          <Image source={coupon_image ? { uri: coupon_image } : images.dummy} style={styles.foodStyle} />
          <View style={styles.discountView}>
            {user?.type == 'driver' ? (
              <>
                <TouchableOpacity
                  style={[styles.btn, { marginBottom: hp(2) }]}
                  onPress={() => nav.navigate(ROUTES.QRCode, { driver_id: user?.id, coupon_id: id })}>
                  <Text style={styles.btnText}>Get QR code</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => onCopyLink()}>
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

  const renderLoader = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Loader size={'large'} color={themes.primary} />
      </View>
    )
  }

  const handleConfirmStatusChange = async (confirmValue) => {
    if (confirmValue === 'yes') {
      var status = new FormData()
      status.append('status', pendingValue)
      // return console.log('dataa',data)
      await couponStatus({ status, coupon_id }).unwrap().then((res) => {
        console.log('response', res)
        if (res.data.status) {
          setValue(res.data.status)
          return ShowMessage('Coupon Status', 'Coupon Status Changed Successfully', 'success')
        } else {
          return ShowMessage('Coupon Status', 'Failed To Change The Coupon Status', 'warning')
        }
      }).catch((error) => {
        console.log('error changing the status ====>', error)
        return ShowMessage('Coupon Status', 'Some problem occured', 'danger')
      })
    }
    setConfirmationModal(!confirmationModal)
  }

  const onDeleteCoupon = async () => {
    await deleteDiscountCoupon(coupon_id).unwrap().then((res) => {
      if (res.success) {
        // ownerCouponsRefetch()
        nav.goBack()
        return ShowMessage('Delete Discount Coupon', res.message, 'success')
      } else {
        return ShowMessage('Delete Discount Coupon', res.message, 'warning')
      }
    }).catch((error) => {
      console.log('delete discount coupon error', error)
      return ShowMessage('Delete Discount Coupon', 'Some problem occured', 'danger')
    })
    setModal(!modal)
  }

  return (
    <Wrapper>
      {isLoading ?
        renderLoader()
        :
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderImages(data?.data?.user?.profile_pic)}
            {renderContent(data?.data)}
            {renderDiscountCard(data?.data?.coupon_image, data?.data?.discount, data?.data?.id)}
            {user?.type == 'owner' ? (
              <>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={val => {
                    setPendingValue(val)
                    setOpen(!open)
                  }}
                  setItems={setItems}
                  placeholder={value === '1' ? 'Active' : value === '0' ? 'Inactive' : 'Change Status'}
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
                  onStatusChange={handleConfirmStatusChange}
                />
                <ConfirmationModal visible={modal}
                  modalText={'Are you sure you want to delete your coupon ?'}
                  onPressOut={() => setModal(!modal)}
                  onCancel={() => setModal(!modal)}
                  onConfirm={() => onDeleteCoupon()}
                />
                <SpinnerLoader visible={deleteLoader ? deleteLoader : statusLoading} />
                {/* /> */}
              </>
            ) : null}
          </ScrollView>
        </>
      }
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
    borderRadius: 30,
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
    paddingTop: Platform.OS === 'ios' ? hp('12%') : hp('4%'),
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
    // marginTop: hp('4%'),
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
  OptionStyle: {
    position: 'absolute',
    backgroundColor: themes.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    height: hp(5),
    width: hp(5),
    zIndex: 1,
    right: hp(2.5),
    top: hp(1.7)
  }
});
