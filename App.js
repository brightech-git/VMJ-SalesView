import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from "./Src/Navigation/StackNavigator/StackNavigator"
import { SafeAreaView } from 'react-native-safe-area-context';
export default function App() {
  return (
   <SafeAreaView style={{ flex: 1}}>
    <View style={{ flex: 1 }}>
      <StackNavigator />
    </View>
    </SafeAreaView>
   
  );
}