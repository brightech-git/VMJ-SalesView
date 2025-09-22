import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';


import LoginScreen from './Home_Page/Login'; // Make sure this path is correct
import Home from './Home_Page/Home'; // Make sure this path is correct
import StoneDetailsTable from './Home_Page/try';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={Home} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}