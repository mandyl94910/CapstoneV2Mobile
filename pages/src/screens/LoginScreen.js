// client/src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const LoginScreen = () => {
  const [username, setUsername] = useState('AdminChris');
  const [password, setPassword] = useState('securepassword123');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      console.log("Attempting to log in with:", { username, password });
      const response = await axios.post(`${REACT_APP_API_URL}/api/account/login`, {
        username,
        password,
      });
      console.log("Response:", response);
      if (response.status === 200) {
        navigation.navigate('Management');
      }
    } catch (error) {
      console.log("Login error:", error.response ? error.response.data : error.message);
      Alert.alert("Login Failed", "Invalid credentials or server error.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
         <TouchableOpacity
          onPress={() => setPasswordVisible(!isPasswordVisible)}
        >
          <MaterialIcons
            name={isPasswordVisible ? 'visibility' : 'visibility-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
    marginBottom: 50,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    fontSize: 18,
    height: 48,
    width: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    height: 48,
  },
  button: {
    backgroundColor: '#0099EE', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: 'center',
    width: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default LoginScreen;
