// ✅ File: Contexts/SchemeAdjustment/SchemeAdjustmentContext.js
import { useState, useEffect } from "react";
import { Api_Base_url2 } from "../../Config/Config";

export function useSchemeSummary({ startDate, endDate, costId }) {
  const [collectionAmount, setCollectionAmount] = useState(0);
  const [collectionWeight, setCollectionWeight] = useState(0);
  const [adjustmentAmount, setAdjustmentAmount] = useState(0);
  const [adjustmentWeight, setAdjustmentWeight] = useState(0);
  const [schemeAmount, setSchemeAmount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      await Promise.all([
        fetchCollection(),
        fetchAdjustment(),
        fetchScheme(),
      ]);
    };

    fetchAll();
    const interval = setInterval(() => isMounted && fetchAll(), 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [startDate, endDate, costId]);

  const fetchCollection = async () => {
    try {
      const url = `${Api_Base_url2}collection?startDate=${startDate}&endDate=${endDate}`;
      const res = await fetch(url);
      const data = await res.json();
      setCollectionAmount(data?.COLLECTIONAMOUNT || 0);
      setCollectionWeight(data?.COLLECTIONWEIGHT || 0);
    } catch {
      setCollectionAmount(0);
      setCollectionWeight(0);
    }
  };

  const fetchAdjustment = async () => {
    try {
      const url = `${Api_Base_url2}AdjustmentWeightAmount?startDate=${startDate}&endDate=${endDate}`;
      const res = await fetch(url);
      const data = await res.json();
      setAdjustmentAmount(data?.ADJAMOUNT || 0);
      setAdjustmentWeight(data?.ADJWEIGHT || 0);
    } catch {
      setAdjustmentAmount(0);
      setAdjustmentWeight(0);
    }
  };

  const fetchScheme = async () => {
    try {
      const url = `${Api_Base_url2}SchemeAdjustment?startDate=${startDate}&endDate=${endDate}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data)
      setSchemeAmount(data?.Amount || 0);
    } catch {
      setSchemeAmount(0);
    }
  };

  return {
    collectionAmount,
    collectionWeight,
    adjustmentAmount,
    adjustmentWeight,
    schemeAmount,
  };
}

export async function getSchemeSummaryData({ startDate, endDate }) {
  try {
    const [collectionRes, adjustmentRes, schemeRes] = await Promise.all([
      fetch(`${Api_Base_url2}collection?startDate=${startDate}&endDate=${endDate}`),
      fetch(`${Api_Base_url2}AdjustmentWeightAmount?startDate=${startDate}&endDate=${endDate}`),
      fetch(`${Api_Base_url2}SchemeAdjustment?startDate=${startDate}&endDate=${endDate}`),
    ]);

    const collection = await collectionRes.json();
    const adjustment = await adjustmentRes.json();
    const scheme = await schemeRes.json();

    return {
      collectionAmount: collection?.COLLECTIONAMOUNT || 0,
      collectionWeight: collection?.COLLECTIONWEIGHT || 0,
      adjustmentAmount: adjustment?.ADJAMOUNT || 0,
      adjustmentWeight: adjustment?.ADJWEIGHT || 0,
      schemeAmount: scheme?.Amount || 0,
    };
  } catch (error) {
    console.error("❌ Error in getSchemeSummaryData:", error);
    return {
      collectionAmount: 0,
      collectionWeight: 0,
      adjustmentAmount: 0,
      adjustmentWeight: 0,
      schemeAmount: 0,
    };
  }
}