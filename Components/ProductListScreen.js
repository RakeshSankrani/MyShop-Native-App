import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

const ProductListScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
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
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
            >
              <View style={styles.cardContent}>
                <Image source={{ uri: item.thumbnail }} style={styles.image} />
                <View style={styles.detailsContainer}>
                  <Text style={styles.name}>{item.title}</Text>
                  <Text style={styles.price}>{`$${item.price}`}</Text>
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
    backgroundColor: '#f0f0f0',
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
    // alignItems: 'center', 
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  price: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProductListScreen;
