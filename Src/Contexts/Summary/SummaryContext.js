import { useState, useEffect } from 'react';
import { Api_Base_url } from '../../Config/Config';

// ✅ 1. React Hook for real-time data in components
export function useSummaryData({ startDate, endDate, costId }) {
  const [summary, setSummary] = useState({
    TotalEstimate: 0,
    TotalBilled: 0,
    TotalPending: 0,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchSummary = async () => {
      try {
        const url = `${Api_Base_url}${costId}Summary?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
        const response = await fetch(url);
        const data = await response.json();

        if (isMounted && data) {
          setSummary({
            TotalEstimate: data.TotalEstimate || 0,
            TotalBilled: data.TotalBilled || 0,
            TotalPending: data.TotalPending || 0,
          });
        }
      } catch (error) {
        console.error(`Error fetching summary for ${costId}:`, error);
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
  }, [startDate, endDate, costId]);

  return summary;
}

// ✅ 2. Pure async function for use in non-UI files like PDF report
export async function getSummaryData({ startDate, endDate, costId }) {
  try {
    const url = `${Api_Base_url}${costId}Summary?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
    const response = await fetch(url);
    const data = await response.json();

    return {
      TotalEstimate: data?.TotalEstimate || 0,
      TotalBilled: data?.TotalBilled || 0,
      TotalPending: data?.TotalPending || 0,
    };
  } catch (error) {
    console.error(`Error fetching summary for ${costId}:`, error);
    return {
      TotalEstimate: 0,
      TotalBilled: 0,
      TotalPending: 0,
    };
  }
}
