// src/components/BarcodeScanner.js
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useState,useEffect } from 'react';
import { View, Text ,TouchableOpacity, StyleSheet} from 'react-native';

const BarcodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  console.log(BarCodeScanner); // 测试模块是否正确加载

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>请求摄像头权限中...</Text>;
  }
  if (hasPermission === false) {
    return <Text>摄像头权限被拒绝</Text>;
  }

  return (
    <View style={styles.container}>
      {/* 叉号按钮，用于关闭摄像头 */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>

      {/* 条形码扫描器 */}
      <BarCodeScanner
        onBarCodeScanned={(scannedData) => {
          // 扫描到数据后，可以通过回调传递扫描结果并关闭摄像头
          onClose(scannedData.data);
        }}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: 20,
      left: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 20,
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
  });
  

export default BarcodeScanner;
