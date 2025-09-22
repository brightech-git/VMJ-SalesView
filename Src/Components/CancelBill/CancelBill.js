import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  I18nManager,
} from "react-native";
import { useCancelBillData } from "../../Contexts/CancelBill/CancelBillContext";

export default function CancelBillItem({ startDate, endDate, onData }) {
  const { data, loading } = useCancelBillData({ startDate, endDate });

  useEffect(() => {
    if (onData && Array.isArray(data)) {
      onData({ data });
    }
  }, [data]);

  const renderHeader = () => (
    <View>
      <Text style={styles.sectionTitle}>Cancelled Bills</Text>
      <View style={[styles.row, styles.headerRow]}>
        <Text style={styles.cell1}>Date</Text>
        <Text style={styles.cell1}>Tranno</Text>
        <Text style={styles.cell1}>Net Wt</Text>
        <Text style={styles.cell1}>Amount</Text>
        <Text style={styles.cell1}>User</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.TRANDATE}</Text>
      <Text style={styles.cell}>{item.TRANNO}</Text>
      <Text style={styles.cell}>{parseFloat(item.NETWT || 0).toFixed(3)}</Text>
      <Text style={styles.cell}>₹{parseFloat(item.AMOUNT || 0).toFixed(2)}</Text>
      <Text style={styles.cell}>{item.USERNAME}</Text>
    </View>
  );

  if (loading) {
    return (
      <ActivityIndicator size="large" color="blue" style={{ marginTop: 30 }} />
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={data}
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          `${item.TRANNO || "no-tran"}-${index}`
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No cancelled bills found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
    padding: 10,
  },
  sectionTitle: {
    backgroundColor: "#C0C0C0",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 12,
    color: "#222",
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  headerRow: {
    backgroundColor: "#f1f1f1",
  },
  cell1: {
    flex: 1,
    fontSize: 14,
    textAlign: "center",
    color: "#333",
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
    fontWeight: "bold",
  },
  cell: {
    flex: 1,
    fontSize: 12,
    textAlign: "center",
    color: "#333",
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
    fontWeight: "bold",
  },
});
