// HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import MultiCostDropdown from "../../Components/MultiCostDropdown/MultiCostDropdown";
import MaterialTableItem from "../../Components/MaterialItem/MaterialItem";
import DateFilter from "../../Components/DateFilter/DateFilter";
import PaymentItemCard from "../../Components/Payment/Payment";
import RateSection from "../../Components/Rates/Rate";
import SchemeItemCard from "../../Components/Scheme/Scheme";
import SummaryItemCard from "../../Components/Summary/Summary";
import SchemeSummaryCard from "../../Components/SchemeAdjustment/SchemeAdjustment";
import CancelBillItem from "../../Components/CancelBill/CancelBill";
import Header from "../../Components/Header/Header";
import FooterScreen from "../../Components/Footer/Footer";
import Marquee from "../../Components/Rates/Marquee";
// import { generatePDFReport } from "../../Utills/GeneratePdf";

export default function HomeScreen() {
  const [selectedCostIds, setSelectedCostIds] = useState([]);
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-05-31");
  const [reportData, setReportData] = useState({});
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  const uniqueCostIds = Array.from(
    new Map(selectedCostIds.map((item) => [item.id ?? item, item])).values()
  );

  useEffect(() => {
    if (selectedCostIds.length > 0) {
      const today = new Date().toISOString().split("T")[0];
      setStartDate(today);
      setEndDate(today);

      const sampleData = {};
      selectedCostIds.forEach((item) => {
        const id = item.id ?? item;
        sampleData[id] = {};
      });
      setReportData(sampleData);
    }
  }, [selectedCostIds]);

  // const handlePrint = () => {
  //   generatePDFReport({
  //     startDate,
  //     endDate,
  //     costIds: uniqueCostIds.map((item) => ({
  //       id: item.id ?? item,
  //       name: item.name ?? `Cost Centre ${item.id ?? item}`,
  //     })),
  //   });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
      <ScrollView>
        <Marquee/>
      <View
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >       
        {/* <View style={styles.Print}>
          <TouchableOpacity style={styles.printButton} onPress={handlePrint}>
            <Text style={styles.printButtonText}>📄 Export Report (PDF)</Text>
          </TouchableOpacity>
        </View> */}

        {/* <RateSection /> */}
        
        <MultiCostDropdown onApply={setSelectedCostIds} />
        <DateFilter
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          isStartPickerVisible={isStartPickerVisible}
          setStartPickerVisible={setStartPickerVisible}
          isEndPickerVisible={isEndPickerVisible}
          setEndPickerVisible={setEndPickerVisible}
          // onPrintPress={handlePrint} // <-- add this
        />

        {uniqueCostIds.length === 0 ? (
          <Text style={styles.infoText}>
            Please select cost centres to view data.
          </Text>
        ) : (
          <>
            {uniqueCostIds.map((cost, index) => (
              <MaterialTableItem
                key={`mat_${cost.id}_${index}`}
                costId={cost.id}
                startDate={startDate}
                endDate={endDate}
              />
            ))}
            {uniqueCostIds.map((cost, index) => (
              <PaymentItemCard
                key={`pay_${cost.id}_${index}`}
                costId={cost.id}
                startDate={startDate}
                endDate={endDate}
              />
            ))}
            {uniqueCostIds.map((cost, index) => (
              <SchemeItemCard
                key={`sch_${cost.id}_${index}`}
                costId={cost.id}
                startDate={startDate}
                endDate={endDate}
              />
            ))}
            {uniqueCostIds.map((cost, index) => (
              <SummaryItemCard
                key={`sum_${cost.id}_${index}`}
                costId={cost.id}
                startDate={startDate}
                endDate={endDate}
              />
            ))}
            
            {uniqueCostIds.map((cost, index) => (
              <CancelBillItem
                key={`can_${cost.id}_${index}`}
                costId={cost.id}
                startDate={startDate}
                endDate={endDate}
              />
            ))}
            {uniqueCostIds.map((cost, index) => (
              <SchemeSummaryCard
                key={`ss_${cost.id}_${index}`}
                costId={cost.id}
                startDate={startDate}
                endDate={endDate}
                onData={(data) => {
                  setReportData((prev) => ({
                    ...prev,
                    [cost.id]: {
                      ...prev[cost.id],
                      schemeSummary: data,
                    },
                  }));
                }}
              />
            ))}
          </>
        )}
        </View>
      </ScrollView>

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
  scrollContent: {
    paddingTop: 65,
    paddingBottom: 60,
    paddingHorizontal: 9,
  },
  infoText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
  Print: {
    marginTop: -20,
    marginBottom: 10,
    alignItems: "center",
  },
  printButton: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#d4af37",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 200,
    alignItems: "center",
  },
  printButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 0.5,
  },
});
