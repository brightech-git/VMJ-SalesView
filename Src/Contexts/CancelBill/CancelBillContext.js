import { useEffect, useState } from "react";
import { Api_Base_url2 } from "../../Config/Config";

// ✅ Hook to fetch cancel bill data (no costId)
export function useCancelBillData({ startDate, endDate }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchCancelBills = async () => {
      if (!startDate || !endDate) return;
      try {
        const url = `${Api_Base_url2}billCancel?startDate=${startDate}&endDate=${endDate}`;
        const response = await fetch(url);
        const json = await response.json();

        // console.log("✅ Cancel Bill API Response:", json); // 👉 LOG HERE

        if (isMounted) {
          setData(Array.isArray(json) ? json : []);
        }
      } catch (error) {
        console.error(`❌ Error fetching cancel bills:`, error);
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
  }, [startDate, endDate]);

  return { data, loading };
}

// ✅ Non-hook version (for background/export use)
export async function getCancelBillData({ startDate, endDate }) {
  try {
    const url = `${Api_Base_url2}billCancel?startDate=${startDate}&endDate=${endDate}`;
    const response = await fetch(url);
    const json = await response.json();

    // console.log("📦 getCancelBillData response:", json); // 👉 LOG HERE

    return Array.isArray(json) ? json : [];
  } catch (error) {
    console.error(`❌ Error fetching cancel bills:`, error);
    return [];
  }
}
