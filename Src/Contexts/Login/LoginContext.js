// src/Contexts/LoginContext.js
import { useState, useEffect, useRef } from "react";
import { Animated, Easing, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api_Base_url } from "../../Config/Config";
import { verticalScale } from "../../Utills/scaling";

export const useLogin = (navigation) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(verticalScale(30))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${Api_Base_url}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernameOrEmail: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok && data.token) {
        // Save token and user info to AsyncStorage
        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem("userData", JSON.stringify(data));

        navigation.navigate("VerifyMpin", {
          user: data.username,
          token: data.token,
        });
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials or unauthorized user");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    handleLogin,
    fadeAnim,
    slideAnim,
  };
};
