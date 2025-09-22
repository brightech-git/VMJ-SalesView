import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet, I18nManager } from "react-native";
import { usePaymentData } from "../../Contexts/Payment/PaymentContext";
import { formatIN } from "../../Config/Rupees";
import { useSchemeSummary } from "../../Contexts/SchemeAdjustment/SchemeAdjustmentContext";
import { CostCentreContext } from "../../Contexts/CostCenter/CostCenterContext";


export default function PaymentItemCard({ costId, startDate, endDate, onData }) {
  const { cash, credit, upi, cheque } = usePaymentData({
    costId,
    startDate,
    endDate,
  });

  const { getCostName } = useContext(CostCentreContext);

  // ✅ Call hook before using schemeAmount
  const { schemeAmount } = useSchemeSummary({
    costId,
    startDate,
    endDate,
  });

  // ✅ Safe total calculation
  const total = (cash || 0) + (credit || 0) + (upi || 0) + (cheque || 0) + (schemeAmount || 0);

  // ✅ Send all data at once
  useEffect(() => {
    if (onData) {
      onData({
        schemeAmount,
        cash,
        credit,
        upi,
        cheque,
      });
    }
  }, [schemeAmount, cash, credit, upi, cheque]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{getCostName(costId)}</Text>
      <View style={styles.table}>
        {/* Header */}
        <View style={styles.rowHeader}>
          <Text style={styles.cellHeader1}>Payment Mode</Text>
          <Text style={styles.cellHeader2}>Amount (₹)</Text>
        </View>

        {/* Rows (only show if > 0) */}
        {[
          ["Cash", cash],
          ["Credit/Debit Card", credit],
          ["Cheque", upi],
          ["Upi", cheque], 
          ["Scheme Adjust", schemeAmount]
        ]
          .filter(([_, value]) => (value || 0) > 0)
          .map(([label, value]) => (
            <View key={label} style={styles.row}>
              <Text style={styles.cellLabel}>{label}</Text>
              <Text style={styles.cellValue}>{formatIN(value)}</Text>
            </View>
          ))}

        {/* Total */}
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
    marginBottom: 2,
    padding: 12,
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
    letterSpacing: 0.5,
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
  cellHeader1: {
    flex: 1,
    fontWeight: "600",
    textAlign: "left",
    color: "#555",
    fontSize: 15,
  },
  cellHeader2: {
    flex: 1,
    fontWeight: "600",
    textAlign: "right",
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
