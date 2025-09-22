import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContainer: { paddingBottom: 30 },
  header: {
    paddingTop: 15,
    backgroundColor: '#fff',
    height: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-between"

  },
  headerTitle: { fontSize: 16, color: '#000', fontWeight: 'bold',textAlign:'center'},

  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
    flexWrap: 'wrap'
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333',
    minWidth: 80
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#fff'
  },
  picker: {
    height: 50,
    width: '100%'
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height * 0.45,
    
    top: 200,
    left: 0,
    opacity: 0.1, // 🔍 40% transparency
    zIndex: 1,   // Push image to background
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  applyContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 10
  },
  applyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'flex-start'
  },
  information: { color: 'red', paddingHorizontal: 20 },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15
  },


  rateContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 10 },
  rateBox: { backgroundColor: '#e6f0ff', padding: 10, borderRadius: 8, width: '45%', alignItems: 'center' },
  rateTitle: { fontSize: 14, fontWeight: 'bold', color: '#0056b3' },
  rateValue: { fontSize: 16, fontWeight: '600', marginTop: 4 },

  table: { marginHorizontal: 15, marginBottom: 12, backgroundColor: '#fff', borderRadius: 6, overflow: 'hidden' },
  headerRow: { flexDirection: 'row', backgroundColor: '#ddd', },
  heading: { fontWeight: 'bold', fontSize: 16, },
  heading1: { flex: 1, padding: 8, paddingLeft: 120, backgroundColor: '#C0C0C0' },
  headerRoww: { flexDirection: 'row' }, headerCel: { flex: 1.1, padding: 8, fontWeight: 'bold', textAlign: 'right', color: '#333',fontSize:12 },
  headerCell: { flex: 1, padding: 8, fontWeight: 'bold', textAlign: 'left', color: '#333',fontSize:12 },
  headerCel2: { flex: 1, padding: 8, fontWeight: 'bold', textAlign: 'right', color: '#333',fontSize:12 },
  headerCelll: { flex: 1, padding: 8, fontWeight: 'bold', textAlign: 'right', color: '#333', marginRight: 5,fontSize:12 },
  headerCellll: { flex: 1, padding: 8, fontWeight: 'bold', textAlign: 'right', color: '#333', marginRight: 0 ,fontSize:12},
  firstCell: { flex: 1.1, padding: 8, textAlign: 'left' },
  firstCelll: { flex: 1.1, padding: 8, textAlign: 'left', fontWeight: 'bold' ,fontSize:12},
  centercell: { flex: 1, padding: 8, textAlign: 'center', fontWeight: 'bold' ,fontSize:12},
  row: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#eee' },
  cell: { flex: 1, padding: 10, textAlign: 'right', marginRight: 5 },

  footer: { height: 20, backgroundColor: 'rgb(168, 213, 250)', justifyContent: 'center', alignItems: 'center' },
  footerText: { fontSize: 11, color: '#555' },
  colorcell:{color: 'rgb(255, 2, 2)',fontSize:13},
  modalBg: { flex: 1, alignItems: 'flex-end', justifyContent: 'flex-start', paddingTop: 60, paddingRight: 20, backgroundColor: 'rgba(0,0,0,0.1)' },
  popupBox: { width: 180, backgroundColor: '#fff', padding: 15, borderRadius: 12, alignItems: 'center', elevation: 5 },
  popupUsername: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  logoutButton: { backgroundColor: '#dc3545', padding: 8, paddingHorizontal: 16, borderRadius: 6 },
  logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 10,
    height: 40,
    marginLeft: 10,
    marginRight: 10
  }
});
