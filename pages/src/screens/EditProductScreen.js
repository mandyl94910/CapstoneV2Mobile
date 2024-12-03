// src/screens/EditProductScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal  } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios'; // 确保 axios 已安装
import { REACT_APP_API_URL } from '@env';
import { Switch } from 'react-native-gesture-handler';


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
    visibility: product.visibility
  });
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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
          visibility: formData.visibility
        });
  
        if (response.status === 200) {
          setSuccessModalVisible(true); // 打开成功提示框
          // Alert.alert('Success', 'Product updated successfully!');
          // navigation.navigate('ProductList', { timestamp: Date.now() });
        }
      } catch (error) {
        console.error('Error updating product:', error);
        Alert.alert('Error', 'Failed to update product.');
      }
    };

    const handleDelete = async () => {
      try {
        const response = await axios.delete(`${REACT_APP_API_URL}/api/products/delete-product`, {
          data: { product_id: formData.product_id },
        });
        console.log('Deleting product with ID - client side:', formData.product_id);
  
        if (response.status === 200) {
          setDeleteModalVisible(false);
          // Alert.alert('Success', 'Product deleted successfully!');
          navigation.navigate('ProductList', { timestamp: Date.now() });
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        Alert.alert('Error', 'Failed to delete product.');
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Product</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Product ID</Text>
        <TextInput 
          style={styles.input} 
          value={formData.product_id} 
          editable={false} // 设置为不可编辑
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput 
          style={styles.input} 
          value={formData.product_name} 
          onChangeText={(value) => handleChange('product_name', value)} 
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Product Description</Text>
        <TextInput 
          style={styles.input} 
          value={formData.product_description} 
          onChangeText={(value) => handleChange('product_description', value)} 
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Price</Text>
        <TextInput 
          style={styles.input} 
          value={formData.price} 
          onChangeText={(value) => handleChange('price', value)} 
          keyboardType="numeric" 
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Quantity</Text>
        <TextInput 
          style={styles.input} 
          value={formData.quantity} 
          onChangeText={(value) => handleChange('quantity', value)} 
          keyboardType="numeric" 
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Category</Text>
        <TextInput 
          style={[styles.input, styles.readOnlyInput]} 
          value={formData.category_name} 
          editable={false} // 设置为不可编辑
        />
      </View>

      {/* <Text style={styles.label}>Visibility</Text>
      <TextInput 
        style={styles.input} 
        value={formData.visibility} 
        onChangeText={(value) => handleChange('visibility', value)} 
      /> */}
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: '#d3d3d3', true: '#00BFFF' }}
          thumbColor={formData.visibility ? '#0099EE' : '#888'}
          onValueChange={(value) => handleChange('visibility', value)}
          value={formData.visibility}
        />
        <Text style={styles.switchText}>
          {formData.visibility ? 'Visible' : 'Hidden'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => setDeleteModalVisible(true)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>

       {/* 成功提示模态框 */}
       <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Product updated successfully!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setSuccessModalVisible(false);
                navigation.navigate('ProductList', { timestamp: Date.now() });
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete this product?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#F44336' }]}
                onPress={handleDelete}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#aaa' }]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 20,
      textAlign: 'center',
    },
    fieldContainer: {
      width: '95%',
      alignItems: 'flex-start', // 内部内容左对齐
      marginBottom: 15, // 字段之间的间距
    },
    label: {
      alignSelf: 'flex-start',
      fontSize: 18,
      color: '#666',
      marginBottom: 5,
    },
    input: {
      height: 48,
      width: '100%',
      fontSize: 18,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
    },
    readOnlyInput: {
      color: '#000', // 字体颜色黑色
      backgroundColor: '#eee', // 背景颜色灰色
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      // marginHorizontal: 'auto',
    },
    switchText: {
      marginLeft: 10,
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
      marginHorizontal: 20,
    },
    deleteButton: {
      backgroundColor: '#F44336',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginHorizontal: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 18,
      marginBottom: 20,
    },
    modalButton: {
      backgroundColor: '#0099CC',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    modalButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
  });
  
  export default EditProductScreen;