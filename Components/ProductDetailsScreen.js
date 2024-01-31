import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import Swiper from 'react-native-swiper';

const ProductDetailsScreen = ({route}) => {
  const {productId} = route.params;
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${productId}`,
        );
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
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Swiper style={styles.swiper} showsButtons={false} loop={false}>
            {productDetails.images.map((image, index) => (
              <Image key={index} source={{uri: image}} style={styles.image} />
            ))}
          </Swiper>

          <Text style={styles.name}>{productDetails.title}</Text>
          <Text style={styles.category}>{productDetails.category}</Text>
          <Text style={styles.brand}>{productDetails.brand}</Text>
          <Text style={styles.description}>{productDetails.description}</Text>
          <Text style={styles.price}>{`Price: $${productDetails.price}`}</Text>
          <Text
            style={styles.rating}>{`Rating: ${productDetails.rating}`}</Text>
          <View style={styles.stockContainer}>
            <Text style={styles.stockTitle}>In Stock</Text>
            <Text style={styles.stock}>{productDetails.stock}</Text>
          </View>
          <Text
            style={
              styles.discount
            }>{`Discount: ${productDetails.discountPercentage}%`}</Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    height: 300,
    width: '100%',
    borderRadius: 8,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  category: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  brand: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  rating: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 10,
    textAlign: 'center',
  },
  stock: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  discount: {
    fontSize: 16,
    color: '#dc3545',
    marginBottom: 10,
    textAlign: 'center',
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
    marginRight: 5,
    marginBottom: 10,
  },
});

export default ProductDetailsScreen;
