// src/screens/ProductListScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

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
      <FontAwesome6 name="edit" size={20} color="#0099EE" 
        style={{ 
          position: 'absolute', // 绝对定位
          top: 15, // 距离顶部 15 像素
          right: 15, // 距离右侧 15 像素
          zIndex: 1, // 确保图标位于卡片内容之上
        }}/>
    <Text style={styles.productText}>
      <Text style={{fontWeight: 'bold'}}>Product ID: </Text>
      <Text style={{color: '#666'}}>{item.product_id}</Text>
    </Text>
    <Text style={styles.productText}>
      <Text style={{fontWeight: 'bold'}}>Product Name: </Text>
      <Text style={{color: '#666'}}>{item.product_name}</Text>
    </Text>
    <Text style={styles.productText}>
      <Text style={{fontWeight: 'bold'}}>Price: </Text>
      <Text style={{color: '#666'}}>${item.price}</Text>
    </Text>
    <Text style={styles.productText}>
      <Text style={{fontWeight: 'bold'}}>Quantity: </Text>
      <Text style={{color: '#666'}}>{item.quantity}</Text>
    </Text>
    <Text style={styles.productText}>
      <Text style={{fontWeight: 'bold'}}>Visibility: </Text>
      <Text style={{color: '#666'}}>{item.visibility ? 'Y' : 'N'}</Text>
    </Text>
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
          <Ionicons 
            name="scan"
            size={24}
            color="white"
            style={{marginRight: 10}}
          />
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
    fontWeight: 'bold',
    marginVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 48,
    fontSize: 18,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  scanButton: {
    flexDirection: 'row',
    backgroundColor: '#0099EE',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#777',
    shadowOpacity: 0.02,
    shadowRadius: 5,
    elevation: 5,
  },
  productText: {
    fontSize: 16,
    marginBottom: 3,
  },
});

export default ProductListScreen;
