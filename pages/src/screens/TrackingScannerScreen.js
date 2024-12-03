// TrackingScannerScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation, useRoute } from '@react-navigation/native';

const TrackingScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // 检查权限状态
  if (hasPermission === null) {
    return <Text>Requesting camera permissions...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Camera permission denied. Please enable camera access in device settings.</Text>;
  }

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    const previousScreen = route.params?.previousScreen || 'AddTracking'; // 获取调用页面的名称
    navigation.navigate(previousScreen, { 
        scannedData: data,
        order: route.params?.order // 将 order 传回 EditShipmentScreen
      }); // 动态返回调用页面并传递条形码数据
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[
          BarCodeScanner.Constants.BarCodeType.code128,
          BarCodeScanner.Constants.BarCodeType.code39,
        ]}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.buttonText}>点击重新扫描</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#0099CC',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TrackingScannerScreen;
