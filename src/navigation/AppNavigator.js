import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Header, createStackNavigator } from '@react-navigation/stack';
import ProductListScreen from '../Components/ProductListScreen';
import ProductDetailsScreen from '../Components/ProductDetailsScreen';
import { Image, Text, View } from 'react-native';

const Stack = createStackNavigator();

function HeaderLogo(){
  return(
    <View>
      <Text> Hello</Text>
    </View>
  )
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="ProductList" component={ProductListScreen} options={{title: 'Product List',
        headerStyle: {
            backgroundColor: '#0B2545',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '400',
          },
          headerTitleAlign: 'center',
        }}/>
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details',
        headerStyle: {
            backgroundColor: '#0B2545',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '400',
          },
          headerTitleAlign: 'center', }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
