// ✅ File: Contexts/MaterialItems/MaterialTableFunctions.js
import { useState, useEffect } from 'react';
import { Api_Base_url } from '../../Config/Config';

// ✅ 1. React Hook — for UI Components
export function useMaterialTableData({ startDate, endDate, costId }) {
  const [goldWeight, setGoldWeight] = useState(0);
  const [Oldgold, setOldGold] = useState(0);
  const [OldSilver, setOldSilver] = useState(0);
  const [silverWeight, setSilverWeight] = useState(0);
  const [goldStock, setGoldStock] = useState(0);
  const [silverStock, setSilverStock] = useState(0);
  const [stncarat, setstncarat] = useState(0);
  const [stngram, setstngram] = useState(0);
  const [StoneSummary, setStoneSummary] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      await Promise.all([
        fetchSalesWeight(),
        fetchOldGold(),
        fetchTotalStock(),
        fetchStoneSummary()
      ]);
    };

    fetchAll();

    const interval = setInterval(() => {
      if (isMounted) fetchAll();
    }, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [startDate, endDate, costId]);

  const fetchSalesWeight = async () => {
    try {
      const url = `${Api_Base_url}${costId}TotalSalesWeight?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!Array.isArray(data)) return;

      let gold = 0, silver = 0;
      data.forEach(item => {
        if (item.Metal_ID === 'G') gold = parseFloat(item.TotalSales_Grswt || 0);
        if (item.Metal_ID === 'S') silver = parseFloat(item.TotalSales_Grswt || 0);
      });

      setGoldWeight(gold);
      setSilverWeight(silver);
    } catch (err) {
      console.error(`Error fetching sales weight for ${costId}:`, err);
    }
  };

  const fetchOldGold = async () => {
    try {
      const url = `${Api_Base_url}${costId}TotalOldGoldPurchaseWeight?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!Array.isArray(data)) return;

      const gold = data.find(item => item.Metal_ID === 'G');
      const silver = data.find(item => item.Metal_ID === 'S');

      setOldGold(gold ? parseFloat(gold.TotalPurchase_Grswt || 0) : 0);
      setOldSilver(silver ? parseFloat(silver.TotalPurchase_Grswt || 0) : 0);
    } catch (err) {
      console.error(`Error fetching old gold/silver for ${costId}:`, err);
    }
  };

  const fetchTotalStock = async () => {
    try {
      const url = `${Api_Base_url}${costId}TotalStock?costId=${costId}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!Array.isArray(data)) return;

      const gold = data.find(item => item.Metal_ID === 'G');
      const silver = data.find(item => item.Metal_ID === 'S');

      setGoldStock(gold ? parseFloat(gold.Total_Grswt || 0) : 0);
      setSilverStock(silver ? parseFloat(silver.Total_Grswt || 0) : 0);
    } catch (err) {
      console.error(`Error fetching stock for ${costId}:`, err);
    }
  };

  const fetchStoneSummary = async () => {
    try {
      const url = `${Api_Base_url}${costId}StoneSummary?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!Array.isArray(data)) return;

      const stncaratData = data.find(item => item.stoneUnit === 'C');
      const stngramData = data.find(item => item.stoneUnit === 'G');

      setstncarat(stncaratData ? parseFloat(stncaratData.stnwt || 0) : 0);
      setstngram(stngramData ? parseFloat(stngramData.stnwt || 0) : 0);
      setStoneSummary(data);
    } catch (err) {
      console.error(`Error fetching stone summary for ${costId}:`, err);
    }
  };

  return {
    goldWeight,
    Oldgold,
    OldSilver,
    silverWeight,
    goldStock,
    silverStock,
    stncarat,
    stngram,
    StoneSummary
  };
}

// ✅ 2. Pure function — for external use (e.g., PDF)
export const getMaterialTableData = async ({ startDate, endDate, costId }) => {
  const result = {
    goldWeight: 0,
    Oldgold: 0,
    OldSilver: 0,
    silverWeight: 0,
    goldStock: 0,
    silverStock: 0,
    stncarat: 0,
    stngram: 0,
    StoneSummary: [],
  };

  try {
    const salesUrl = `${Api_Base_url}${costId}TotalSalesWeight?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
    const salesRes = await fetch(salesUrl);
    const salesData = await salesRes.json();
    if (Array.isArray(salesData)) {
      salesData.forEach(item => {
        if (item.Metal_ID === 'G') result.goldWeight = parseFloat(item.TotalSales_Grswt || 0);
        if (item.Metal_ID === 'S') result.silverWeight = parseFloat(item.TotalSales_Grswt || 0);
      });
    }

    const oldGoldUrl = `${Api_Base_url}${costId}TotalOldGoldPurchaseWeight?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
    const oldGoldRes = await fetch(oldGoldUrl);
    const oldGoldData = await oldGoldRes.json();
    if (Array.isArray(oldGoldData)) {
      const gold = oldGoldData.find(item => item.Metal_ID === 'G');
      const silver = oldGoldData.find(item => item.Metal_ID === 'S');
      result.Oldgold = gold ? parseFloat(gold.TotalPurchase_Grswt || 0) : 0;
      result.OldSilver = silver ? parseFloat(silver.TotalPurchase_Grswt || 0) : 0;
    }

    const stockUrl = `${Api_Base_url}${costId}TotalStock?costId=${costId}`;
    const stockRes = await fetch(stockUrl);
    const stockData = await stockRes.json();
    if (Array.isArray(stockData)) {
      const gold = stockData.find(item => item.Metal_ID === 'G');
      const silver = stockData.find(item => item.Metal_ID === 'S');
      result.goldStock = gold ? parseFloat(gold.Total_Grswt || 0) : 0;
      result.silverStock = silver ? parseFloat(silver.Total_Grswt || 0) : 0;
    }

    const stoneUrl = `${Api_Base_url}${costId}StoneSummary?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
    const stoneRes = await fetch(stoneUrl);
    const stoneData = await stoneRes.json();
    if (Array.isArray(stoneData)) {
      const stncaratData = stoneData.find(item => item.stoneUnit === 'C');
      const stngramData = stoneData.find(item => item.stoneUnit === 'G');
      result.stncarat = stncaratData ? parseFloat(stncaratData.stnwt || 0) : 0;
      result.stngram = stngramData ? parseFloat(stngramData.stnwt || 0) : 0;
      result.StoneSummary = stoneData;
    }

  } catch (err) {
    console.error(`Error fetching material table data for ${costId}:`, err);
  }

  return result;
};
