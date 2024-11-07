// src/screens/AddProductScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import BarcodeScanner from '../components/BarcodeScanner';

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
  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    // Simulate submission and display form data
    Alert.alert('Form Submitted', JSON.stringify(formData, null, 2));
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
          onChangeText={(value) => handleChange('product_id', value)}
        />
        <TouchableOpacity style={styles.cameraButton} onPress={() => setIsScanning(true)}>
          <Text style={styles.cameraButtonText}>Scan</Text>
        </TouchableOpacity>
      </View>
      {/* Conditionally Render BarcodeScanner Component */}
      {isScanning && <BarcodeScanner onClose={() => setIsScanning(false)} />}

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

      {/* Category Input */}
      <TextInput
        style={styles.input}
        placeholder="Category"
        placeholderTextColor="#999"
        value={formData.category}
        onChangeText={(value) => handleChange('category', value)}
      />

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
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 5,
  },
  visibilityButton: {
    backgroundColor: '#00BFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
