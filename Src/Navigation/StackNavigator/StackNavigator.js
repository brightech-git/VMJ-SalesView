import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Screens
import HomeScreen from "../../Screens/Home/Home";
import OnboardingScreen from "../../Screens/Onboard/OnboardScreen";
import LoginScreen from "../../Screens/Login/Login";
import Mpin from "../../Screens/Mpin/Mpin";
import VerifyMpin from "../../Screens/VerifyMpin/VerifyMpin";
import ResetMpinScreen from "../../Screens/Reset/ResetMpin";

//Components
import SchemeAdjustment from "../../Components/SchemeAdjustment/SchemeAdjustment"

// Context
import { CostCentreProvider } from "../../Contexts/CostCenter/CostCenterContext";
// import { SchemeSummaryProvider } from "../../Contexts/SchemeAdjustment/SchemeAdjustmentContext";

// Stack
const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);

useEffect(() => {
  const checkLaunchStatus = async () => {
    try {
      // await AsyncStorage.removeItem("isFirstLaunch");
      // await AsyncStorage.removeItem("mpinVerified");
      // await AsyncStorage.removeItem("mpinCreated");

      const isFirstLaunch = await AsyncStorage.getItem("isFirstLaunch");
      const mpinCreated = await AsyncStorage.getItem("mpinCreated"); // store when MPIN is created
      const mpinVerified = await AsyncStorage.getItem("mpinVerified"); // store when MPIN is verified

      if (isFirstLaunch === null) {
        // First launch ever → Onboarding
        await AsyncStorage.setItem("isFirstLaunch", "false");
        setInitialRoute("Onboarding");
      } else if (!mpinCreated) {
        // No MPIN created yet → go to Login
        setInitialRoute("Login");
      } else if (mpinCreated && mpinVerified !== "true") {
        // MPIN exists but not verified → Verify MPIN
        setInitialRoute("VerifyMpin");
      } else if (mpinCreated && mpinVerified === "true") {
        // MPIN created and verified → Home
        setInitialRoute("Home");
      } else {
        // Fallback
        setInitialRoute("Login");
      }
    } catch (error) {
      console.error("Launch check error:", error);
      setInitialRoute("Login"); // Fallback
    }
  };

  checkLaunchStatus();
}, []);
  if (!initialRoute) return null; // or show Splash screen

  return (
    <NavigationContainer>
      <CostCentreProvider>
        {/* <SchemeSummaryProvider> */}
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Mpin"
            component={Mpin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VerifyMpin"
            component={VerifyMpin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SchemeAdjustment"
            component={SchemeAdjustment}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        {/* </SchemeSummaryProvider> */}
      </CostCentreProvider>
    </NavigationContainer>
  );
}
