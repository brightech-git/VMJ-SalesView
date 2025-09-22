import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default function StoneDetailsTable() {
  const [showTable, setShowTable] = useState(false);
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  clickableText: {

    marginBottom: 10,
    fontSize: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    padding: 8,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});
  const stoneData = [
    { id: '1', unit: 'C', weight: 955.648, amount: 503283.71, pieces: 204 },
    { id: '2', unit: 'G', weight: 2.9, amount: 0.00, pieces: 1 },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowTable(!showTable)}>
        <Text style={styles.clickableText}>
          {showTable ? 'Hide Stone Details' : 'Show Stone Details'}
        </Text>
      </TouchableOpacity>

      {showTable && (
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.cell}>Unit</Text>
            <Text style={styles.cell}>Weight</Text>
            <Text style={styles.cell}>Amount</Text>
            <Text style={styles.cell}>Pieces</Text>
          </View>

          {stoneData.map(item => (
            <View key={item.id} style={styles.row}>
              <Text style={styles.cell}>{item.unit}</Text>
              <Text style={styles.cell}>{item.weight.toFixed(2)}</Text>
              <Text style={styles.cell}>₹{item.amount.toFixed(2)}</Text>
              <Text style={styles.cell}>{item.pieces}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
