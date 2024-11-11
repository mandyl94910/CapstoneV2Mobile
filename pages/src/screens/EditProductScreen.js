// src/screens/EditProductScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios'; // 确保 axios 已安装
import { REACT_APP_API_URL } from '@env';


const EditProductScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params; // 获取传递的产品信息

  const [formData, setFormData] = useState({
    product_id: product.product_id,
    product_name: product.product_name,
    product_description: product.product_description,
    price: product.price.toString(),
    quantity: product.quantity.toString(),
    category_name: product.category_name, // 类目名称不可编辑
    visibility: product.visibility ? 'Visible' : 'Hidden'
  });

  // 更新本地状态
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

   // 保存按钮处理函数
   const handleSave =async () => {
    // 弹窗显示捕捉到的更改后的信息
    try {
        const response = await axios.put(`${REACT_APP_API_URL}/api/products/update-product`, {
          product_id: formData.product_id,
          product_name: formData.product_name,
          product_description: formData.product_description,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
          visibility: formData.visibility === 'Visible'
        });
  
        if (response.status === 200) {
          Alert.alert('Success', 'Product updated successfully!');
          navigation.navigate('ProductList', { timestamp: Date.now() });
        }
      } catch (error) {
        console.error('Error updating product:', error);
        Alert.alert('Error', 'Failed to update product.');
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Product</Text>

      <Text style={styles.label}>Product Name</Text>
      <TextInput 
        style={styles.input} 
        value={formData.product_name} 
        onChangeText={(value) => handleChange('product_name', value)} 
      />

      <Text style={styles.label}>Product Description</Text>
      <TextInput 
        style={styles.input} 
        value={formData.product_description} 
        onChangeText={(value) => handleChange('product_description', value)} 
      />

      <Text style={styles.label}>Price</Text>
      <TextInput 
        style={styles.input} 
        value={formData.price} 
        onChangeText={(value) => handleChange('price', value)} 
        keyboardType="numeric" 
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput 
        style={styles.input} 
        value={formData.quantity} 
        onChangeText={(value) => handleChange('quantity', value)} 
        keyboardType="numeric" 
      />

      <Text style={styles.label}>Category</Text>
      <TextInput 
        style={[styles.input, styles.readOnlyInput]} 
        value={formData.category_name} 
        editable={false} // 设置为不可编辑
      />

      <Text style={styles.label}>Visibility</Text>
      <TextInput 
        style={styles.input} 
        value={formData.visibility} 
        onChangeText={(value) => handleChange('visibility', value)} 
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 15,
      backgroundColor: '#fff',
    },
    readOnlyInput: {
      color: '#000', // 字体颜色黑色
      backgroundColor: '#e0e0e0', // 背景颜色灰色
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    saveButton: {
      backgroundColor: '#4CAF50',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    deleteButton: {
      backgroundColor: '#F44336',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  
  export default EditProductScreen;