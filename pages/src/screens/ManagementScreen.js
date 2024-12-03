// src/screens/ManagementScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ManagementScreen = () => {
  const navigation = useNavigation();
  const handleProductManagement = () => {
    navigation.navigate('ProductManagement');
  };

  const handleUserManagement = () => {
    // User management logic
  };

  const handleOrderReport = () => {
    // Order report logic
  };

  const handleTestScanner = () => {
    navigation.navigate('TestScanner'); // 跳转到 TestScannerScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Admin!</Text>
      <TouchableOpacity style={styles.button} onPress={handleProductManagement}>
        <Text style={styles.buttonText}>Product Management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleUserManagement}>
        <Text style={styles.buttonText}>User Management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleOrderReport}>
        <Text style={styles.buttonText}>Order Report</Text>
      </TouchableOpacity>
      {/* 新增 TestScannerScreen 按钮 */}
      <TouchableOpacity style={styles.button} onPress={handleTestScanner}>
        <Text style={styles.buttonText}>Open Scanner</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#0099EE',
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

export default ManagementScreen;
