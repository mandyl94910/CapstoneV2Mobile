// src/screens/ShipProductScreen.js
import React, {useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect ,useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';

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



  const renderOrder = ({ item }) => (
    <TouchableOpacity style={styles.orderCard} onPress={() => handleOrderPress(item)}>
      <Text style={styles.orderText}>Order ID: {item.id}</Text>
      <Text style={styles.orderText}>Total: {item.total}</Text>
      <Text style={styles.orderText}>Customer Name: {item.customer_name}</Text>
      <Text style={styles.orderText}>Order Date: {item.order_date}</Text>
      <Text style={styles.orderText}>Status: {item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders to Ship</Text>

      {/* 状态过滤器 */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Status:</Text>
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
      marginVertical: 10,
    },
    filterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    filterLabel: {
      fontSize: 16,
      marginRight: 10,
    },
    picker: {
      flex: 1,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
    },
    orderCard: {
      backgroundColor: '#fff',
      padding: 15,
      marginVertical: 10,
      borderRadius: 10,
      shadowColor: '#000',
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
