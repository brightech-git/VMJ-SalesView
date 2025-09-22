// ✅ File: Contexts/Summary/SummaryContext.js
import { useState, useEffect } from 'react';
import { Api_Base_url2 } from '../../Config/Config';

// ✅ 1. Hook for components
export function useSummaryData({ startDate, endDate }) {
  const [summary, setSummary] = useState({
    TotalEstimate: 0,
    TotalBilled: 0,
    TotalPending: 0,
  });

  useEffect(() => {
    let isMounted = true;
    console.log(startDate)

    const fetchSummary = async () => {
      try {
        const url = `${Api_Base_url2}summary?startDate=${startDate}&endDate=${endDate}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("SummaryCard",data)

        if (__DEV__) console.log("📊 Summary data", data);

        if (isMounted && data) {
          setSummary({
            TotalEstimate: data?.TotalEstimate || 0,
            TotalBilled: data?.TotalBilled || 0,
            TotalPending: data?.TotalPending || 0,
          });
        }
      } catch (error) {
        console.error("❌ Error fetching summary:", error);
        if (isMounted) {
          setSummary({
            TotalEstimate: 0,
            TotalBilled: 0,
            TotalPending: 0,
          });
        }
      }
    };

    fetchSummary();
    const interval = setInterval(fetchSummary, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [startDate, endDate]);

  return summary;
}

// ✅ 2. For non-UI async use
export async function getSummaryData({ startDate, endDate }) {
  try {
    const url = `${Api_Base_url2}summary?startDate=${startDate}&endDate=${endDate}`;
    const response = await fetch(url);
    const data = await response.json();

    return {
      TotalEstimate: data?.TotalEstimate || 0,
      TotalBilled: data?.TotalBilled || 0,
      TotalPending: data?.TotalPending || 0,
    };
  } catch (error) {
    console.error("❌ Error fetching summary:", error);
    return {
      TotalEstimate: 0,
      TotalBilled: 0,
      TotalPending: 0,
    };
  }
}
