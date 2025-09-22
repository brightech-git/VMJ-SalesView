import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./MpinStyles";
import bgImage from '../../Assets/Images/logo.jpg';
import { Api_Base_url } from "../../Config/Config";
import AppHeader from "../../Components/Header/Header";
import FooterScreen from "../../Components/Footer/Footer";

const MPINCreationScreen = ({ navigation }) => {
  const [mpin, setMpin] = useState("");
  const [confirmMpin, setConfirmMpin] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [activeInput, setActiveInput] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const inputScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("userToken");
      if (storedToken) setToken(storedToken);
    };
    fetchToken();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleInputFocus = (inputName) => {
    setActiveInput(inputName);
    Animated.timing(inputScale, {
      toValue: 1.02,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleInputBlur = () => {
    setActiveInput(null);
    Animated.timing(inputScale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

const handleSubmit = async () => {
  if (mpin.length !== 4 || confirmMpin.length !== 4) {
    return Alert.alert("Error", "MPIN must be exactly 4 digits.");
  }

  if (mpin !== confirmMpin) {
    return Alert.alert("Error", "MPINs do not match.");
  }

  if (!token) {
    return Alert.alert("Error", "You must be logged in to create an MPIN.");
  }

  animateButtonPress();
  setLoading(true);

  try {
    console.log("Sending MPIN to backend...", mpin);

    const response = await fetch(
      `${Api_Base_url}create?mpin=${mpin}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseText = await response.text();
    console.log("Status:", response.status);
    console.log("Response Text:", responseText);

    if (response.status === 409) {
      // MPIN already exists
      Alert.alert(
        "Already Created",
        responseText || "MPIN already exists for your account.",
        [
          {
            text: "OK",
            onPress: () => navigation.replace("VerifyMpin"),
          },
        ]
      );
      return;
    }

    if (!response.ok) {
      throw new Error(responseText || "Failed to create MPIN.");
    }

    // MPIN successfully created
    await AsyncStorage.setItem("mpinVerified", "true");
    Alert.alert("Success", "MPIN created successfully.", [
      {
        text: "OK",
        onPress: () => navigation.replace("VerifyMpin"),
      },
    ]);
  } catch (error) {
    console.error("MPIN Error:", error);
    Alert.alert("Error", error.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};


  //   useEffect(() => {
  //   const checkIfAlreadyVerified = async () => {
  //     const verified = await AsyncStorage.getItem("mpinVerified");
  //     if (verified === "true") {
  //       navigation.replace("VerifyMpin");
  //     }
  //   };
  //   checkIfAlreadyVerified();
  // }, []);

 
   return (
  <View style={styles.container}>
    {/* Watermark Background */}
    {/* <ImageBackground 
      source={bgImage} 
      style={styles.backgroundImage}
      resizeMode="contain"
    /> */}
    <AppHeader />
    
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.header}>
            <Text style={styles.title}>Secure Your Account</Text>
            <Text style={styles.subtitle}>
              Create a 4-digit MPIN for quick access
            </Text>
          </View>

          <View style={styles.formContainer}>
            {/* MPIN Input */}
            <Animated.View
              style={[
                styles.inputContainer,
                {
                  transform: [
                    { scale: activeInput === "mpin" ? inputScale : 1 },
                  ],
                  borderColor:
                    activeInput === "mpin"
                      ? "#d4af37"
                      : "rgba(255,255,255,0.3)",
                },
              ]}
            >
              <Icon
                name="lock"
                size={24}
                color={
                  activeInput === "mpin" ? "#d4af37" : "rgba(216, 59, 59, 0.7)"
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Enter 4-digit MPIN"
                placeholderTextColor="rgb(128, 120, 120)"
                keyboardType="numeric"
                secureTextEntry
                maxLength={4}
                value={mpin}
                onChangeText={(text) => setMpin(text.replace(/[^0-9]/g, ""))}
                onFocus={() => handleInputFocus("mpin")}
                onBlur={handleInputBlur}
                selectionColor="#d4af37"
              />
              {mpin.length > 0 && (
                <View style={styles.digitCount}>
                  <Text style={styles.digitCountText}>{mpin.length}/4</Text>
                </View>
              )}
            </Animated.View>

            {/* Confirm MPIN Input */}
            <Animated.View
              style={[
                styles.inputContainer,
                {
                  transform: [
                    { scale: activeInput === "confirmMpin" ? inputScale : 1 },
                  ],
                  borderColor:
                    activeInput === "confirmMpin"
                      ? "#d4af37"
                      : "rgb(131, 121, 121)",
                },
              ]}
            >
              <Icon
                name="lock-outline"
                size={24}
                color={
                  activeInput === "confirmMpin"
                    ? "#d4af37"
                    : "rgba(219, 46, 46, 0.7)"
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm MPIN"
                placeholderTextColor="rgb(126, 122, 122)"
                keyboardType="numeric"
                secureTextEntry
                maxLength={4}
                value={confirmMpin}
                onChangeText={(text) =>
                  setConfirmMpin(text.replace(/[^0-9]/g, ""))
                }
                onFocus={() => handleInputFocus("confirmMpin")}
                onBlur={handleInputBlur}
                selectionColor="#d4af37"
              />
              {confirmMpin.length > 0 && (
                <View style={styles.digitCount}>
                  <Text style={styles.digitCountText}>
                    {confirmMpin.length}/4
                  </Text>
                </View>
              )}
            </Animated.View>

            {/* Button */}
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Create MPIN</Text>
                )}
              </TouchableOpacity>
            </Animated.View>

            {/* Already Have MPIN */}
            <TouchableOpacity
              style={styles.alreadyHaveContainer}
              onPress={() => navigation.navigate("VerifyMpin")}
            >
              <Text style={styles.alreadyHaveText}>Already have an MPIN?</Text>
              <Text style={styles.loginLink}> Verify Now</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
     </ScrollView>
    </KeyboardAvoidingView>
    <FooterScreen />
  </View>
);
};

export default MPINCreationScreen;
