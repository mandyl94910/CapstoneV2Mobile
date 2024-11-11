// src/screens/ProductListScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';

const ProductListScreen = () => {
  const [products,setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [resetSearch, setResetSearch] = useState(false); 

  const navigation = useNavigation();
  const route = useRoute();

   // 初次加载时获取所有产品数据
   useEffect(() => {
    fetchProducts();
  }, []);

  // 获取所有产品数据
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/products/all-products`);
      setProducts(response.data); // 更新产品数据
      setFilteredProducts(response.data); // 初始展示全部产品
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (route.params?.timestamp) {
      fetchProducts(); // 刷新产品列表
      setSearchQuery(''); // 清空搜索框
      setResetSearch(true); // 设置搜索框重置状态
      navigation.setParams({ timestamp: null }); // 重置时间戳参数
    }
  }, [route.params?.timestamp]);

  // 监听从扫描页面返回的条形码数据
  useEffect(() => {
    if (route.params?.scannedData && !resetSearch) {
      handleSearch(route.params.scannedData);
      setSearchQuery(route.params.scannedData);
      navigation.setParams({ scannedData: null });
    }
    setResetSearch(false);
  }, [route.params?.scannedData]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.product_id.toString().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleScanPress = () => {
    navigation.navigate('TestScanner', { previousScreen: 'ProductList' });
  };

  const handleProductPress = (product) => {
    navigation.navigate('EditProduct', { product }); // 传递产品信息
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => handleProductPress(item)}>
      <Text style={styles.productText}>Product ID: {item.product_id}</Text>
      <Text style={styles.productText}>Product Name: {item.product_name}</Text>
      <Text style={styles.productText}>Price: {item.price}</Text>
      <Text style={styles.productText}>Quantity: {item.quantity}</Text>
      <Text style={styles.productText}>Visibility: {item.visibility ? 'Y' : 'N'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product List</Text>
      
      {/* 搜索框和 Scan 按钮 */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by Product ID"
          value={searchQuery}
          onChangeText={handleSearch}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
          <Text style={styles.scanButtonText}>Scan</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.product_id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  scanButton: {
    backgroundColor: '#0099CC',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ProductListScreen;
