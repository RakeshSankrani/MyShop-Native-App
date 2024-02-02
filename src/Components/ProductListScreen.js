import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import StarRating from './StarRating';
import DiscountedPrice from '../Common/DiscountedPrice';
import { fetchProductList } from '../Api/Api';
import axios from 'axios';

const ProductListScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchProductList();
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts(); 
  
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={products.slice(1)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
            >
              <View style={styles.cardContent}>
                <Image source={{ uri: item.thumbnail }} style={styles.image} />
                <View style={styles.detailsContainer}>
                <View style={{flexDirection:"row", justifyContent:"start", alignItems:"center", marginBottom:5}}>
                    <Text style={{color: '#00000080'}}>Brand:</Text>
                    <Text style={{color:"#000"}}> {item.brand}</Text>
                  </View>
                  <Text style={styles.name}>{item.title}</Text>
                  <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
                  <Text style={styles.newPrice}>
                    <DiscountedPrice price={item.price} discount={item.discountPercentage}/>
                  </Text>
                  <View style={{flexDirection:"row", justifyContent:"start", alignItems:"center", marginBottom:5}}>
                  <Text style={styles.price}>{`₹${item.price}`}</Text>
                  <Text style={{fontSize:14, marginHorizontal:5, color:"green" }}>{`(${Math.round(item.discountPercentage)}% OFF)`}</Text>
                  </View>
                  <View style={{flexDirection:"row", justifyContent:"flex-end", alignItems:"center", marginBottom:5}}>
                  <View style={item.price <= 100 ? {backgroundColor:"green", borderRadius:5, padding:5} : item.price > 100 && item.price <= 500 ? {backgroundColor:"blue", borderRadius:5,padding:5}:item.price > 500 && item.price <= 1000 ? {backgroundColor:"red", borderRadius:5, padding:5} : {backgroundColor:"black", borderRadius:5, padding:5}}>
                    <Text style={{color:"#fff", fontWeight:"400", fontSize:12}}>  {item.price <= 100 ? 'Daily Saver' : item.price > 100 && item.price <= 500 ? 'Hot Deal': item.price > 500 && item.price <= 1000 ? "Super Saver" : "Exclusive Discount"}   </Text>
                  </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8DA9C4',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row', 
  },
  image: {
    height: 150,
    width: '40%',
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1, 
    marginLeft: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight:16,
    color: '#000',
    marginVertical:4
  },
  description:{
    fontSize: 12,
    fontWeight: '400',
    lineHeight:14,
    color: '#000000',
    marginVertical:4
  },
  price: {
    fontSize: 16,
    color: '#000',
    textDecorationLine:'line-through'
  },
  newPrice:{
    fontSize: 16,
    color: '#000',
    fontWeight:'900',
    marginVertical:4
  }
});

export default ProductListScreen;
