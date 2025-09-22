import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import styles from "./Styles";
import { CostCentreContext } from "../../Contexts/CostCenter/CostCenterContext";

const CustomCheckbox = ({ label, checked, onChange }) => (
  <TouchableOpacity
    style={styles.checkboxContainer}
    onPress={onChange}
    activeOpacity={0.7}
  >
    <View style={[styles.box, checked && styles.checkedBox]}>
      {checked && <Text style={styles.tick}>✔</Text>}
    </View>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

export default function MultiCostDropdown({ onApply }) {
  const { costCentres } = useContext(CostCentreContext);
  const [selectedIds, setSelectedIds] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (costCentres.length > 0) {
      const targetNames = ["THIRUTTANI", "THIRUVALLUR", "JNROAD"];
      const matched = costCentres
        .filter((item) => targetNames.includes(item.COSTNAME?.toUpperCase()))
        .map((item) => item.COSTID);

      setSelectedIds(matched);

      if (matched.length === 3 && onApply) {
        const formatted = costCentres
          .filter((item) => matched.includes(item.COSTID))
          .map(({ COSTID, COSTNAME }) => ({
            id: COSTID,
            name: COSTNAME,
          }));
        onApply(formatted);
      }
    }
  }, [costCentres]);

  const toggleSelection = (id) => {
    setSelectedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id];

      if (onApply) {
        const selectedItems = costCentres.filter((item) =>
          updated.includes(item.COSTID)
        );
        const formatted = selectedItems.map(({ COSTID, COSTNAME }) => ({
          id: COSTID,
          name: COSTNAME,
        }));
        onApply(formatted);
      }

      return updated;
    });
  };

  const handleSelectAll = () => {
    const allIds = costCentres.map((item) => item.COSTID);
    setSelectedIds(allIds);

    if (onApply) {
      const formatted = costCentres.map(({ COSTID, COSTNAME }) => ({
        id: COSTID,
        name: COSTNAME,
      }));
      onApply(formatted);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>
          {selectedIds.length > 0
            ? `${selectedIds.length} selected`
            : "Select Cost Centres"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Cost Centres</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleSelectAll}
              style={styles.selectAllButton}
            >
              <Text style={styles.selectAllText}>Select All</Text>
            </TouchableOpacity>

            <FlatList
              data={costCentres}
              keyExtractor={(item) => item.COSTID}
              renderItem={({ item }) => (
                <CustomCheckbox
                  label={item.COSTNAME}
                  checked={selectedIds.includes(item.COSTID)}
                  onChange={() => toggleSelection(item.COSTID)}
                />
              )}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
