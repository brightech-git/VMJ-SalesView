// src/Screens/Login/LoginScreen.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { useLogin } from "../../Contexts/Login/LoginContext";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./Styles";
import Header from "../../Components/Header/Header"
import FooterScreen from "../../Components/Footer/Footer";


const LoginScreen = ({ navigation }) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    handleLogin,
    fadeAnim,
    slideAnim,
  } = useLogin(navigation);

  return (
    <>
    <Header />
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: null })}
      style={styles.container}
    >
     
      <Animated.View
        style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Vairamaaligai Jewellers</Text>
          <Text style={styles.subtitle}>
            Sign in to access your exclusive jewelry collection
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={16} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email Or Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={18} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.9}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Sign In</Text>
              <Icon name="arrow-right" size={16} style={styles.buttonIcon} />
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.fingerprintButton}
          onPress={() => navigation.navigate("Fingerprint")}
        >
          <View style={styles.fingerprintCircle}>
            <MaterialCommunityIcons name="fingerprint" size={26} />
          </View>
          <Text style={styles.fingerprintText}>Use Fingerprint</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
    <FooterScreen />
    </>
  );
};

export default LoginScreen;
