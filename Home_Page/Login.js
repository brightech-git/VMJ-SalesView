import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import icon from '../assets/icon.png';
import { Api_Base_url } from '../server/config'; // Adjust the path as needed
import { UserName } from '../server/config'
import { Password } from '../server/config'
import FooterScreen from './BTS';
export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');

  const getCompanyName = async () => {
    try {
      const url = `${Api_Base_url}companyNames`;
      const response = await fetch(url);
      const data = await response.json();

      // Assuming your data is like: [{ COMPANYNAME: "My Company" }]
      if (Array.isArray(data) && data.length > 0 && data[0].COMPANYNAME) {
        setCompanyName(data[0].COMPANYNAME);
      } else {
        setCompanyName('Company'); // fallback
      }
    } catch (error) {
      console.error('Error fetching company:', error);
      setCompanyName('Company'); // fallback
    }
  };

  useEffect(() => {
    getCompanyName();
  }, []);

  const handleLogin = () => {
    if (username === UserName && password === Password) {
      navigation.navigate('Home', { user: username });
    } else {
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoiding}
      >
        <View style={styles.loginBox}>
          <Image source={icon} style={styles.logo} resizeMode="contain" />

          <Text style={styles.title}>{companyName}</Text> {/* Dynamic Title */}

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Alert.alert("Signup screen coming soon!")}>
            <Text style={styles.signupText}>
              Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <FooterScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  keyboardAvoiding: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
    width: 300,
    padding: 25,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
    borderRadius: 15
  },
  footer: {
    height: 20,
    backgroundColor: 'rgb(168, 213, 250)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    fontSize: 11,
    color: '#555'
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    color: '#000',
    backgroundColor: '#fdfdfd',
  },
  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    fontSize: 13,
    color: '#555',
    marginTop: 10,
  },
  linkText: {
    color: '#007bff',
    fontWeight: '600',
  },
});
