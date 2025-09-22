import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./VerifyMpinStyles";
import { useNavigation } from "@react-navigation/native";
import { Api_Base_url } from "../../Config/Config";
import AppHeader from "../../Components/Header/Header";
import FooterScreen from "../../Components/Footer/Footer";

// ✅ Your logo path (update this path if needed)
import logo from "../../Assets/Images/logo.jpg";

const MPINVerifyScreen = () => {
  const [enteredMpin, setEnteredMpin] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Failed to fetch token:", error);
      }
    };
    fetchToken();
  }, []);

  const handleSubmit = async () => {
    if (!enteredMpin) {
      Alert.alert("Error", "Please enter your MPIN.");
      return;
    }
    if (!token) {
      Alert.alert("Error", "You must be logged in to verify your MPIN.");
      return;
    }

    setLoading(true);
    console.log("Verifying MPIN:", enteredMpin);

    try {
      const url = `${Api_Base_url}verify?enteredMpin=${enteredMpin}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const rawText = await response.text();
      let data;
      try {
        data = JSON.parse(rawText);
      } catch {
        data = {
          success: response.ok,
          message: rawText || "Unexpected response.",
        };
      }

      console.log("API response:", data);

      if (response.ok && data.success) {
        Alert.alert("Success", data.message || "MPIN verified successfully.");
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", data.message || "Failed to verify MPIN.");
      }
    } catch (err) {
      console.error("Network / parse error:", err);
      Alert.alert(
        "Error",
        "A network error occurred. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppHeader />
      <View style={styles.container}>
        {/* ✅ Logo added here */}
        <Image
          source={logo}
          style={{ width: 120, height: 120, resizeMode: "contain", alignSelf: "center", marginBottom: 10,marginTop:-150,borderRadius:60 }}
        />

        <Text style={styles.title}>Verify Your MPIN</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter MPIN"
          placeholderTextColor="black"
          secureTextEntry
          keyboardType="numeric"
          value={enteredMpin}
          onChangeText={(text) => {
            const numericText = text.replace(/\D/g, "").slice(0, 6);
            setEnteredMpin(numericText);
          }}
          maxLength={6}
        />

        <View style={styles.forgotContainer}>
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("ResetMpin")}
          >
            Forgot MPIN
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            (loading || enteredMpin.length < 4) && styles.buttonLoading,
          ]}
          onPress={handleSubmit}
          disabled={loading || enteredMpin.length < 4}
        >
          <Text style={styles.buttonText}>
            {loading ? "Verifying..." : "Verify MPIN"}
          </Text>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <Text style={styles.linkText1}>Don't have an MPIN?</Text>
          <Text
            style={styles.linkText2}
            onPress={() => navigation.navigate("Mpin")}
          >
            Click here
          </Text>
        </View>
      </View>
      <FooterScreen />
    </>
  );
};

export default MPINVerifyScreen;
