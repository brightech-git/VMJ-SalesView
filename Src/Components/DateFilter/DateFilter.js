import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { FontFamily, FontSize, Border } from '../../Utills/Global_Styles';
import { colors } from '../../Utills/colors';
import MultiCostDropdown from '../MultiCostDropdown/MultiCostDropdown'; 
export default function DateFilter({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isStartPickerVisible,
  setStartPickerVisible,
  isEndPickerVisible,
  setEndPickerVisible,
}) {
  const handleStartChange = (event, selectedDate) => {
    setStartPickerVisible(false);
    if (selectedDate) {
      const isoDate = selectedDate.toISOString().split('T')[0];
      setStartDate(isoDate);

      // ✅ Auto-adjust end date if it's before new start date
      if (new Date(isoDate) > new Date(endDate)) {
        setEndDate(isoDate);
      }
    }
  };

  const handleEndChange = (event, selectedDate) => {
    setEndPickerVisible(false);
    if (selectedDate) {
      setEndDate(selectedDate.toISOString().split('T')[0]);
    }
  };

  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Date Range Section */}
        <View style={styles.dateRangeContainer}>
          <View style={styles.dateBlock}>
            <TouchableOpacity
              onPress={() => setStartPickerVisible(true)}
              style={styles.dateInput}
              activeOpacity={0.8}
            >
              <Icon name="calendar-today" size={18} color={colors.primaryGold} />
              <Text style={styles.dateText}>{formatDisplayDate(startDate)}</Text>
            </TouchableOpacity>
          </View>

          <Icon
            name="arrow-forward-ios"
            size={16}
            color={colors.fontThirdColor}
            style={styles.arrow}
          />

          <View style={styles.dateBlock}>
            <TouchableOpacity
              onPress={() => setEndPickerVisible(true)}
              style={styles.dateInput}
              activeOpacity={0.8}
            >
              <Icon name="calendar-today" size={18} color={colors.primaryGold} />
              <Text style={styles.dateText}>{formatDisplayDate(endDate)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Date Pickers */}
      {isStartPickerVisible && (
        <DateTimePicker
          value={new Date(startDate)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleStartChange}
          themeVariant="light"
          maximumDate={new Date()} // ✅ restrict to today or earlier
        />
      )}

      {isEndPickerVisible && (
        <DateTimePicker
          value={new Date(endDate)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleEndChange}
          themeVariant="light"
          minimumDate={new Date(startDate)} // ✅ cannot pick before start date
          maximumDate={new Date()} // ✅ cannot pick after today
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateBlock: {
    flex: 1,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primaryGold,
    borderRadius: Border.br_md,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  dateText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.gilroySemiBold,
    color: colors.fontMainColor,
    marginLeft: 10,
  },
  arrow: {
    paddingHorizontal: 10,
  },
});
