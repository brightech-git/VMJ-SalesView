import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet,
  KeyboardAvoidingView,
  Animated,
  Platform,
  Easing,
  ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scale, verticalScale, moderateScale } from "../../Utills/scaling";
import { colors } from "../../Utills/colors";
import { FontFamily, FontSize } from "../../Utills/Global_Styles";
import { Api_Base_url } from "../../Config/Config";
import AppHeader from "../../Components/Header/Header";
import FooterScreen from "../../Components/Footer/Footer";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";

const ResetMpinScreen = () => {
  const [newMpin, setNewMpin] = useState("");
  const [confirmMpin, setConfirmMpin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const navigation=useNavigation()
  
  const buttonScale = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputScale = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  };

  const handleInputFocus = (inputName) => {
    setActiveInput(inputName);
    Animated.timing(inputScale, {
      toValue: 1.02,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  const handleInputBlur = () => {
    setActiveInput(null);
    Animated.timing(inputScale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  const handleResetMpin = async () => {
    if (newMpin.length !== 4 || confirmMpin.length !== 4) {
      Alert.alert("Invalid MPIN", "MPIN must be exactly 4 digits.");
      return;
    }

    if (newMpin !== confirmMpin) {
      Alert.alert("Error", "MPINs do not match.");
      return;
    }

    animatePress();
    setIsLoading(true);
    const token = await AsyncStorage.getItem("userToken");

    try {
      const response = await fetch(
        `${Api_Base_url}reset?newMpin=${encodeURIComponent(newMpin)}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const text = await response.text();

      if (response.ok) {
        Alert.alert("Success", "MPIN reset successfully!");        
        setNewMpin("");
        setConfirmMpin("");
        navigation.navigate("VerifyMpin")
      } else {
        Alert.alert("Error", text || "Failed to reset MPIN");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to reset MPIN. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AppHeader title="Reset MPIN" />
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Text style={styles.heading}>Reset Your MPIN</Text>
          <Text style={styles.subtitle}>Enter a new 4-digit MPIN for your account</Text>

          <View style={styles.card}>
            {/* New MPIN Input */}
            <Animated.View style={[
              styles.inputContainer, 
              activeInput === 'newMpin' && styles.activeInput,
              { transform: [{ scale: activeInput === 'newMpin' ? inputScale : 1 }] }
            ]}>
              <Icon 
                name="lock" 
                size={scale(22)} 
                color={activeInput === 'newMpin' ? colors.primaryGold : colors.grey}
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="New MPIN"
                placeholderTextColor={colors.grey}
                maxLength={4}
                keyboardType="number-pad"
                value={newMpin}
                onChangeText={setNewMpin}
                secureTextEntry
                onFocus={() => handleInputFocus('newMpin')}
                onBlur={handleInputBlur}
                selectionColor={colors.primaryGold}
              />
              {newMpin.length > 0 && (
                <Text style={styles.charCount}>{newMpin.length}/4</Text>
              )}
            </Animated.View>

            {/* Confirm MPIN Input */}
            <Animated.View style={[
              styles.inputContainer, 
              activeInput === 'confirmMpin' && styles.activeInput,
              { transform: [{ scale: activeInput === 'confirmMpin' ? inputScale : 1 }] }
            ]}>
              <Icon 
                name="lock-outline" 
                size={scale(22)} 
                color={activeInput === 'confirmMpin' ? colors.primaryGold : colors.grey}
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm MPIN"
                placeholderTextColor={colors.grey}
                maxLength={4}
                keyboardType="number-pad"
                value={confirmMpin}
                onChangeText={setConfirmMpin}
                secureTextEntry
                onFocus={() => handleInputFocus('confirmMpin')}
                onBlur={handleInputBlur}
                selectionColor={colors.primaryGold}
              />
              {confirmMpin.length > 0 && (
                <Text style={styles.charCount}>{confirmMpin.length}/4</Text>
              )}
            </Animated.View>

            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={[styles.button, (newMpin !== confirmMpin || newMpin.length !== 4) && styles.buttonInactive]}
                onPress={handleResetMpin}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={styles.buttonText}>Reset MPIN</Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
      <FooterScreen />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(100),
    // backgroundColor: colors.lightBackground,
  },
  content: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontFamily: FontFamily.bold,
    color: colors.primaryText,
    textAlign: "center",
    marginBottom: verticalScale(8),
    letterSpacing: moderateScale(0.3),
    fontWeight:"bold"
  },
  subtitle: {
    fontSize: 15,
    fontFamily: FontFamily.regular,
    color: colors.secondaryText,
    textAlign: "center",
    marginBottom: verticalScale(32),
    lineHeight: verticalScale(22),
    opacity: 0.8,
     fontWeight:"bold"
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(16),
    padding: scale(24),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(8),
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: moderateScale(1),
    borderColor: colors.inputBorder,
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(20),
    backgroundColor: colors.inputBackground,
  },
  activeInput: {
    borderColor: colors.primaryGold,
    shadowColor: colors.primaryGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  icon: {
    marginRight: scale(12),
  },
  input: {
    flex: 1,
    fontSize: FontSize.lg,
    fontFamily: FontFamily.medium,
    color: colors.primaryText,
    letterSpacing: moderateScale(4),
    paddingVertical: 0,
    includeFontPadding: false,
  },
  charCount: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.semiBold,
    color: colors.grey,
    marginLeft: scale(8),
    backgroundColor: colors.lightGrey,
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
  },
  button: {
    backgroundColor: colors.primaryGold,
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: colors.primaryGold,
    // shadowOffset: { width: 0, height: verticalScale(4) },
    // shadowOpacity: 0.3,
    // shadowRadius: moderateScale(6),
    // elevation: 4,
  },
  buttonInactive: {
    backgroundColor: colors.primaryGold,
    shadowColor: colors.grey,
  },
  buttonText: {
    color: colors.white,
    fontSize: FontSize.lg,
    fontFamily: FontFamily.semiBold,
    letterSpacing: moderateScale(0.3),
     fontWeight:"bold"
  },
});

export default ResetMpinScreen;