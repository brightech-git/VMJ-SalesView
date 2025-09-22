import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

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
  footer: {
    position: 'absolute',         // 📌 Fixed position
    bottom: 0,                    // Stick to bottom
    left: 0,
    right: 0,
    height: 35,
    backgroundColor: '#1C1C1C',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
    paddingBottom: Platform.OS === 'ios' ? 6 : 0, // adjust for iOS safe area
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
