// ✅ File: Components/Scheme/SchemeItemCard.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSchemeData } from "../../Contexts/Scheme/SchemeContext";
import { formatIN } from "../../Config/Rupees";

export default function SchemeItemCard({ startDate, endDate, onData }) {
  const { schemeCash, schemeCard, schemeUpi } = useSchemeData({
    startDate,
    endDate,
  });

  useEffect(() => {
    if (onData) {
      onData({
        cash: schemeCash,
        card: schemeCard,
        upi: schemeUpi,
      });
    }
  }, [schemeCash, schemeCard, schemeUpi]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Scheme Payments</Text>

      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.fullCell}>PAYMENT MODE</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.cell1}>CASH</Text>
          <Text style={styles.cell1}>CARD</Text>
          <Text style={styles.cell1}>UPI</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.cell}>{formatIN(schemeCash)}</Text>
          <Text style={styles.cell}>{formatIN(schemeCard)}</Text>
          <Text style={styles.cell}>{formatIN(schemeUpi)}</Text>
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
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
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
    borderColor: "#ccc",
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerRow: {
    backgroundColor: "#f0f0f0",
  },
  fullCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    color: "#444",
  },
  cell1: {
    flex: 1,
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    color: "#333",
  },
});
