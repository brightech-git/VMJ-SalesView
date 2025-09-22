// ✅ File: Contexts/Scheme/SchemeContext.js
import { useState, useEffect } from "react";
import { Api_Base_url2 } from "../../Config/Config";

// ✅ React Hook — for UI components
export function useSchemeData({ startDate, endDate }) {
  const [schemeCash, setSchemeCash] = useState(0);
  const [schemeCard, setSchemeCard] = useState(0);
  const [schemeUpi, setSchemeUpi] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchScheme = async () => {
      try {
        const url = `${Api_Base_url2}paymentSummary?startDate=${startDate}&endDate=${endDate}`;
        const res = await fetch(url);
        const result = await res.json();

        console.log("✅ Scheme API response:", result);

        if (Array.isArray(result)) {
          let cash = 0, card = 0, upi = 0;
          result.forEach(item => {
            const mode = (item?.paymode || "").toUpperCase();
            const amt = parseFloat(item?.amount || 0);
            if (mode === "CASH") cash += amt;
            else if (mode === "CARD") card += amt;
            else if (mode === "UPI") upi += amt;
          });

          if (isMounted) {
            setSchemeCash(cash);
            setSchemeCard(card);
            setSchemeUpi(upi);
          }
        } else {
          console.warn("⚠️ Scheme API returned non-array:", result);
        }
      } catch (error) {
        console.error("❌ Error fetching scheme:", error);
        if (isMounted) {
          setSchemeCash(0);
          setSchemeCard(0);
          setSchemeUpi(0);
        }
      }
    };

    fetchScheme();
    const interval = setInterval(fetchScheme, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [startDate, endDate]);

  return { schemeCash, schemeCard, schemeUpi };
}
// ✅ Pure function for background or PDF export
export async function getSchemeData({ startDate, endDate }) {
  let schemeCash = 0;
  let schemeCard = 0;
  let schemeUpi = 0;

  try {
    const url = `${Api_Base_url2}paymentSummary?startDate=${startDate}&endDate=${endDate}`;
    const res = await fetch(url);
    const result = await res.json();

    // console.log("📦 getSchemeData API response:", result);

    if (Array.isArray(result)) {
      result.forEach(item => {
        const mode = (item?.paymode || "").toUpperCase();
        const amt = parseFloat(item?.amount || 0);
        if (mode === "CASH") schemeCash += amt;
        else if (mode === "CARD") schemeCard += amt;
        else if (mode === "UPI") schemeUpi += amt;
      });
    } else {
      console.warn("⚠️ Unexpected getSchemeData response:", result);
    }
  } catch (err) {
    console.error("❌ Error in getSchemeData:", err);
  }

  return { schemeCash, schemeCard, schemeUpi };
}
