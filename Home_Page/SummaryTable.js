import React from 'react';
import { View, Text } from 'react-native';
import styles from './HomeStyles';
import { formatINR } from '../server/rupees';

export default function SummaryTable({ summary }) {
  return (
    <View style={styles.table}>
      <View style={styles.headerRow}>
        <Text style={styles.firstCelll}>Total Estimate</Text>
        <Text style={styles.centercell}>Billed Est</Text>
        <Text style={styles.headerCelll}>Pending Est</Text>
      </View>
<View style={styles.headerRoww}>
        <Text style={styles.firstCelll}>{summary.TotalEstimate|| 0}</Text>
        <Text style={styles.centercell}>{summary.TotalBilled|| 0}</Text>
        <Text style={styles.headerCelll}>{summary.TotalPending|| 0} </Text>
      </View>
        </View>

  );
}