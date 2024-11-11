// src/screens/EditShipmentScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const EditShipmentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { order } = route.params;

  const [formData, setFormData] = useState({
    shipping_method: order.shipping_method || '',
    tracking_number: order.tracking_number || '',
  });

  // 如果 address_data 是字符串，就解析它，否则直接使用
  const addressData = typeof order.address_data === 'string' ? JSON.parse(order.address_data) : order.address_data;

  const handleSave = () => {
    Alert.alert('Updated Order Information', JSON.stringify(formData, null, 2));
  };

  const handleScanPress = () => {
    navigation.navigate('TestScanner', { previousScreen: 'EditShipment' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Shipment</Text>

      <Text style={styles.label}>Order ID</Text>
      <TextInput style={styles.inputReadOnly} value={order.id.toString()} editable={false} />

      <Text style={styles.label}>Total</Text>
      <TextInput style={styles.inputReadOnly} value={`$${order.total}`} editable={false} />

      <Text style={styles.label}>Total Tax</Text>
      <TextInput style={styles.inputReadOnly} value={`$${order.total_tax}`} editable={false} />

      <Text style={styles.label}>Status</Text>
      <TextInput style={styles.inputReadOnly} value={order.status} editable={false} />

      <Text style={styles.label}>Order Date</Text>
      <TextInput style={styles.inputReadOnly} value={order.order_date} editable={false} />

      <Text style={styles.label}>Ship Date</Text>
      <TextInput style={styles.inputReadOnly} value={order.ship_date || 'Not Shipped'} editable={false} />

      <Text style={styles.label}>Shipping Method</Text>
      <TextInput style={styles.input} value={formData.shipping_method} onChangeText={(value) => setFormData({ ...formData, shipping_method: value })} />

      <Text style={styles.label}>Tracking Number</Text>
      <View style={styles.trackingContainer}>
        <TextInput style={styles.input} value={formData.tracking_number} onChangeText={(value) => setFormData({ ...formData, tracking_number: value })} />
        <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Shipping Address</Text>
      <Text style={styles.addressText}>{`${addressData.first_name} ${addressData.last_name}, ${addressData.street}, ${addressData.city}, ${addressData.province}, ${addressData.country}, ${addressData.postal}`}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Ship</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
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
  inputReadOnly: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#e0e0e0',
    color: '#000',
  },
  trackingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scanButton: {
    backgroundColor: '#0099CC',
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
    fontSize: 16,
  },
  addressText: {
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
});

export default EditShipmentScreen;
