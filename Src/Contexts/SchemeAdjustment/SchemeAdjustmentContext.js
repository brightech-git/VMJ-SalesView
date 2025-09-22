import { useState, useEffect } from "react";
import { Api_Base_url } from "../../Config/Config";

// React Hook — For UI Components
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
      const res = await fetch(`${Api_Base_url}${costId}collection?startDate=${startDate}&endDate=${endDate}&costId=${costId}`);
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
      const res = await fetch(`${Api_Base_url}${costId}AdjustmentWeightAmount?startDate=${startDate}&endDate=${endDate}&costId=${costId}`);
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
      const res = await fetch(`${Api_Base_url}${costId}SchemeAdjustment?startDate=${startDate}&endDate=${endDate}`);
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

// Pure Function — For External Use (e.g. PDF)
export async function getSchemeSummaryData({ startDate, endDate, costId }) {
  try {
    const [adjustmentRes, collectionRes, schemeRes] = await Promise.all([
      fetch(`${Api_Base_url}${costId}AdjustmentWeightAmount?startDate=${startDate}&endDate=${endDate}&costId=${costId}`),
      fetch(`${Api_Base_url}${costId}collection?startDate=${startDate}&endDate=${endDate}&costId=${costId}`),
      fetch(`${Api_Base_url}${costId}SchemeAdjustment?startDate=${startDate}&endDate=${endDate}&costId=${costId}`),
    ]);

    const adjustment = await adjustmentRes.json();
    const collection = await collectionRes.json();
    const scheme = await schemeRes.json();

    return {
      adjustmentAmount: adjustment?.ADJAMOUNT || 0,
      adjustmentWeight: adjustment?.ADJWEIGHT || 0,
      collectionAmount: collection?.COLLECTIONAMOUNT || 0,
      collectionWeight: collection?.COLLECTIONWEIGHT || 0,
      schemeAmount: scheme?.Amount || 0,
    };
  } catch (error) {
    console.error("Scheme Summary Fetch Error:", error);
    return {
      adjustmentAmount: 0,
      adjustmentWeight: 0,
      collectionAmount: 0,
      collectionWeight: 0,
      schemeAmount: 0,
    };
  }
}
