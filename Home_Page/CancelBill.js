import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Api_Base_url } from '../server/config';

const CancelBillTable = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCancelBills = async () => {
    if (!startDate || !endDate) return;
    try {
      const url = `${Api_Base_url}billCancel?startDate=${startDate}&endDate=${endDate}`;
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error fetching cancel bills:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCancelBills();
  }, [startDate, endDate]);

  const renderHeader = () => (
    <View>
     <View style={[styles.row, styles.headerRow]}>
      <Text style={[styles.cell, styles.headerCell]}>CANCELLED BILL LIST</Text>
    </View>
    <View style={[styles.row, styles.headerRow]}>
      <Text style={[styles.cell, styles.headerCell]}>Date</Text>
      <Text style={[styles.cell, styles.headerCell]}>Tranno</Text>
      <Text style={[styles.cell, styles.headerCell]}>Net Wt</Text>
      <Text style={[styles.cell, styles.headerCell]}>Amount</Text>
      <Text style={[styles.cell, styles.headerCell]}>User</Text>
    </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.TRANDATE}</Text>
      <Text style={styles.cell}>{item.TRANNO}</Text>
      <Text style={styles.cell}>{item.NETWT.toFixed(3)}</Text>
      <Text style={styles.cell}>₹{item.AMOUNT.toFixed(2)}</Text>
      <Text style={styles.cell}>{item.USERNAME}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="blue" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
<FlatList
  data={data}
  scrollEnabled={false} // ✅ disable internal scroll
  renderItem={renderItem}
  keyExtractor={(item, index) => index.toString()}
  ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No records found</Text>}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  headerRow: {
    backgroundColor: 'rgb(211, 211, 211)',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  headerCell: {
    color: 'rgb(0, 0, 0)',
    fontWeight: 'bold',
  },
});

export default CancelBillTable;
