// components/MultiCostDropdown/MultiCostDropdownStyles.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  dropdownButton: {
    width: '60%',
    alignSelf: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff8e1',
    borderRadius: 12,
    borderColor: '#d4af37',
    borderWidth: 1,
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 15,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b4e16',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6b4e16',
  },
  closeButton: {
    fontSize: 22,
    color: '#888',
    paddingHorizontal: 6,
  },
  selectAllButton: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  selectAllText: {
    color: '#d4af37',
    fontWeight: '600',
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  box: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#d4af37',
    borderRadius: 6,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#d4af37',
  },
  tick: {
    color: '#fff',
    fontSize: 14,
  },
  label: {
    fontSize: 16,
    color: '#444',
  },
  applyButton: {
    marginTop: 20,
    backgroundColor: '#d4af37',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  applyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
