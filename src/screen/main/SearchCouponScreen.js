import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import images from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import themes from '../../assets/themes';
import fonts from '../../assets/fonts';
import InputField from '../../components/InputField';
import icons from '../../assets/icons';
import { Table, Row } from 'react-native-table-component';

const tableData = [
    {
        id: 1,
        title: 'Date',
    },
    {
        id: 2,
        title: 'User',
    },
    {
        id: 3,
        title: 'Coupon',
    },
    {
        id: 4,
        title: 'C.Name'
    },
];

const rowData = [
    {
        id: 1,
        date: "18 Jan'24",
        user: 'John Doe',
        coupon: 'ABCDEFG',
        name: 'BG50',
    },
    {
        id: 2,
        date: "18 Jan'24",
        user: 'John Doe',
        coupon: 'ABCDEFG',
        name: 'BG50',
    },
    {
        id: 3,
        date: "18 Jan'24",
        user: 'John Doe',
        coupon: 'ABCDEFG',
        name: 'BG50',
    },
    {
        id: 4,
        date: "18 Jan'24",
        user: 'John Doe',
        coupon: 'ABCDEFG',
        name: 'BG50',
    },
    {
        id: 5,
        date: "18 Jan'24",
        user: 'John Doe',
        coupon: 'ABCDEFG',
        name: 'BG50',
    },
];

const SearchCouponScreen = () => {
    const nav = useNavigation();

    const tableHead = tableData.map(item => item.title);
    const widthArr = new Array(tableHead.length).fill(wp(22));

    const tableRows = rowData.map(row => [
        row.date,
        row.user,
        row.coupon,
        row.name,
    ]);

    return (
        <Container logo={true}>
            <TouchableOpacity onPress={() => nav.goBack()} style={styles.backTouch}>
                <Image source={images.back} style={styles.back} />
            </TouchableOpacity>
            <Text style={styles.createText}>Search Coupon</Text>
            <InputField
                placeholder={'Search Coupon Code'}
                style={styles.input}
                icon={icons.search}
                textColor={themes.black}
            />
            <View style={styles.userView}>
                <Image source={images.userImage} style={styles.userImage} />
                <Text style={styles.ownerName}>John Doe</Text>
                <View>
                    <Text style={styles.nameText}>Coupon Name</Text>
                    <Text style={styles.codeText}>ABC123D</Text>
                    <View style={styles.availableTextView}>
                        <Text style={styles.availableText}>Available - 3 of 5</Text>
                    </View>
                </View>
            </View>
            <Text style={[styles.createText, { alignSelf: 'center', marginTop: 0 }]}>Coupon History</Text>
            <Text style={styles.lorem}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur</Text>
            {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
            <View style={{ alignSelf: 'center' }}>
                <Table>
                    <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.TableTextHead} />
                </Table>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        {tableRows.map((rowData, index) => (
                            <Row
                                key={index}
                                data={rowData}
                                widthArr={widthArr}
                                style={[styles.row, { backgroundColor: themes.gray1 }]}
                                textStyle={styles.TableTextBody}
                            />
                        ))}
                    </Table>
                </ScrollView>
            </View>
            {/* </ScrollView> */}
            {/* <View style={{ height: hp(5) }} /> */}
        </Container>
    );
};

export default SearchCouponScreen;

const styles = StyleSheet.create({
    header: {
        backgroundColor: themes.red1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1
    },
    row: {
        backgroundColor: '#E7E6E1',
    },
    TableTextBody: {
        textAlign: 'center',
        color: themes.navy_blue,
        fontSize: hp(1.5),
        paddingVertical: wp(1),
    },
    TableTextHead: {
        textAlign: 'center',
        color: themes.primary,
        fontSize: hp(2),
        fontFamily: fonts.lexendBold,
        paddingVertical: hp(1)
    },
    lorem: {
        color: themes.primary,
        fontFamily: fonts.lexendBold,
        fontSize: wp(4),
        marginVertical: wp(3),
    },
    availableText: {
        color: themes.navy_blue,
        fontFamily: fonts.medium
    },
    ownerName: {
        fontFamily: fonts.lexendBold,
    },
    availableTextView: {
        marginTop: 2,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: themes.primary,
        borderWidth: 1,
        borderColor: themes.black,
        borderRadius: 5,
    },
    codeText: {
        fontFamily: fonts.lexendBold,
        textAlign: 'center',
        fontSize: wp(5),
    },
    nameText: {
        color: themes.navy_blue,
        textAlign: 'center',
        fontFamily: fonts.markRegular,
    },
    userImage: {
        width: wp(15),
        height: wp(15),
        resizeMode: 'contain',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: themes.black,
    },
    userView: {
        backgroundColor: themes.gray1,
        padding: 20,
        marginVertical: hp(2),
        width: wp(80),
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 15,
    },
    input: {
        backgroundColor: themes.white,
        marginVertical: hp(2),
        width: wp(90),
        borderRadius: 5,
        alignSelf: 'center'
    },
    createText: {
        color: themes.white,
        fontSize: wp(6.5),
        fontFamily: fonts.lexendBold,
        marginTop: wp(10)
    },
    back: {
        resizeMode: 'contain',
        width: wp(5),
        height: wp(5)
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