import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function FooterScreen() {
  return (

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © Powered by BRIGHTECH SOFTWARE SOLUTIONS
        </Text>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  footer: {
    padding: 4,
    backgroundColor: '#1C1C1C',
    borderRadius: 3,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '6000',
    color: '#ffffff',
    textAlign: 'center',
    opacity:1
  },  header: {

    backgroundColor: '#1C1C1C',
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#000',
    textAlign: 'center',
  },
});