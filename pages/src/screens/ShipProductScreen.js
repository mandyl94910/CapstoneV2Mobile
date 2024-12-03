// src/screens/ShipProductScreen.js
import React, {useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect ,useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const ShipProductScreen = () => {
  const navigation = useNavigation();
  const [statusFilter, setStatusFilter] = useState('All');
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [orders, setOrders] = useState([]);

  // 获取所有订单数据
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/orders/all-orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders(); // 每次页面聚焦时获取订单数据
      setStatusFilter('All'); // 重置过滤器为 "All"
    }, [])
  );

  useEffect(() => {
    const filterOrders = () => {
      if (statusFilter === 'All') {
        setFilteredOrders(orders);
      } else {
        setFilteredOrders(orders.filter(order => order.status === statusFilter));
      }
    };
    filterOrders();
  }, [orders, statusFilter]);

  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };
  
  const handleOrderPress = (order) => {
    navigation.navigate('EditShipment', { order }); // Pass order details
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    // 获取日期部分
    const formattedDate = date.toISOString().split('T')[0]; // 提取 YYYY-MM-DD 格式
  
    // 获取时间部分
    // const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    // const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
  
    return `${formattedDate}`;
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FFA500'; // orange
      case 'completed':
        return '#4CAF50'; // green
      case 'shipped':
        return '#0099EE'; // blue
      case 'cancelled':
        return '#F44336'; // red
      default:
        return '#666'; // defaut gray
    }
  };

  const renderOrder = ({ item }) => (
    <TouchableOpacity style={styles.orderCard} onPress={() => handleOrderPress(item)}>
      <FontAwesome6 name="angle-right" size={20} color="#666" 
        style={{ 
          position: 'absolute', // 绝对定位
          top: 15, // 距离顶部 10 像素
          right: 15, // 距离右侧 10 像素
          zIndex: 1, // 确保图标位于卡片内容之上
        }}/>
      <Text style={styles.orderText}>
        <Text style={{fontWeight: 'bold'}}>Order ID: </Text>
        <Text style={{color: '#666'}}>{item.id}</Text>
      </Text>

      <Text style={styles.orderText}>
        <Text style={{fontWeight: 'bold'}}>Total: </Text>
        <Text style={{color: '#666'}}>${item.total}</Text>
      </Text>

      <Text style={styles.orderText}>
        <Text style={{fontWeight: 'bold'}}>Customer Name: </Text>
        <Text style={{color: '#666'}}>{item.customer_name}</Text>
      </Text>

      <Text style={styles.orderText}>
          <Text style={{fontWeight: 'bold'}}>Order Date: </Text>
          <Text style={{color: '#666'}}>{formatDate(item.order_date)}</Text>
      </Text>

      <Text style={styles.orderText}>
        <Text style={{fontWeight: 'bold'}}>Status: </Text>
        <Text style={{color: getStatusColor(item.status)}}>{item.status}</Text>
      </Text>

    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders to Ship</Text>

      {/* 状态过滤器 */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Status:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={statusFilter}
            style={styles.picker}
            onValueChange={(value) => handleStatusChange(value)}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Pending" value="pending" />
            <Picker.Item label="Shipped" value="shipped" />
            <Picker.Item label="Completed" value="completed" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f8f8f8',
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      fontWeight: 'bold',
      marginVertical: 20,
    },
    filterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      marginHorizontal: 15,
    },
    filterLabel: {
      fontSize: 16,
      marginRight: 10,
      fontWeight: 'bold',
    },
    pickerWrapper: {
      flex: 1,
      height: 48,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: '#fff',
      justifyContent: 'center',
      overflow: 'hidden', // 确保边框生效
    },
    picker: {
      // flex: 1,
      // height: 48,
      borderColor: '#ccc',
      // borderWidth: 1,
      // borderRadius: 5,
      backgroundColor:'#fff',
    },
    orderCard: {
      backgroundColor: '#fff',
      padding: 15,
      marginVertical: 10,
      marginHorizontal: 15,
      borderRadius: 10,
      shadowColor: '#777',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
    orderText: {
      fontSize: 16,
      marginBottom: 5,
    },
  });

export default ShipProductScreen;
