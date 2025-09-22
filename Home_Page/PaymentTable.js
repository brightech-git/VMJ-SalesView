// PaymentTable.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from './HomeStyles';
import { formatIN } from '../server/rupees';

export default function PaymentTable({ cash, credit, debit, upi, Cheque }) {
  const total = cash + credit + debit + upi + Cheque;

  return (
    <View style={styles.table}>
      <View style={styles.headerRow}>
        <Text style={styles.firstCelll}>Method Of payment</Text>
        <Text style={styles.headerCelll}>Rupees(₹)</Text>
      </View>
      {[
        ['Cash', cash],
        ['Debit-Credit Card', credit],
        ['UPI',Cheque],
        ['Cheque', upi],
      ].map(([label, amount]) => (
        <View style={styles.headerRoww} key={label}>
          <Text style={styles.firstCelll}>{label}</Text>a
          <Text style={styles.headerCelll}>{formatIN(amount)}</Text>
        </View>
      ))}
      <View style={styles.headerRow}>
        <Text style={styles.firstCelll}>Total</Text>
        <Text style={styles.headerCelll}>{formatIN(total)}</Text>
      </View>
    </View>
  );
}
