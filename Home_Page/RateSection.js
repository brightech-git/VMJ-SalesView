// RateSection.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from './HomeStyles';

export default function RateSection({ goldRate, silverRate }) {
  return (
    <View style={styles.rateContainer}>
      <View style={styles.rateBox}>
        <Text style={styles.rateTitle}>Gold Rate:</Text>
        <Text style={styles.rateValue}>₹ {goldRate.toLocaleString()}</Text>
      </View>
      <View style={styles.rateBox}>
        <Text style={styles.rateTitle}>Silver Rate:</Text>
        <Text style={styles.rateValue}>₹ {silverRate.toLocaleString()}</Text>
      </View>
    </View>
  );
}

