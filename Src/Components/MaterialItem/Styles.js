// MaterialTableStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    marginVertical: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fffef9',
    borderRadius: 8,
    marginHorizontal: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    color: '#6b4e16',
  },
  table: {
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#d4af37',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  firstCell: {
    flex: 1,
    fontWeight: '600',
    color: '#333',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#444',
  },
  stoneCell: {
    fontSize: 12,
    color: '#d4af37',
    fontWeight: '600',
  },
});
