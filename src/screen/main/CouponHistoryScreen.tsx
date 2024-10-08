import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Container from '../../components/Container';
import {useNavigation} from '@react-navigation/native';
import themes from '../../assets/themes';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import images from '../../assets/images';
import fonts from '../../assets/fonts';
import {Table, Row} from 'react-native-table-component';

const tableData = [
  {
    id: 1,
    title: 'Date',
  },
  {
    id: 2,
    title: 'Restaurant',
  },
  {
    id: 3,
    title: 'Coupon',
  },
  {
    id: 4,
    title: 'Coupon Name',
  },
  // {
  //     id: 5,
  //     title: 'Points',
  // },
  // {
  //     id: 6,
  //     title: 'Price Gain',
  // },
  // {
  //     id: 7,
  //     title: 'Customer',
  // },
];

const rowData = [
  {
    id: 1,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    // points: '50',
    // priceGain: '$5',
    // customer: 'John Doe',
  },
  {
    id: 2,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    // points: '50',
    // priceGain: '$5',
    // customer: 'John Doe',
  },
  {
    id: 3,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    // points: '50',
    // priceGain: '$5',
    // customer: 'John Doe',
  },
  {
    id: 4,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    // points: '50',
    // priceGain: '$5',
    // customer: 'John Doe',
  },
  {
    id: 5,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    // points: '50',
    // priceGain: '$5',
    // customer: 'John Doe',
  },
  {
    id: 6,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    // points: '50',
    // priceGain: '$5',
    // customer: 'John Doe',
  },
  {
    id: 7,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    // points: '50',
    // priceGain: '$5',
    // customer: 'John Doe',
  },
  {
    id: 8,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    // points: '50',
    // priceGain: '$5',
    // customer: 'John Doe',
  },
  {
    id: 9,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    // points: '50',
    // priceGain: '$5',
    // customer: 'John Doe',
  },
  {
    id: 10,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    // points: '50',
    // priceGain: '$5',
    // customer: 'John Doe',
  },
  {
    id: 11,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    // points: '50',
    // priceGain: '$5',
    // customer: 'John Doe',
  },
  {
    id: 12,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    // points: '50',
    // priceGain: '$5',
    // customer: 'John Doe',
  },
  {
    id: 13,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    // points: '50',
    // priceGain: '$5',
    // customer: 'John Doe',
  },
  {
    id: 14,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    // points: '50',
    // priceGain: '$5',
    // customer: 'John Doe',
  },
];

const CouponHistoryScreen = () => {
  const nav = useNavigation();
  const tableHead = tableData.map(item => item.title);
  const widthArr = new Array(tableHead.length).fill(wp(38));

  const tableRows = rowData.map(row => [
    row.date,
    row.restaurant,
    row.coupon,
    row.cName,
    row.points,
    row.priceGain,
    row.customer,
  ]);

  return (
    <Container logo={true}>
      <TouchableOpacity onPress={() => nav.goBack()} style={styles.backTouch}>
        <Image source={images.back} style={styles.back} />
      </TouchableOpacity>
      <Text style={styles.heading}>Coupon History</Text>
      <Text style={styles.text}>
        Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
        consectetur
      </Text>
      <ScrollView horizontal={true} style={{height: hp(35), marginTop: hp(2)}} showsHorizontalScrollIndicator={true}>
        <View>
          <Table>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.TableTextHead}
            />
          </Table>
          <ScrollView style={styles.innerVerticalScroll} showsVerticalScrollIndicator={true}>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              {tableRows.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  style={[styles.row, {backgroundColor: themes.gray1}]}
                  textStyle={styles.TableTextBody}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </Container>
  );
};

export default CouponHistoryScreen;

const styles = StyleSheet.create({
  TableTextBody: {
    textAlign: 'center',
    color: themes.navy_blue,
    fontSize: hp(1.9),
    paddingVertical: wp(1),
  },
  row: {
    backgroundColor: '#E7E6E1',
    // padding: 5,
  },
  TableTextHead: {
    textAlign: 'center',
    color: themes.primary,
    fontSize: hp(2.3),
    fontFamily: fonts.lexendBold,
    paddingVertical: hp(1),
  },
  header: {
    backgroundColor: themes.red1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },
  text: {
    color: themes.primary,
    marginVertical: hp(1.5),
    fontSize: hp(2.3),
    fontFamily: fonts.lexendBold,
  },
  heading: {
    color: themes.white,
    fontSize: hp('4%'),
    marginTop: hp(4),
    fontFamily: fonts.markRegular,
  },
  back: {
    resizeMode: 'contain',
    width: wp(5),
    height: wp(5),
  },
  backTouch: {
    backgroundColor: themes.navy_blue,
    padding: 13,
    position: 'absolute',
    top: hp(10),
    borderRadius: 50,
    aspectRatio: 1,
  },
  innerVerticalScroll: {
    maxHeight: hp(50),
  },
});
