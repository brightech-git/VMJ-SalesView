import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity, Alert,
  SafeAreaView, ScrollView
} from 'react-native';

import DateFilter from './DateFilter';
import { Api_Base_url } from '../server/config';
import { Rate } from '../server/config';
import styles from './HomeStyles';
import CancelBillTable from './CancelBill';
import PaymentTable from './PaymentTable';
import MaterialTable from './MaterialTable';
import Header from './Header';
import RateSection from './RateSection';
import SummaryTable from './SummaryTable';
import SchemeCollections from './SchemeCollection';
import FooterScreen from './BTS';
export default function Home({ route, navigation }) {
  const [goldRate, setGoldRate] = useState(0);
  const [silverRate, setSilverRate] = useState(0);
  const [goldStock, setGoldStock] = useState(0);
  const [silverStock, setSilverStock] = useState(0);
const today = new Date();
const formattedToday = today.toISOString().split('T')[0]; // 'YYYY-MM-DD'
  const [company, setcompany] = useState(0);
const [startDate, setStartDate] = useState(formattedToday);
const [endDate, setEndDate] = useState(formattedToday);
  const [goldWeight, setGoldWeight] = useState(0);
  const [Oldgold, setOldGold] = useState(0);
  const [OldSilver, setOldSilver] = useState(0);
  const [silverWeight, setSilverWeight] = useState(0);
  const[schemecash,setSchemeCash]=useState(0);
  const[schemecard,setSchemeCard]=useState(0);
  const[stncarat,setstncarat]=useState(0);
  const[stngram,setstngram]=useState(0);
  const[schemeupi,setSchemeUpi]=useState(0);
  const [cash, setCash] = useState(0);
  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);
  const [upi, setupi] = useState(0);
  const [Cheque, setCheque] = useState(0);
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [showCancelTable, setShowCancelTable] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [summary, setSummary] = useState({});
  const value={schemecash,schemecard,schemeupi}
  const total = cash + credit + upi + debit + Cheque;

  useEffect(() => {
    getRates();
    fetchTotalStock();
    getcompany();
    fetchTotalStock();
    fetchSalesWeight();
    fetchOldGold();
    fetchCash();
    fetchCredit();
    fetchCheque();
    fetchupi();
    fetchSummary();
    fetchScheme();
        fetchstone();
  }, []);

  const handleApply = () => {
    if (!startDate || !endDate) {
      alert('Please enter both dates');
      return;
    }
    setShowCancelTable(true);
    fetchSalesWeight();
    fetchOldGold();
    fetchCash();
    fetchCredit();
    fetchCheque();
    fetchupi();
    getRates();
    fetchSummary();
    fetchScheme();
    fetchstone();
  };

  const fetchOldGold = async () => {
    try {
      const url = `${Api_Base_url}totalOldGoldPurchaseWeight?startDate=${startDate}&endDate=${endDate}`;
      const response = await fetch(url);
      const data = await response.json();

      const gold = data.find(item => item.Metal_ID === 'G');
      const silver = data.find(item => item.Metal_ID === 'S');

      setOldGold(gold ? parseFloat(gold.TotalPurchase_Grswt) : 0);
      setOldSilver(silver ? parseFloat(silver.TotalPurchase_Grswt) : 0);
    } catch (error) {
      console.error('Error fetching old gold/silver:', error);
      setOldGold(0);
      setOldSilver(0);
    }
  };
const fetchstone = async () => {
  try {
    const url = `${Api_Base_url}stoneSummary?startDate=${startDate}&endDate=${endDate}`;
    const response = await fetch(url);
    const data = await response.json();

    const stncarat = data.find(item => item.stoneUnit === "C");
    const stngram = data.find(item => item.stoneUnit === "G");

    setstncarat(stncarat ? parseFloat(stncarat.stnwt) : 0);
    setstngram(stngram ? parseFloat(stngram.stnwt) : 0);


  } catch (error) {
    console.error('Error fetching stone summary:', error);
    setstncarat(0);
    setstngram(0);
  }
};
  const fetchScheme = async () => {
  try {
    const url = `${Api_Base_url}paymentSummary?startDate=${startDate}&endDate=${endDate}&costId=FL`;
    const response = await fetch(url);
    const result = await response.json();
 // 🧪 Log it to verify the structure

    const data = Array.isArray(result) ? result : result?.data || [];

    let schemecash = 0;
    let schemecard = 0;
    let schemeupi = 0;

    data.forEach(item => {
      const mode = (item.paymode || item.Paymode || '').toUpperCase();

      if (mode === 'CASH') schemecash = parseFloat(item.amount || 0);
      else if (mode === 'CARD') schemecard = parseFloat(item.amount || 0);
      else if (mode === 'UPI') schemeupi = parseFloat(item.amount || 0);
    });

    setSchemeCash(schemecash);
    setSchemeCard(schemecard);
    setSchemeUpi(schemeupi);
  } catch (error) {
    console.error('Error fetching scheme:', error);
    setSchemeCash(0);
    setSchemeCard(0);
    setSchemeUpi(0);
  }
};

  const fetchCash = async () => {
    try {
      const url = `${Api_Base_url}totalCash?startDate=${startDate}&endDate=${endDate}`;
      const response = await fetch(url);
      const data = await response.json();
      setCash(data?.[0]?.Total_Cash || 0);

    } catch (error) {
      console.error('Error fetching cash:', error);
      setCash(0);
    }
  };

  const fetchCredit = async () => {
    try {
      const url = `${Api_Base_url}totalCreditCardBill?startDate=${startDate}&endDate=${endDate}`;
      const response = await fetch(url);
      const data = await response.json();
      setCredit(data?.[0]?.CreditCard_Bill || 0);
    } catch (error) {
      console.error('Error fetching credit:', error);
      setCredit(0);
    }
  };


  const fetchCheque = async () => {
    try {
      const url = `${Api_Base_url}totalChequeAndUPI?startDate=${startDate}&endDate=${endDate}`;
      const response = await fetch(url);
      const data = await response.json();
      setCheque(data?.total_Cheque_and_UPI || 0);
    } catch (error) {
      console.error('Error fetching cheque:', error);
      setCheque(0);
    }
  };

  const fetchupi = async () => {
    try {
      const url = `${Api_Base_url}totalupi?startDate=${startDate}&endDate=${endDate}`;
      const response = await fetch(url);
      const data = await response.json();
      setupi(data?.[0]?.CreditCard_Bill || 0);
    } catch (error) {
      console.error('Error fetching upi:', error);
      setupi(0);
    }
  };
    const getcompany = async () => {
    try {
      const url = `${Api_Base_url}companyNames`;
      const response = await fetch(url);
      const data = await response.json();
      const compan= data?.[0]?.COMPANYNAME
      setcompany(compan);
      console.log(company)
    } catch (error) {
      console.error('Error company:', error);
    }
    console.log(company)
  };


  const getRates = async () => {
    try {
      const url = `${Api_Base_url}rates`;
      const response = await fetch(url);
      const data = await response.json();
      setGoldRate(data.G || 0);
      setSilverRate(data.S || 0);
    } catch (error) {
      console.error('Error fetching rates:', error);
      setGoldRate(0);
      setSilverRate(0);
    }
  };
useEffect(() => {
  const timeout = setTimeout(() => {
    console.log('✅ Running all initial functions after 1 second...');

  }, 100); // 1000 ms = 1 second

  return () => clearTimeout(timeout); // Cleanup on unmount
}, []);
useEffect(() => {
  let isMounted = true;

  getRates();

  const interval = setInterval(() => {
    if (isMounted) {
      getRates();
    }
  }, 1000); // 10 seconds = 10000 milliseconds
  return () => {
    isMounted = false;
    clearInterval(interval);
  };

}, []);


  const fetchSalesWeight = async () => {
    try {
      const url = `${Api_Base_url}totalSalesWeight?startDate=${startDate}&endDate=${endDate}`;
      const response = await fetch(url);
      const data = await response.json();

      let gold = 0;
      let silver = 0;

      data.forEach(item => {
        if (item.Metal_ID === 'G') gold = parseFloat(item.TotalSales_Grswt);
        else if (item.Metal_ID === 'S') silver = parseFloat(item.TotalSales_Grswt);
      });

      setGoldWeight(gold);
      setSilverWeight(silver);
    } catch (error) {
      console.error('Error fetching sales weight:', error);
      setGoldWeight(0);
      setSilverWeight(0);
    }
  };

  const fetchTotalStock = async () => {
    try {
      const response = await fetch(`${Api_Base_url}totalStock`);
      const data = await response.json();

      const gold = data.find(item => item.Metal_ID === 'G');
      const silver = data.find(item => item.Metal_ID === 'S');

      setGoldStock(gold ? parseFloat(gold.Total_Grswt) : 0);
      setSilverStock(silver ? parseFloat(silver.Total_Grswt) : 0);
    } catch (error) {
      console.error('Error fetching total stock:', error);
      setGoldStock(0);
      setSilverStock(0);
    }

  };
    const fetchSummary = async () => {
  try {
    const response = await fetch(`${Api_Base_url}summary?startDate=${startDate}&endDate=${endDate}`);
    const data = await response.json();
    setSummary(data);
  } catch (error) {
    console.error('Error fetching summary:', error);
    setSummary({});
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <Header onProfilePress={() => setPopupVisible(true)}
        company={company}/>
        <ScrollView>
      <RateSection goldRate={goldRate} silverRate={silverRate} />
      <DateFilter
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onApply={handleApply}
        isStartPickerVisible={isStartPickerVisible}
        setStartPickerVisible={setStartPickerVisible}
        isEndPickerVisible={isEndPickerVisible}
        setEndPickerVisible={setEndPickerVisible}
      />

      <MaterialTable
        goldWeight={goldWeight}
        Oldgold={Oldgold}
        goldStock={goldStock}
        silverWeight={silverWeight}
        OldSilver={OldSilver}
        silverStock={silverStock}
        stncarat={stncarat}
        stngram={stngram}
      />

      <PaymentTable
        cash={cash}
        credit={credit}
        debit={debit}
        upi={upi}
        Cheque={Cheque}
      />
      <SummaryTable summary={summary} />   {/* ✅ New component here */}
      <SchemeCollections value={value}/>

        <CancelBillTable startDate={startDate} endDate={endDate} />
      </ScrollView>
      
    <FooterScreen/>
    </SafeAreaView>
  );
}
