import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

import { getMaterialTableData } from "../Contexts/MaterialItems/MaterialContext";
import { getPaymentData } from "../Contexts/Payment/PaymentContext";
import { getSchemeData } from "../Contexts/Scheme/SchemeContext";
import { getSummaryData } from "../Contexts/Summary/SummaryContext";
import { getCancelBillData } from "../Contexts/CancelBill/CancelBillContext";
import { getSchemeSummaryData } from "../Contexts/SchemeAdjustment/SchemeAdjustmentContext";

export const generatePDFReport = async ({ startDate, endDate }) => {
  const format = (num) =>
    Number(num).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  try {
    const dateTime = new Date().toLocaleString("en-IN");

    const [mat, pay, scheme, sum, cancels, schemeSummary] = await Promise.all([
      getMaterialTableData({ startDate, endDate }),
      getPaymentData({ startDate, endDate }),
      getSchemeData({ startDate, endDate }),
      getSummaryData({ startDate, endDate }),
      getCancelBillData({ startDate, endDate }),
      getSchemeSummaryData({ startDate, endDate }),
    ]);

    const totalCancelAmt = cancels.reduce((sum, c) => sum + parseFloat(c.AMOUNT || 0), 0);

    const html = `
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8" />
        <style>
          @page { size: A4; margin: 20mm; }
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
          .header { text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 12px; }
          .title { font-size: 22px; font-weight: bold; color: #d4af37; }
          .subtitle { font-size: 14px; color: #666; margin-top: 4px; }
          .section { margin: 24px 0 10px; font-size: 16px; font-weight: bold; color: #333; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; direction: ltr; }
          th, td { border: 1px solid #ccc; padding: 6px; font-size: 12px; }
          th { background: #f0e68c; text-align: left; }
          td.num { text-align: right; }
          td.text { text-align: left; }
          .total { font-weight: bold; background: #fff8dc; }
          .center { text-align: center; }
          footer { text-align: center; font-size: 10px; margin-top: 30px; color: #888; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">Vairamaaligai JEWELLERS</div>
          <div class="subtitle">Sales Summary Report</div>
          <div class="subtitle">From ${startDate} to ${endDate} | Generated on: ${dateTime}</div>
        </div>

        <div class="section">Material Summary</div>
        <table>
          <tr>
            <th>Material</th><th class="num">Sales (G)</th><th class="num">Purchase (G)</th><th class="num">Stock (G)</th>
          </tr>
          <tr>
            <td class="text">Gold</td><td class="num">${format(mat.goldWeight)}</td><td class="num">${format(mat.oldGold)}</td><td class="num">${format(mat.goldStock)}</td>
          </tr>
          <tr>
            <td class="text">Silver</td><td class="num">${format(mat.silverWeight)}</td><td class="num">${format(mat.oldSilver)}</td><td class="num">${format(mat.silverStock)}</td>
          </tr>
        </table>

        <div class="section">Stone Summary</div>
        <table>
          <tr><th>Unit</th><th class="num">Pieces</th><th class="num">Weight</th><th class="num">Amount (₹)</th></tr>
          ${
            mat.stoneSummary.length
              ? mat.stoneSummary.map((i) => `
                  <tr>
                    <td class="text">${i.stoneUnit}</td>
                    <td class="num">${i.stnpcs}</td>
                    <td class="num">${format(i.stnwt)}</td>
                    <td class="num">${format(i.stnamt)}</td>
                  </tr>`).join("")
              : `<tr><td colspan="4" class="center">No stone data</td></tr>`
          }
        </table>

        <div class="section">Payment Summary</div>
        <table>
          <tr><th>Mode</th><th class="num">Amount (₹)</th></tr>
          <tr><td class="text">Cash</td><td class="num">${format(pay.cash)}</td></tr>
          <tr><td class="text">Card</td><td class="num">${format(pay.credit)}</td></tr>
          <tr><td class="text">UPI/Cheque</td><td class="num">${format(pay.chequeAndUPI)}</td></tr>
          <tr class="total"><td class="text">Total</td><td class="num">${format(pay.total)}</td></tr>
        </table>

        <div class="section">Scheme Collection</div>
        <table>
          <tr><th>Mode</th><th class="num">Amount (₹)</th></tr>
          <tr><td class="text">Cash</td><td class="num">${format(scheme.schemeCash)}</td></tr>
          <tr><td class="text">Card</td><td class="num">${format(scheme.schemeCard)}</td></tr>
          <tr><td class="text">UPI</td><td class="num">${format(scheme.schemeUpi)}</td></tr>
          <tr class="total"><td class="text">Total</td><td class="num">${format(scheme.schemeCash + scheme.schemeCard + scheme.schemeUpi)}</td></tr>
        </table>

        <div class="section">Estimate vs Billed</div>
        <table>
          <tr><th>Type</th><th class="num">Amount (₹)</th></tr>
          <tr><td class="text">Total Estimate</td><td class="num">${format(sum.TotalEstimate)}</td></tr>
          <tr><td class="text">Total Billed</td><td class="num">${format(sum.TotalBilled)}</td></tr>
          <tr><td class="text">Total Pending</td><td class="num">${format(sum.TotalPending)}</td></tr>
        </table>

        <div class="section">Scheme Adjustment Summary</div>
        <table>
          <tr><th>Description</th><th class="num">Value</th></tr>
          <tr><td class="text">Collection Weight</td><td class="num">${format(schemeSummary.collectionWeight)} G</td></tr>
          <tr><td class="text">Collection Amount</td><td class="num">${format(schemeSummary.collectionAmount)}</td></tr>
          <tr><td class="text">Adjustment Weight</td><td class="num">${format(schemeSummary.adjustmentWeight)} G</td></tr>
          <tr><td class="text">Adjustment Amount</td><td class="num">${format(schemeSummary.adjustmentAmount)}</td></tr>
          <tr><td class="text">Scheme Amount</td><td class="num">${format(schemeSummary.schemeAmount)}</td></tr>
        </table>

        <div class="section">Cancelled Bills</div>
        <table>
          <tr><th>Date</th><th>Tranno</th><th class="num">Net Wt</th><th class="num">Amount</th><th>User</th></tr>
          ${
            cancels.length
              ? cancels.map((c) => `
                  <tr>
                    <td class="text">${c.TRANDATE || "-"}</td>
                    <td class="text">${c.TRANNO || "-"}</td>
                    <td class="num">${parseFloat(c.NETWT || 0).toFixed(3)}</td>
                    <td class="num">${format(c.AMOUNT || 0)}</td>
                    <td class="text">${c.USERNAME || "-"}</td>
                  </tr>`).join("")
              : `<tr><td colspan="5" class="center">No cancelled bills</td></tr>`
          }
          ${
            cancels.length
              ? `<tr class="total"><td colspan="3" class="text">Total Cancelled</td><td colspan="2" class="num">${format(totalCancelAmt)}</td></tr>`
              : ""
          }
        </table>

        <footer>©  Jewellers • Generated on ${dateTime}</footer>
      </body>
    </html>`;

    const { uri } = await Print.printToFileAsync({ html });

    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert("Sharing not available on this device");
      return;
    }

    await Sharing.shareAsync(uri,{
      UTI: ".pdf",
      mimeType: "application/pdf",
    });
  } catch (e) {
    console.error("PDF generation failed:", e);
    Alert.alert("Error", "Failed to generate PDF report.");
  }
};
