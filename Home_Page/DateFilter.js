import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './HomeStyles';

export default function DateFilter({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onApply,
  isStartPickerVisible,
  setStartPickerVisible,
  isEndPickerVisible,
  setEndPickerVisible
}) {
  const handleStartChange = (event, selectedDate) => {
    setStartPickerVisible(Platform.OS === 'ios'); // iOS keeps it open, Android closes
    if (selectedDate) {
      setStartDate(selectedDate.toISOString().split('T')[0]);
    }
  };

  const handleEndChange = (event, selectedDate) => {
    setEndPickerVisible(Platform.OS === 'ios');
    if (selectedDate) {
      setEndDate(selectedDate.toISOString().split('T')[0]);
    }
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      {/* Start Date */}
      <TouchableOpacity onPress={() => setStartPickerVisible(true)} style={styles.input}>
        <Text>{startDate}</Text>
      </TouchableOpacity>

      <Text style={{ marginHorizontal: 5 }}>TO</Text>

      {/* End Date */}
      <TouchableOpacity onPress={() => setEndPickerVisible(true)} style={styles.input}>
        <Text>{endDate}</Text>
      </TouchableOpacity>

      {/* Apply Button */}
      <TouchableOpacity
        onPress={onApply}
        style={{
          backgroundColor: '#333',
          padding: 10,
          marginLeft: 10,
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center',
          width: '25%',
        }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Apply</Text>
      </TouchableOpacity>

      {/* Start Date Picker */}
      {isStartPickerVisible && (
        <DateTimePicker
          value={new Date(startDate)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleStartChange}
        />
      )}

      {/* End Date Picker */}
      {isEndPickerVisible && (
        <DateTimePicker
          value={new Date(endDate)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleEndChange}
        />
      )}
    </View>
  );
}
