import { useState, useEffect } from "react";
import { Api_Base_url2 } from "../../Config/Config";

// React Hook for UI components
export function usePaymentData({ startDate, endDate, costId }) {
  const [cash, setCash] = useState(0);
  const [credit, setCredit] = useState(0);
  const [chequeAndUPI, setChequeAndUPI] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      try {
        const [cashRes, creditRes, chequeRes] = await Promise.all([
          fetch(`${Api_Base_url2}totalCash?startDate=${startDate}&endDate=${endDate}`),
          fetch(`${Api_Base_url2}totalCreditCardBill?startDate=${startDate}&endDate=${endDate}`),
          fetch(`${Api_Base_url2}totalChequeAndUPI?startDate=${startDate}&endDate=${endDate}`),
        ]);
        const cashData = await cashRes.json();
        const creditData = await creditRes.json();
        const chequeData = await chequeRes.json();

        if (!isMounted) return;

        setCash(cashData?.[0]?.Total_Cash || 0);
        setCredit(creditData?.[0]?.CreditCard_Bill || 0);
        setChequeAndUPI(chequeData?.total_Cheque_and_UPI || 0);
        setTotal(
          (cashData?.[0]?.Total_Cash || 0) +
            (creditData?.[0]?.CreditCard_Bill || 0) +
            (chequeData?.total_Cheque_and_UPI || 0)
        );
      } catch (e) {
        console.error("Error fetching payment data:", e);
        if (!isMounted) return;
        setCash(0);
        setCredit(0);
        setChequeAndUPI(0);
        setTotal(0);
      }
    };

    fetchAll();
    const interval = setInterval(fetchAll, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [startDate, endDate, costId]);

  return { cash, credit, chequeAndUPI, total };
}

// Pure function for PDF or external use
export async function getPaymentData({ startDate, endDate, costId }) {
  const result = { cash: 0, credit: 0, chequeAndUPI: 0, total: 0 };

  try {
    const cashRes = await fetch(`${Api_Base_url2}totalCash?startDate=${startDate}&endDate=${endDate}`);
    const creditRes = await fetch(`${Api_Base_url2}totalCreditCardBill?startDate=${startDate}&endDate=${endDate}`);
    const chequeRes = await fetch(`${Api_Base_url2}totalChequeAndUPI?startDate=${startDate}&endDate=${endDate}`);

    const cashData = await cashRes.json();
    const creditData = await creditRes.json();
    const chequeData = await chequeRes.json();

    result.cash = cashData?.[0]?.Total_Cash || 0;
    result.credit = creditData?.[0]?.CreditCard_Bill || 0;
    result.chequeAndUPI = chequeData?.total_Cheque_and_UPI || 0;
    result.total = result.cash + result.credit + result.chequeAndUPI;
  } catch (e) {
    console.error("Error fetching payment data:", e);
  }

  return result;
}
