// src/screens/ProductManagementScreen.js
import React,{useState}from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductManagementScreen = () => {
  const navigation = useNavigation();
  const handleAddProduct = () => {
    navigation.navigate('AddProduct'); // 跳转到 AddProductScreen
  };

  const handleSearchProduct = () => {
    navigation.navigate('ProductList');
  };

  const handleShipProduct = () => {
    navigation.navigate('ShipProduct'); // 跳转到 ShipProductScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Management</Text>
      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSearchProduct}>
        <Text style={styles.buttonText}>Search Product</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleShipProduct}>
        <Text style={styles.buttonText}>Ship Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // Moves content further up
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0099CC', // Cyan color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 15, // Increased margin for spacing
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ProductManagementScreen;
