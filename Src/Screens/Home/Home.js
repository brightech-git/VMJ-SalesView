import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import Header from "../../Components/Header/Header";
import RateSection from "../../Components/Rates/Rate";
import FooterScreen from "../../Components/Footer/Footer";
import DateFilter from "../../Components/DateFilter/DateFilter";
import MaterialTableItem from "../../Components/MaterialItem/MaterialItem";
import PaymentItemCard from "../../Components/Payment/Payment";
import SchemeItemCard from "../../Components/Scheme/Scheme";
import SummaryItemCard from "../../Components/Summary/Summary";
import SchemeSummaryCard from "../../Components/SchemeAdjustment/SchemeAdjustment";
import CancelBillItem from "../../Components/CancelBill/CancelBill";

// import { generatePDFReport } from "../../Utills/GeneratePdf";

// 🔹 Utility function to get today's date in YYYY-MM-DD
const getToday = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // "YYYY-MM-DD"
};

export default function HomeScreen() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  // Set default date on mount
  useEffect(() => {
    const today = getToday();
    setStartDate(today);
    setEndDate(today);
  }, []);

  // 🔸 Export PDF Handler
  const handlePrint = () => {
    generatePDFReport({ startDate, endDate });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Header />
      </View>

      {/* Rate Section */}
      <View style={styles.RateSection}>
        <RateSection />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Filter with PDF Export */}
        <DateFilter
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          isStartPickerVisible={isStartPickerVisible}
          setStartPickerVisible={setStartPickerVisible}
          isEndPickerVisible={isEndPickerVisible}
          setEndPickerVisible={setEndPickerVisible}
          // onPrintPress={handlePrint} // 🔹 Print button callback
        />

        {/* Summary Cards */}
        <MaterialTableItem startDate={startDate} endDate={endDate} />
        <PaymentItemCard startDate={startDate} endDate={endDate} />
        <SchemeItemCard startDate={startDate} endDate={endDate} />
        <SummaryItemCard startDate={startDate} endDate={endDate} />
        <SchemeSummaryCard startDate={startDate} endDate={endDate} />
        <CancelBillItem startDate={startDate} endDate={endDate} />
      </ScrollView>

      {/* Footer */}
      <FooterScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  RateSection: {
    marginTop: 60,
  },
  scrollContent: {
    paddingBottom: 60,
    paddingHorizontal: 16,
  },
});
