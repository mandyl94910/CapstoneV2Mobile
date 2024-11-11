//C:\proj309\CapstoneV2Mobile\pages\src\App.js
// App.js 文件顶部
console.log("加载 App.js 文件");
import 'react-native-gesture-handler'; // 必须放在其他导入之前
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, Button, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import ManagementScreen from './screens/ManagementScreen';
import ProductManagementScreen from './screens/ProductManagementScreen';
import AddProductScreen from './screens/AddProductScreen'; // 导入 AddProductScreen
import TestScannerScreen from './screens/TestScannerScreen';
import ProductListScreen from './screens/ProductListScreen'; 
import EditProductScreen from './screens/EditProductScreen';
import ShipProductScreen from './screens/ShipProductScreen';
import EditShipmentScreen from './screens/EditShipmentScreen';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white, padding: 20 }}>
          <Text style={styles.sectionTitle}>Welcome to the Home Screen</Text>
          <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  console.log("App 组件正在加载");
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Management" component={ManagementScreen} options={{ title: 'Management' }} />
        <Stack.Screen name="ProductManagement" component={ProductManagementScreen} options={{ title: 'Product Management' }} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Add Product' }} />
        <Stack.Screen name="TestScanner" component={TestScannerScreen} />
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="EditProduct" component={EditProductScreen} options={{ title: 'Edit Product' }} />
        <Stack.Screen name="ShipProduct" component={ShipProductScreen} />
        <Stack.Screen name="EditShipment" component={EditShipmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },
});
