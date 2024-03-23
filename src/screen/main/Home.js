import {FlatList, ScrollView, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import Wrapper from '../../components/Wrapper';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FoodCategories from '../../components/FoodCategories';
import ROUTES, {categories, restaurants} from '../../utils';
import themes from '../../assets/themes';
import RestaurantCard from '../../components/RestaurantCard';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [catId, setCatId] = useState(0);
  const navigation = useNavigation();

  const renderCategories = () => {
    return (
      <ScrollView
        horizontal
        style={styles.categoriesWrapper}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentWrapper}>
        {categories.map((item, i) => (
          <FoodCategories
            key={i}
            catImage={item.cat}
            catName={item.text}
            onCatPress={() => setCatId(i)}
            catStyle={{
              backgroundColor: catId == i ? themes.primary : themes.white,
            }}
          />
        ))}
      </ScrollView>
    );
  };

  const renderCards = () => {
    return (
      <FlatList
        data={restaurants}
        scrollEnabled={false}
        renderItem={({item, index}) => (
          <RestaurantCard
            key={index}
            name={item.name}
            onPress={() => navigation.navigate(ROUTES.RestaurantDetail)}
            discount={item.discount}
            date={item.validity}
            items={item.items}
            rating={item.rating}
          />
        )}
        contentContainerStyle={styles.cardWrapper}
        ListHeaderComponent={() => (
          <Text style={styles.headerText}>Open Restaurants</Text>
        )}
      />
    );
  };

  return (
    <Wrapper>
      <Header />
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}>
        <SearchBar />
        {renderCategories()}
        {renderCards()}
      </ScrollView>
    </Wrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    marginLeft: hp('2.5%'),
  },
  categoriesWrapper: {
    paddingTop: hp('4%'),
    marginHorizontal: hp('-3%'),
    flexDirection: 'row',
  },
  contentWrapper: {
    paddingHorizontal: hp('3%'),
  },
  cardWrapper: {
    paddingTop: hp('5%'),
  },
  headerText: {
    color: themes.heading,
    fontWeight: 'bold',
    marginBottom: hp('4%'),
    fontSize: hp('2.8%'),
  },
});
