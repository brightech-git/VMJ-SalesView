// ✅ File: Contexts/Payment/PaymentContext.js
import { useState, useEffect } from "react";
import { Api_Base_url } from "../../Config/Config";

// ✅ React Hook — For UI components
export function usePaymentData({ startDate, endDate, costId }) {
  const [cash, setCash] = useState(0);
  const [credit, setCredit] = useState(0);
  const [upi, setUpi] = useState(0);
  const [cheque, setCheque] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      await Promise.all([
        fetchCash(),
        fetchCredit(),
        fetchCheque(),
        fetchUPI()
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

  const fetchCash = async () => {
    try {
      const url = `${Api_Base_url}${costId}TotalCash?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
      const res = await fetch(url);
      const data = await res.json();
      setCash(data?.[0]?.Total_Cash || 0);
    } catch {
      setCash(0);
    }
  };

  const fetchCredit = async () => {
    try {
      const url = `${Api_Base_url}${costId}TotalCreditCardBill?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
      const res = await fetch(url);
      const data = await res.json();
      setCredit(data?.[0]?.CreditCard_Bill || 0);
    } catch {
      setCredit(0);
    }
  };

  const fetchCheque = async () => {
    try {
      const url = `${Api_Base_url}${costId}TotalChequeAndUPI?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
      const res = await fetch(url);
      const data = await res.json();
      setCheque(data?.total_Cheque_and_UPI || 0);
    } catch {
      setCheque(0);
    }
  };

  const fetchUPI = async () => {
    try {
      const url = `${Api_Base_url}${costId}TotalUPI?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
      const res = await fetch(url);
      const data = await res.json();
      setUpi(data?.[0]?.CreditCard_Bill || 0);
    } catch {
      setUpi(0);
    }
  };

  const total = cash + credit + upi + cheque;

  return { cash, credit, upi, cheque, total };
}

// ✅ Pure function — For PDF & external use
export async function getPaymentData({ startDate, endDate, costId }) {
  let cash = 0, credit = 0, upi = 0, cheque = 0;

  try {
    const cashUrl = `${Api_Base_url}${costId}TotalCash?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
    const cashRes = await fetch(cashUrl);
    const cashData = await cashRes.json();
    cash = cashData?.[0]?.Total_Cash || 0;
  } catch (err) {
    console.error(`Error fetching cash:`, err);
  }

  try {
    const creditUrl = `${Api_Base_url}${costId}TotalCreditCardBill?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
    const creditRes = await fetch(creditUrl);
    const creditData = await creditRes.json();
    credit = creditData?.[0]?.CreditCard_Bill || 0;
  } catch (err) {
    console.error(`Error fetching credit:`, err);
  }

  try {
    const chequeUrl = `${Api_Base_url}${costId}TotalChequeAndUPI?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
    const chequeRes = await fetch(chequeUrl);
    const chequeData = await chequeRes.json();
    cheque = chequeData?.total_Cheque_and_UPI || 0;
  } catch (err) {
    console.error(`Error fetching cheque:`, err);
  }

  try {
    const upiUrl = `${Api_Base_url}${costId}TotalUPI?startDate=${startDate}&endDate=${endDate}&costId=${costId}`;
    const upiRes = await fetch(upiUrl);
    const upiData = await upiRes.json();
    upi = upiData?.[0]?.CreditCard_Bill || 0;
  } catch (err) {
    console.error(`Error fetching UPI:`, err);
  }


  return { cash, credit, upi, cheque};
}
