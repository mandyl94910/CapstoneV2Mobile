// src/screens/AddProductScreen.js
import React, { useState,useEffect,useCallback  } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useNavigation,useRoute, useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // 导入 Picker 组件
import axios from 'axios'; // 确保 axios 已安装
import { REACT_APP_API_URL } from '@env';

const AddProductScreen = () => {
  const [formData, setFormData] = useState({
    product_id: '',
    product_name: '',
    product_description: '',
    price: '',
    quantity: '',
    category: '',
    visibility: 'true',
  });
  const [validationMessage, setValidationMessage] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      if (route.params?.scannedData) {
        handleChange('product_id', route.params.scannedData);
        navigation.setParams({ scannedData: null });
      }
    }, [route.params?.scannedData])
  );

  // 获取类别数据
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/api/categories/get-category`);
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error response:', error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };
  
    fetchCategories();
  }, []);

  // Handle input field changes
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form validation
  const validateForm = () => {
    if (!formData.product_name) {
      setValidationMessage('Product name cannot be empty.');
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      setValidationMessage('Price must be greater than 0.');
      return false;
    }
    if (!formData.quantity || formData.quantity <= 0) {
      setValidationMessage('Quantity must be greater than 0.');
      return false;
    }
    if (!formData.category) {
      setValidationMessage('Please select a category.');
      return false;
    }
    setValidationMessage('');
    return true;
  };

  // Form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
  
    // 从 category 列表中找到对应的 category_id
    const selectedCategory = categories.find(cat => cat.name === formData.category);
    const category_id = selectedCategory ? selectedCategory.id : null;
  
    if (!category_id) {
      Alert.alert('Error', 'Selected category not found.');
      return;
    }
  
    // 发送数据到后端 API
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/products/add-product`, {
        product_name: formData.product_name,
        price: parseFloat(formData.price),
        product_description: formData.product_description,
        category_id: category_id,
        quantity: parseInt(formData.quantity),
        visibility: formData.visibility === 'true' // 将字符串转换为布尔值
      });
  
      if (response.status === 201) {
        Alert.alert('Success', 'Product added successfully.');
        // 清空表单数据
        setFormData({
          product_id: '',
          product_name: '',
          product_description: '',
          price: '',
          quantity: '',
          category: '',
          visibility: 'true',
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Failed to add product.');
    }
  };

  // 处理 Scan 按钮点击事件，导航到 TestScannerScreen
  const handleScanPress = () => {
    navigation.navigate('TestScanner');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Product</Text>

      {/* Product ID Input with Camera Button */}
      <View style={styles.productIdContainer}>
        <TextInput
          style={styles.productIdInput}
          placeholder="Product ID"
          placeholderTextColor="#999"
          value={formData.product_id}
          onChangeText={(value) => handleChange('product_id', value)}
        />
        <TouchableOpacity style={styles.cameraButton} onPress={handleScanPress}>
          <Text style={styles.cameraButtonText}>Scan</Text>
        </TouchableOpacity>
      </View>

      {/* Conditionally Render BarcodeScanner Component */}
      {isScanning && (
        <BarcodeScanner onClose={() => setIsScanning(false)} />
      )}

      {/* Product Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        placeholderTextColor="#999"
        value={formData.product_name}
        onChangeText={(value) => handleChange('product_name', value)}
      />

      {/* Product Description Input */}
      <TextInput
        style={styles.input}
        placeholder="Product Description"
        placeholderTextColor="#999"
        value={formData.product_description}
        onChangeText={(value) => handleChange('product_description', value)}
      />

      {/* Price Input */}
      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="#999"
        value={formData.price}
        keyboardType="numeric"
        onChangeText={(value) => handleChange('price', value)}
      />

      {/* Quantity Input */}
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        placeholderTextColor="#999"
        value={formData.quantity}
        keyboardType="numeric"
        onChangeText={(value) => handleChange('quantity', value)}
      />

      {/* Category Picker */}
      <View style={styles.pickerContainer}>
        {loading ? (
          <Text>Loading categories...</Text> // 显示加载状态
        ) : (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={formData.category}
              onValueChange={(itemValue) => handleChange('category', itemValue)}
              style={styles.picker}
              mode="dropdown"
            >
              <Picker.Item label="Select a category..." value="" />
              {categories.map((category) => (
                <Picker.Item key={category.id} label={category.name} value={category.name} />
              ))}
            </Picker>
          </View>
        )}
      </View>

      {/* Visibility Switch */}
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: '#d3d3d3', true: '#00BFFF' }}
          thumbColor={formData.visibility ? '#0099CC' : '#888'}
          onValueChange={(value) => handleChange('visibility', value)}
          value={formData.visibility}
        />
        <Text style={styles.switchText}>
          {formData.visibility ? 'Visible' : 'Hidden'}
        </Text>
      </View>

      {/* Display Validation Message */}
      {validationMessage ? <Text style={styles.validationMessage}>{validationMessage}</Text> : null}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Add Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  productIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  productIdInput: {
    flex: 2,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  cameraButton: {
    flex: 1,
    backgroundColor: '#0099CC',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cameraButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 15,
  },
  pickerWrapper: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: 40,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  switchText: {
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: '#0099CC',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  validationMessage: {
    color: 'red',
    marginBottom: 15,
  },
});

export default AddProductScreen;
