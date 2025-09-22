// ✅ File: Components/Summary/SummaryItemCard.js
import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSummaryData } from '../../Contexts/Summary/SummaryContext';

import { formatIN } from "../../Config/Rupees";

export default function SummaryItemCard({  startDate, endDate, onData }) {
  const { TotalEstimate, TotalBilled, TotalPending } = useSummaryData({
    startDate,
    endDate,
  });



  useEffect(() => {
    if (onData) {
      onData({
        totalEstimate: TotalEstimate,
        billedEstimate: TotalBilled,
        pendingEstimate: TotalPending,
      });
    }
  }, [TotalEstimate, TotalBilled, TotalPending]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Estimation Summary</Text>

      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.cell1}>Total Estimate</Text>
          <Text style={styles.cell1}>Billed Est</Text>
          <Text style={styles.cell1}>Pending Est</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.cell}>{formatIN(TotalEstimate)}</Text>
          <Text style={styles.cell}>{formatIN(TotalBilled)}</Text>
          <Text style={styles.cell}>{formatIN(TotalPending)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    backgroundColor: "#C0C0C0",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 12,
    color: "#222",
    letterSpacing: 0.5,
  },
  table: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
  },
  cell1: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
    fontWeight: "bold",
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
  },
});
