import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet, I18nManager } from "react-native";
import { useSchemeSummary } from "../../Contexts/SchemeAdjustment/SchemeAdjustmentContext";
import { formatIN } from "../../Config/Rupees";
import { colors } from "../../Utills/colors";
import { FontFamily, FontSize } from "../../Utills/Global_Styles";
import { CostCentreContext } from "../../Contexts/CostCenter/CostCenterContext";

export default function SchemeSummaryCard({
  costId,
  startDate,
  endDate,
  onData,
}) {
  const {
    collectionAmount,
    collectionWeight,
    adjustmentAmount,
    adjustmentWeight,
    schemeAmount,
  } = useSchemeSummary({ startDate, endDate, costId });
  const { getCostName } = useContext(CostCentreContext);

  useEffect(() => {
    if (onData) {
      onData({
        collectionAmount,
        collectionWeight,
        adjustmentAmount,
        adjustmentWeight,
        schemeAmount,
      });
    }
  }, [
    collectionAmount,
    collectionWeight,
    adjustmentAmount,
    adjustmentWeight,
    schemeAmount,
  ]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{getCostName(costId)}</Text>

      <View style={styles.table}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Metric</Text>
          <Text style={styles.headerCell}>Value</Text>
        </View>

        {[
          { label: "Collection Amount", value: formatIN(collectionAmount) },
          { label: "Collection Weight", value: `${collectionWeight} g` },
          { label: "Adjustment Amount", value: formatIN(adjustmentAmount) },
          { label: "Adjustment Weight", value: `${adjustmentWeight} g` },
          {
            label: "Scheme Adjustment",
            value: formatIN(schemeAmount),
            bold: true,
          },
        ].map(({ label, value, bold }, idx) => (
          <View key={idx} style={styles.dataRow}>
            <Text style={[styles.cellLabel, bold && styles.bold]}>{label}</Text>
            <Text style={[styles.cellValue, bold && styles.bold]}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
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
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  headerCell: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  dataRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  cellLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: "#333",
    textAlign: I18nManager.isRTL ? "right" : "left",
    paddingHorizontal: 4,
  },
  cellValue: {
    flex: 1,
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: "#222",
    textAlign: I18nManager.isRTL ? "left" : "right",
    paddingHorizontal: 4,
  },
  bold: {
    fontFamily: FontFamily.bold,
    fontWeight: "700",
  },
});
