// src/screens/EditShipmentScreen.js
import React, { useState,useEffect  } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';
import Ionicons from '@expo/vector-icons/Ionicons';

const EditShipmentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { order } = route.params|| {};

  const [formData, setFormData] = useState({
    shipping_method: order?.shipping_method || '', // 用空字符串来初始化
    tracking_number: order?.tracking_number || '',
    ship_date: order?.ship_date || '', // 初始化为当前订单的 ship_date 或空
    status: order?.status, // 初始化为当前订单的状态或 'Pending'
  });
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    if (route.params?.scannedData) {
      // setFormData((prevFormData) => ({
      //   ...prevFormData,
      //   tracking_number: route.params.scannedData, // 自动填充 tracking_number
      // }));
      handleChange('tracking_number', route.params.scannedData);
      navigation.setParams({ scannedData: null }); // 清除 scannedData，防止重复填充
    }
  }, [route.params?.scannedData]);

  // 检查并解析 address_data
  const addressData = order.address_data ? (typeof order.address_data === 'string' ? JSON.parse(order.address_data) : order.address_data) : null;

  // 格式化显示地址信息
  const formattedAddress = addressData
    ? `${addressData.first_name} ${addressData.last_name}, ${addressData.street}, ${addressData.city}, ${addressData.province}, ${addressData.country}, ${addressData.postal}`
    : 'No address';

  const handleScanPress = () => {
    navigation.navigate('TrackingScanner', { previousScreen: 'EditShipment',order: order });
  };

  // 更新表单状态
  const handleChange = (name, value) => {
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // 实时检查 tracking_number 是否为空
    if (name === 'tracking_number') {
      setIsSaveDisabled(!value.trim());
    }
  };

  useEffect(() => {
    const isDisabled = !formData.tracking_number.trim(); // 检查是否为空
    setIsSaveDisabled(isDisabled);
  }, []);

  const handleSave = async () => {
    if (isSaveDisabled) {
      Alert.alert('Error', 'Please enter a tracking number before shipping.');
      return;
    }
    const currentDate = new Date().toISOString().split('T')[0];
  
    // 更新表单状态为 Shipped，更新发货日期
    const updatedFormData = {
      ...formData,
      ship_date: currentDate,
      status: 'shipped'
    };
  
    try {
      const response = await axios.put(`${REACT_APP_API_URL}/api/orders/update-order`, {
        order_id: order.id,
        shipping_method: updatedFormData.shipping_method,
        tracking_number: updatedFormData.tracking_number,
        ship_date: updatedFormData.ship_date,
        status: updatedFormData.status
      });
  
      if (response.status === 200) {
        Alert.alert('Success', 'Order updated successfully!');
        navigation.goBack(); // 返回上一页
      }
    } catch (error) {
      console.error('Error updating order:', error);
      Alert.alert('Error', 'Failed to update order.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    // 获取日期部分
    const formattedDate = date.toISOString().split('T')[0]; // 提取 YYYY-MM-DD 格式
  
    // 获取时间部分
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
  
    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Information</Text>
        <Text style={styles.infoText}>Order ID: {order.id}</Text>
        <Text style={styles.infoText}>Total: ${order.total}</Text>
        <Text style={styles.infoText}>Total Tax: ${order.total_tax}</Text>
        <Text style={styles.infoText}>Status: {order.status}</Text>
        <Text style={styles.infoText}>Order Date: {formatDate(order.order_date)}</Text>
        <Text style={styles.infoText}>Ship Date: {order.ship_date || 'Not Shipped'}</Text>
      </View>
  
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <Text style={styles.addressText}>{formattedAddress}</Text>
      </View>
  
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Details</Text>
        <Text style={styles.label}>Shipping Method</Text>
        <View style={styles.pickerContainer}>
        <Picker
            selectedValue={formData.shipping_method}
            style={styles.picker}
            onValueChange={(value) => setFormData({ ...formData, shipping_method: value })}
        >
            <Picker.Item label="Select Shipping Method" value="" />
            <Picker.Item label="UPS" value="UPS" />
            <Picker.Item label="FedEx" value="FedEx" />
            <Picker.Item label="DHL" value="DHL" />
            <Picker.Item label="Canada Post" value="Canada Post" />
        </Picker>
        </View>
  
        <Text style={styles.label}>Tracking Number</Text>
        <View style={styles.trackingContainer}>
          <TextInput
            style={styles.trackingInput}
            value={formData.tracking_number}
            onChangeText={(value) => handleChange('tracking_number', value)}
          />
          <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
            <Text style={styles.buttonText}>Scan</Text>
            <Ionicons 
              name="scan"
              size={24}
              color="white"
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
        </View>
      </View>
  
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} 
          onPress={handleSave}
          disabled={isSaveDisabled}
          >
          <Text style={styles.buttonText}>Ship</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// 样式更新
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  trackingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackingInput: {
    flex: 1, // 仅在 trackingContainer 中应用 flex，使输入框与按钮一起适应
    height: 40,
    borderColor: '#ccc',
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
  cancelButton: {
    backgroundColor: '#F44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  addressText: {
    fontSize: 16,
    color: '#333',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    lineHeight: 24,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden', // 保持边框圆角
    marginBottom: 10,
  },
  picker: {
    height: 45,
    color: '#333',
  },
});


export default EditShipmentScreen;
