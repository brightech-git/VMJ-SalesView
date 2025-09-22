import React from 'react';
import { View, Text } from 'react-native';
import styles from './HomeStyles';
import { formatIN } from '../server/rupees';

export default function SchemeCollections({value}) {
  return (
    <View style={styles.table}>
     <View style={[styles.row, styles.headerRow]}>
      <Text style={[styles.cell, styles.centercell]}>SCHEME PAYMENTS</Text>
    </View>
      <View style={styles.headerRow}>
        <Text style={styles.firstCelll}>CASH</Text>
        <Text style={styles.centercell}>CARD</Text>
        <Text style={styles.headerCelll}>UPI</Text>
      </View>
<View style={styles.headerRoww }>
        <Text style={styles.firstCelll}>{formatIN(value.schemecash|| 0)}</Text>
        <Text style={[styles.centercell]}>{formatIN(value.schemecard|| 0)}</Text>
        <Text style={styles.headerCellll}>{formatIN(value.schemeupi|| 0)} </Text>
      </View>
        </View>

  );
}