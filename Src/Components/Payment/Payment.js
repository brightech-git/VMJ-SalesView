import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet, I18nManager } from "react-native";
import { usePaymentData } from "../../Contexts/Payment/PaymentContext";
import { formatIN } from "../../Config/Rupees";
import { CostCentreContext } from "../../Contexts/CostCenter/CostCenterContext";

export default function PaymentItemCard({ costId, startDate, endDate, onData }) {
  const { cash, credit, chequeAndUPI, total } = usePaymentData({
    costId,
    startDate,
    endDate,
  });
  const { getCostName } = useContext(CostCentreContext);

  useEffect(() => {
    if (onData) {
      onData({ cash, credit, chequeAndUPI, total });
    }
  }, [cash, credit, chequeAndUPI, total]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Payment Summary</Text>
      <View style={styles.table}>
        <View style={styles.rowHeader}>
          <Text style={styles.cellHeader}>Mode</Text>
          <Text style={styles.cellHeader}>Amount (₹)</Text>
        </View>
        {[
          ["Cash", cash],
          ["Credit/Debit Card", credit],
          ["Cheque/UPI", chequeAndUPI],
        ].map(([label, value]) => (
          <View key={label} style={styles.row}>
            <Text style={styles.cellLabel}>{label}</Text>
            <Text style={styles.cellValue}>{formatIN(value)}</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={[styles.cellLabel, styles.boldText]}>Total</Text>
          <Text style={[styles.cellValue, styles.boldText]}>
            {formatIN(total)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  title: {
    backgroundColor: "#C0C0C0",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 12,
    color: "#222",
  },
  table: {
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  rowHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  totalRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#999",
    backgroundColor: "#f9f9f9",
  },
  cellHeader: {
    flex: 1,
    fontWeight: "600",
    textAlign: "center",
    color: "#555",
    fontSize: 15,
  },
  cellLabel: {
    flex: 1,
    textAlign: I18nManager.isRTL ? "right" : "left",
    paddingHorizontal: 8,
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },
  cellValue: {
    flex: 1,
    textAlign: I18nManager.isRTL ? "left" : "right",
    paddingHorizontal: 8,
    color: "#333",
    fontSize: 13,
  },
  boldText: {
    fontWeight: "bold",
  },
});
