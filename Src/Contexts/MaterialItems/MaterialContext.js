import { useState, useEffect } from 'react';
import { Api_Base_url2 } from '../../Config/Config';

export function useMaterialTableData({ startDate, endDate }) {
  const [goldWeight, setGoldWeight] = useState(0);
  const [oldGold, setOldGold] = useState(0);
  const [oldSilver, setOldSilver] = useState(0);
  const [silverWeight, setSilverWeight] = useState(0);
  const [goldStock, setGoldStock] = useState(0);
  const [silverStock, setSilverStock] = useState(0);
  const [stnCarat, setStnCarat] = useState(0);
  const [stnGram, setStnGram] = useState(0);
  const [stoneSummary, setStoneSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchAll = async () => {
      try {
        const [sales, oldGoldData, stockData, stoneData] = await Promise.all([
          fetch(`${Api_Base_url2}totalSalesWeight?startDate=${startDate}&endDate=${endDate}`).then(res => res.json()),
          fetch(`${Api_Base_url2}totalOldGoldPurchaseWeight?startDate=${startDate}&endDate=${endDate}`).then(res => res.json()),
          fetch(`${Api_Base_url2}totalStock`).then(res => res.json()),
          fetch(`${Api_Base_url2}stoneSummary?startDate=${startDate}&endDate=${endDate}`).then(res => res.json()),
        ]);

        if (!isMounted) return;

        // Sales
        let gold = 0, silver = 0;
        sales?.forEach(item => {
          if (item.Metal_ID === 'G') gold = parseFloat(item.TotalSales_Grswt || 0);
          if (item.Metal_ID === 'S') silver = parseFloat(item.TotalSales_Grswt || 0);
        });
        setGoldWeight(gold);
        setSilverWeight(silver);

        // Old Gold
        const goldOld = oldGoldData?.find(item => item.Metal_ID === 'G');
        const silverOld = oldGoldData?.find(item => item.Metal_ID === 'S');
        setOldGold(goldOld ? parseFloat(goldOld.TotalPurchase_Grswt || 0) : 0);
        setOldSilver(silverOld ? parseFloat(silverOld.TotalPurchase_Grswt || 0) : 0);

        // Stock
        const goldStockItem = stockData?.find(item => item.Metal_ID === 'G');
        const silverStockItem = stockData?.find(item => item.Metal_ID === 'S');
        setGoldStock(goldStockItem ? parseFloat(goldStockItem.Total_Grswt || 0) : 0);
        setSilverStock(silverStockItem ? parseFloat(silverStockItem.Total_Grswt || 0) : 0);

        // Stone
        const carat = stoneData?.find(item => item.stoneUnit === 'C');
        const gram = stoneData?.find(item => item.stoneUnit === 'G');
        setStnCarat(carat ? parseFloat(carat.stnwt || 0) : 0);
        setStnGram(gram ? parseFloat(gram.stnwt || 0) : 0);
        setStoneSummary(stoneData || []);
      } catch (error) {
        console.error('Error fetching material data:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAll();

    return () => {
      isMounted = false;
    };
  }, [startDate, endDate]);

  return {
    goldWeight,
    oldGold,
    oldSilver,
    silverWeight,
    goldStock,
    silverStock,
    stnCarat,
    stnGram,
    stoneSummary,
    loading,
  };
}

export async function getMaterialTableData({ startDate, endDate }) {
  try {
    const [sales, oldGoldData, stockData, stoneData] = await Promise.all([
      fetch(`${Api_Base_url2}totalSalesWeight?startDate=${startDate}&endDate=${endDate}`).then(res => res.json()),
      fetch(`${Api_Base_url2}totalOldGoldPurchaseWeight?startDate=${startDate}&endDate=${endDate}`).then(res => res.json()),
      fetch(`${Api_Base_url2}totalStock`).then(res => res.json()),
      fetch(`${Api_Base_url2}stoneSummary?startDate=${startDate}&endDate=${endDate}`).then(res => res.json()),
    ]);

    // Sales
    let goldWeight = 0, silverWeight = 0;
    sales?.forEach(item => {
      if (item.Metal_ID === 'G') goldWeight = parseFloat(item.TotalSales_Grswt || 0);
      if (item.Metal_ID === 'S') silverWeight = parseFloat(item.TotalSales_Grswt || 0);
    });

    // Old Gold
    const goldOld = oldGoldData?.find(item => item.Metal_ID === 'G');
    const silverOld = oldGoldData?.find(item => item.Metal_ID === 'S');
    const oldGold = goldOld ? parseFloat(goldOld.TotalPurchase_Grswt || 0) : 0;
    const oldSilver = silverOld ? parseFloat(silverOld.TotalPurchase_Grswt || 0) : 0;

    // Stock
    const goldStockItem = stockData?.find(item => item.Metal_ID === 'G');
    const silverStockItem = stockData?.find(item => item.Metal_ID === 'S');
    const goldStock = goldStockItem ? parseFloat(goldStockItem.Total_Grswt || 0) : 0;
    const silverStock = silverStockItem ? parseFloat(silverStockItem.Total_Grswt || 0) : 0;

    // Stones
    const carat = stoneData?.find(item => item.stoneUnit === 'C');
    const gram = stoneData?.find(item => item.stoneUnit === 'G');
    const stnCarat = carat ? parseFloat(carat.stnwt || 0) : 0;
    const stnGram = gram ? parseFloat(gram.stnwt || 0) : 0;

    return {
      goldWeight,
      silverWeight,
      oldGold,
      oldSilver,
      goldStock,
      silverStock,
      stnCarat,
      stnGram,
      stoneSummary: stoneData || [],
    };
  } catch (error) {
    console.error('❌ Error fetching material data:', error);
    return {
      goldWeight: 0,
      silverWeight: 0,
      oldGold: 0,
      oldSilver: 0,
      goldStock: 0,
      silverStock: 0,
      stnCarat: 0,
      stnGram: 0,
      stoneSummary: [],
    };
  }
}