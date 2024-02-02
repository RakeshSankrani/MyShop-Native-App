import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from 'react-native';
import StarRatingComponent from './StarRating';
import Swiper from 'react-native-swiper';
import DiscountedPrice from '../Common/DiscountedPrice';
import { fetchProductSpecificDetails } from '../Api/Api';
const width = Dimensions.get('screen').width
const height= Dimensions.get('screen').height


const ProductDetailsScreen = ({route}) => {
  const {productId} = route.params;
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetchProductSpecificDetails(productId)
        setProductDetails(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <Swiper style={styles.swiper} showsButtons={false} loop={true}>
            {productDetails.images.map((image, index) => (
              <Image
                resizeMode="contain"
                key={index}
                source={{uri: image}}
                style={styles.image}
              />
            ))}
          </Swiper>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={{color:'#00000080'}}>Brand:</Text>
              <Text style={{color: '#000'}}> {productDetails.brand}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={{color:'#00000080'}}>Category:</Text>
              <Text style={{color: '#000'}}> {productDetails.category}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <View style={{width: 200}}>
              <Text style={styles.name}>{productDetails.title}</Text>
            </View>
            <View>
              <StarRatingComponent initialValue={productDetails.rating} />
            </View>
          </View>

          <Text style={styles.description}>{productDetails.description}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <View>
              <Text style={styles.newPrice}>
                <DiscountedPrice
                  price={productDetails.price}
                  discount={productDetails.discountPercentage}
                />
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'start',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Text style={styles.price}>{`₹${productDetails.price}`}</Text>
                <Text
                  style={{
                    fontSize: 14,
                    marginHorizontal: 5,
                    color: 'green',
                  }}>{`(${Math.round(
                  productDetails.discountPercentage,
                )}% OFF)`}</Text>
              </View>
            </View>

            <View style={styles.stockContainer}>
              <Text style={styles.stock}>{productDetails.stock} </Text>
              <Text style={styles.stockTitle}>In Stock</Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 8,
    marginBottom: 20,
    flex:1,
    alignSelf:"stretch",
    width:"100%"

  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    marginTop: 10,
  },
  category: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  brand: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    color: '#000',
    textDecorationLine:'line-through'
  },
  rating: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 10,
  },
  stock: {
    fontSize: 16,
    color: '#fff',
  },
  discount: {
    fontSize: 16,
    color: '#dc3545',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  stockTitle: {
    fontSize: 16,
    color: '#fff',
    marginHorizontal: 5
  },
  newPrice:{
    fontSize: 18,
    color: '#000',
    fontWeight:'900',
    marginVertical:4
  }
});

export default ProductDetailsScreen;
