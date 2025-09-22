import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  I18nManager,
  Animated,
} from "react-native";
import { formatINR } from "../../Config/Rupees";
import { useMaterialTableData } from "../../Contexts/MaterialItems/MaterialContext";
import { CostCentreContext } from "../../Contexts/CostCenter/CostCenterContext";

export default function MaterialTableItem({ costId, startDate, endDate, onData }) {
  const {
    goldWeight,
    Oldgold,
    OldSilver,
    silverWeight,
    goldStock,
    silverStock,
    stncarat,
    stngram,
    StoneSummary,
  } = useMaterialTableData({ startDate, endDate, costId });

  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(20))[0];
  const { getCostName } = useContext(CostCentreContext);

  useEffect(() => {
    if (onData) {
      onData({
        materials: [
          {
            material: "Gold",
            sales: goldWeight,
            purchase: Oldgold,
            stock: goldStock,
          },
          {
            material: "Silver",
            sales: silverWeight,
            purchase: OldSilver,
            stock: silverStock,
          },
        ],
        stoneExtras: {
          stncarat,
          stngram,
          StoneSummary,
        },
      });
    }
  }, [goldWeight, Oldgold, silverWeight, OldSilver, goldStock, silverStock]);

  const showModal = () => setModalVisible(true);

  const hideModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 20,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setModalVisible(false));
  };

  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [modalVisible]);

  return (
    <View style={styles.table}>
      <Text style={styles.heading}>{getCostName(costId)}</Text>

      <View style={styles.headerRow}>
        <View style={styles.leftCell}>
          <Text style={styles.headerCell1}>Material</Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.headerCell}>Sales (G)</Text>
          <Text style={styles.headerCell}>Purchase</Text>
          <Text style={styles.headerCell}>Stock (G)</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.leftCell}>
          <Text style={styles.firstCelll}>Gold</Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.centercell}>
            {formatINR(goldWeight)}
            {(stncarat !== 0 || stngram !== 0) && (
              <TouchableOpacity onPress={showModal}>
                {stncarat !== 0 && (
                  <Text style={styles.colorcell}> +{formatINR(stncarat)}C</Text>
                )}
                {stngram !== 0 && (
                  <Text style={styles.colorcell}> +{formatINR(stngram)}G</Text>
                )}
              </TouchableOpacity>
            )}
          </Text>
          <Text style={styles.centercell}>{formatINR(Oldgold)}</Text>
          <Text style={styles.centercell}>{formatINR(goldStock)}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.leftCell}>
          <Text style={styles.firstCelll}>Silver</Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.centercell}>{formatINR(silverWeight)}</Text>
          <Text style={styles.centercell}>{formatINR(OldSilver)}</Text>
          <Text style={styles.centercell}>{formatINR(silverStock)}</Text>
        </View>
      </View>

      <Modal transparent visible={modalVisible} animationType="none">
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalBox,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.modalTitle}>Stone Weight Summary</Text>

            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.cell, styles.headerText]}>Stone Unit</Text>
              <Text style={[styles.cell, styles.headerText]}>Stone Pcs</Text>
              <Text style={[styles.cell, styles.headerText]}>Stone Wt</Text>
              <Text style={[styles.cell, styles.headerText]}>Stone Amt</Text>
            </View>

            {StoneSummary?.length > 0 ? (
              StoneSummary.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.cell}>{item.stoneUnit}</Text>
                  <Text style={styles.cell}>{item.stnpcs}</Text>
                  <Text style={styles.cell}>{formatINR(item.stnwt)}</Text>
                  <Text style={styles.cell}>{formatINR(item.stnamt)}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.modalText}>No stone data available.</Text>
            )}

            <TouchableOpacity style={styles.closeBtn} onPress={hideModal}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  table: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 10,
  },
  heading: {
    backgroundColor: "#C0C0C0",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 12,
    color: "#222",
    letterSpacing: 0.5,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  leftCell: {
    width: 73,
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  headerCell1: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#000",
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  rightSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  firstCelll: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
    textAlign: I18nManager.isRTL ? "right" : "left",
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: 60,
  },
  centercell: {
    flex: 1,
    fontWeight: "600",
    fontSize: 14,
    color: "#333",
    textAlign: I18nManager.isRTL ? "left" : "right",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  colorcell: {
    color: "#e60000",
    fontSize: 11.5,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: "#2c3e50",
    letterSpacing: 0.5,
  },
  modalText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0",
  },
  tableHeader: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#2c3e50",
    paddingBottom: 6,
    marginBottom: 10,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
    color: "#34495e",
  },
  headerText: {
    fontWeight: "700",
    color: "#2c3e50",
    fontSize: 14,
  },
  closeBtn: {
    backgroundColor: "#2c3e50",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 16,
  },
  closeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
