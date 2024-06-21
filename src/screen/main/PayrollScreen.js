import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Container from '../../components/Container';
import images from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import themes from '../../assets/themes';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
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
    title: 'C.Name',
  },
  {
    id: 5,
    title: 'Points',
  },
  {
    id: 6,
    title: 'Price Gain',
  },
  {
    id: 7,
    title: 'Customer',
  },
];

const rowData = [
  {
    id: 1,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    points: '50',
    priceGain: '$5',
    customer: 'John Doe',
  },
  {
    id: 2,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    points: '50',
    priceGain: '$5',
    customer: 'John Doe',
  },
  {
    id: 3,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    points: '50',
    priceGain: '$5',
    customer: 'John Doe',
  },
  {
    id: 4,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    points: '50',
    priceGain: '$5',
    customer: 'John Doe',
  },
  {
    id: 5,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    points: '50',
    priceGain: '$5',
    customer: 'John Doe',
  },
  {
    id: 6,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    points: '50',
    priceGain: '$5',
    customer: 'John Doe',
  },
  {
    id: 7,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    points: '50',
    priceGain: '$5',
    customer: 'John Doe',
  },
  {
    id: 8,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    points: '50',
    priceGain: '$5',
    customer: 'John Doe',
  },
  {
    id: 9,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    points: '50',
    priceGain: '$5',
    customer: 'John Doe',
  },
  {
    id: 10,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    points: '50',
    priceGain: '$5',
    customer: 'John Doe',
  },
  {
    id: 11,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    points: '50',
    priceGain: '$5',
    customer: 'John Doe',
  },
  {
    id: 12,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    points: '50',
    priceGain: '$5',
    customer: 'John Doe',
  },
  {
    id: 13,
    date: "18 Jan'24",
    restaurant: 'Burger Den',
    coupon: 'ABCDEF',
    cName: 'BG50',
    points: '50',
    priceGain: '$5',
    customer: 'John Doe',
  },
];

const PayrollScreen = () => {
  const nav = useNavigation();
  const [his, setHis] = useState(0);
  const [paid, setPaid] = useState(false);

  const tableHead = tableData.map(item => item.title);
  const widthArr = new Array(tableHead.length).fill(wp(33));

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
      <Text style={styles.heading}>History</Text>
      <Text style={styles.text}>
        Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
        consectetur
      </Text>
      <View style={styles.TabView}>
        <TouchableOpacity
          style={[
            styles.Tab,
            {backgroundColor: his == 0 ? themes.red1 : 'transparent'},
          ]}
          onPress={() => setHis(0)}>
          <Text style={styles.tabText}>Current Payroll</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.Tab,
            {backgroundColor: his == 1 ? themes.red1 : 'transparent'},
          ]}
          onPress={() => setHis(1)}>
          <Text style={styles.tabText}>Payout History</Text>
        </TouchableOpacity>
      </View>
      {his == 0 ? (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{height: hp(35)}}>
          <View>
            <Table>
              <Row
                data={tableHead}
                widthArr={widthArr}
                style={styles.header}
                textStyle={styles.TableTextHead}
              />
            </Table>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{maxHeight: hp(50)}}>
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
      ) : (
        <>
          <TouchableOpacity
            onPress={() => setPaid(!paid)}
            style={styles.yellowRow}>
            <View style={styles.redPart}>
              <Text style={styles.paidText}>Paid</Text>
              <Text style={styles.codeText}>#4567890</Text>
            </View>
            <View style={styles.innerRow}>
              <Text style={styles.dateText}>18{`\n`}Jan'24</Text>
              <Text style={styles.amountText}>
                $30 recieved in bank account for 600 points collected
              </Text>
            </View>
          </TouchableOpacity>
          {paid ? (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginTop: hp(2)}}>
              <View>
                <Table>
                  <Row
                    data={tableHead}
                    widthArr={widthArr}
                    style={styles.header}
                    textStyle={styles.TableTextHead}
                  />
                </Table>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                    {tableRows.slice(0, 4).map((rowData, index) => (
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
          ) : null}
        </>
      )}
    </Container>
  );
};

export default PayrollScreen;

const styles = StyleSheet.create({
  amountText: {
    width: wp(50),
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: fonts.markRegular,
    fontSize: wp(3),
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  dateText: {
    textAlign: 'center',
    color: themes.navy_blue,
    width: wp(20),
    fontFamily: fonts.markRegular,
  },
  codeText: {
    color: themes.white,
    textAlign: 'center',
    fontFamily: fonts.markRegular,
  },
  paidText: {
    color: themes.white,
    textAlign: 'center',
    fontFamily: fonts.markRegular,
    fontSize: wp(5),
  },
  redPart: {
    backgroundColor: themes.red1,
    // width: wp(20),
    transform: [{rotate: '-90deg'}],
    padding: 5,
    // height: hp(8),
    // position: 'absolute',
    // left: 0,
  },
  yellowRow: {
    backgroundColor: themes.yellow,
    // padding: 15,
    width: wp(100),
    flexDirection: 'row',
  },
  tabText: {
    color: themes.primary,
    fontSize: wp(4),
    fontFamily: fonts.lexendBold,
  },
  Tab: {
    width: wp(49),
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  TabView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(3),
  },
  header: {
    backgroundColor: themes.red1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },
  TableTextBody: {
    textAlign: 'center',
    color: themes.navy_blue,
    fontSize: hp(1.9),
    paddingVertical: wp(1),
  },
  TableTextHead: {
    textAlign: 'center',
    color: themes.primary,
    fontSize: hp(2.3),
    fontFamily: fonts.lexendBold,
    paddingVertical: hp(1),
  },
  row: {
    backgroundColor: '#E7E6E1',
  },
  heading: {
    color: themes.white,
    fontWeight: 'bold',
    fontSize: hp('4%'),
    fontFamily: fonts.markRegular,
  },
  text: {
    color: themes.primary,
    marginVertical: hp(1.5),
    fontSize: hp(2.3),
    fontFamily: fonts.lexendBold,
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
});
