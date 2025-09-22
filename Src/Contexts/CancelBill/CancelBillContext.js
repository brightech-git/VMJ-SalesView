// Contexts/CancelBill/useCancelBillData.js
import { useEffect, useState } from 'react';
import { Api_Base_url } from '../../Config/Config';

// ✅ 1. React Hook for real-time cancel bill data (UI components)
export function useCancelBillData({ startDate, endDate, costId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchCancelBills = async () => {
      if (!startDate || !endDate || !costId) return;
      try {
        const url = `${Api_Base_url}${costId}BillCancel?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
        const response = await fetch(url);
        const json = await response.json();
        if (isMounted) {
          setData(Array.isArray(json) ? json : []);
        }
      } catch (error) {
        console.error(`Error fetching cancel bills for ${costId}:`, error);
        if (isMounted) setData([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCancelBills();
    const interval = setInterval(fetchCancelBills, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [startDate, endDate, costId]);

  return { data, loading };
}

// ✅ 2. Non-hook function for direct use (e.g., PDF generation)
export async function getCancelBillData({ startDate, endDate, costId }) {
  try {
    const url = `${Api_Base_url}${costId}BillCancel?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
    const response = await fetch(url);
    const json = await response.json();
    return Array.isArray(json) ? json : [];
  } catch (error) {
    console.error(`Error fetching cancel bills for ${costId}:`, error);
    return [];
  }
}
