// ✅ File: Contexts/Scheme/SchemeContext.js
import { useState, useEffect } from "react";
import { Api_Base_url } from "../../Config/Config";

// ✅ Hook — for UI components
export function useSchemeData({ startDate, endDate, costId }) {
  const [schemeCash, setSchemeCash] = useState(0);
  const [schemeCard, setSchemeCard] = useState(0);
  const [schemeUpi, setSchemeUpi] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchScheme = async () => {
      try {
        const url = `${Api_Base_url}${costId}PaymentSummary?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
        const response = await fetch(url);
        const result = await response.json();

        const data = Array.isArray(result) ? result : result?.data || [];

        let cash = 0, card = 0, upi = 0;

        data.forEach(item => {
          const mode = (item.Paymode || "").toUpperCase();
          const amount = parseFloat(item.Amount || 0);
          if (mode === "CASH") cash = amount;
          else if (mode === "CARD") card = amount;
          else if (mode === "UPI") upi = amount;
        });

        if (isMounted) {
          setSchemeCash(cash);
          setSchemeCard(card);
          setSchemeUpi(upi);
        }
      } catch (err) {
        console.error(`Error fetching scheme payment for ${costId}:`, err);
        setSchemeCash(0);
        setSchemeCard(0);
        setSchemeUpi(0);
      }
    };

    fetchScheme();
    const interval = setInterval(() => {
      if (isMounted) fetchScheme();
    }, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [startDate, endDate, costId]);

  return {
    schemeCash,
    schemeCard,
    schemeUpi,
  };
}

// ✅ Pure function — for PDF/external use
export async function getSchemeData({ startDate, endDate, costId }) {
  let schemeCash = 0;
  let schemeCard = 0;
  let schemeUpi = 0;

  try {
    const url = `${Api_Base_url}${costId}PaymentSummary?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
    const res = await fetch(url);
    const result = await res.json();

    const data = Array.isArray(result) ? result : result?.data || [];

    data.forEach((item) => {
      const mode = (item.Paymode || "").toUpperCase();
      const amount = parseFloat(item.Amount || 0);

      if (mode === "CASH") schemeCash = amount;
      else if (mode === "CARD") schemeCard = amount;
      else if (mode === "UPI") schemeUpi = amount;
    });
  } catch (err) {
    console.error(`Error fetching scheme payment for ${costId}:`, err);
  }

  return { schemeCash, schemeCard, schemeUpi };
}
