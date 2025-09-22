import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

import { getMaterialTableData } from "../Contexts/MaterialItems/MaterialContext";
import { getPaymentData } from "../Contexts/Payment/PaymentContext";
import { getSchemeData } from "../Contexts/Scheme/SchemeContext";
import { getSummaryData } from "../Contexts/Summary/SummaryContext";
import { getCancelBillData } from "../Contexts/CancelBill/CancelBillContext";
import { getSchemeSummaryData } from "../Contexts/SchemeAdjustment/SchemeAdjustmentContext";

export const generatePDFReport = async ({ startDate, endDate, costIds }) => {
  if (!costIds.length) {
    Alert.alert("Please select cost centres first");
    return;
  }

  const format = (num) =>
    Number(num).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  try {
    const dateTime = new Date().toLocaleString("en-IN");

    let html = `
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        @page {
          size: A4;
          margin: 20mm;
        }
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background: #fff;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #d4af37;
        }
        .company-name {
          font-size: 24px;
          font-weight: bold;
          color: #d4af37;
        }
        .report-title {
          font-size: 16px;
          color: #444;
        }
        .report-dates {
          font-size: 13px;
          color: #777;
        }
        .section-title {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          margin: 24px 0 10px;
        }
        .cost-center {
          font-size: 18px;
          font-weight: bold;
          margin-top: 20px;
          color: #000;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 18px;
        }
        th, td {
          border: 1px solid #ccc;
          padding: 8px;
          font-size: 12px;
          text-align: left;
        }
        th {
          background-color: #f9f1cd;
        }
        .right {
          text-align: right;
        }
        .total-row {
          font-weight: bold;
          background-color: #fff9e6;
        }
        footer {
          text-align: center;
          font-size: 10px;
          margin-top: 30px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-name">JAIGURU JEWELLERS</div>
        <div class="report-title">Sales Summary Report</div>
        <div class="report-dates">From ${startDate} to ${endDate} | Generated on: ${dateTime}</div>
      </div>
    `;

    for (const { id: costId, name: COSTNAME } of costIds) {
      const [mat, pay, scheme, sum, cancels, schemeSummary] = await Promise.all([
        getMaterialTableData({ startDate, endDate, costId }),
        getPaymentData({ startDate, endDate, costId }),
        getSchemeData({ startDate, endDate, costId }),
        getSummaryData({ startDate, endDate, costId }),
        getCancelBillData({ startDate, endDate, costId }),
        getSchemeSummaryData({ startDate, endDate, costId }),
      ]);

      const totalCancelAmt = cancels.reduce((sum, c) => sum + parseFloat(c.AMOUNT || 0), 0);

      html += `
        <div class="cost-center">${COSTNAME}</div>

        <div class="section-title">Material Summary</div>
        <table>
          <tr><th>Material</th><th class="right">Sales (G)</th><th class="right">Purchase (G)</th><th class="right">Stock (G)</th></tr>
          <tr><td>Gold</td><td class="right">${format(mat.goldWeight)}</td><td class="right">${format(mat.Oldgold)}</td><td class="right">${format(mat.goldStock)}</td></tr>
          <tr><td>Silver</td><td class="right">${format(mat.silverWeight)}</td><td class="right">${format(mat.OldSilver)}</td><td class="right">${format(mat.silverStock)}</td></tr>
        </table>

        <div class="section-title">Stone Summary</div>
        <table>
          <tr><th>Stone Unit</th><th class="right">Stone Pcs</th><th class="right">Stone Wt</th><th class="right">Stone Amt (₹)</th></tr>
          ${
            mat.StoneSummary?.length
              ? mat.StoneSummary.map(
                  (i) => `
                  <tr>
                    <td>${i.stoneUnit}</td><td class="right">${i.stnpcs}</td>
                    <td class="right">${format(i.stnwt)}</td><td class="right">${format(i.stnamt)}</td>
                  </tr>`
                ).join("")
              : `<tr><td colspan="4">No stone data</td></tr>`
          }
        </table>

        <div class="section-title">Payment Summary</div>
        <table>
          <tr><th>Mode</th><th class="right">Amount (₹)</th></tr>
          <tr><td>Cash</td><td class="right">${format(pay.cash)}</td></tr>
          <tr><td>Credit/Debit</td><td class="right">${format(pay.credit)}</td></tr>
          <tr><td>UPI</td><td class="right">${format(pay.cheque)}</td></tr>
          <tr><td>Cheque</td><td class="right">${format(pay.upi)}</td></tr>
          <tr class="total-row"><td>Total</td><td class="right">${format(pay.total)}</td></tr>
        </table>

        <div class="section-title">Scheme Collection</div>
        <table>
          <tr><th>Mode</th><th class="right">Amount (₹)</th></tr>
          <tr><td>Cash</td><td class="right">${format(scheme.schemeCash)}</td></tr>
          <tr><td>Card</td><td class="right">${format(scheme.schemeCard)}</td></tr>
          <tr><td>UPI</td><td class="right">${format(scheme.schemeUpi)}</td></tr>
          <tr class="total-row"><td>Total</td><td class="right">${format(scheme.schemeCash + scheme.schemeCard + scheme.schemeUpi)}</td></tr>
        </table>

        <div class="section-title">Estimate vs Billed</div>
        <table>
          <tr><th>Description</th><th class="right">Amount (₹)</th></tr>
          <tr><td>Total Estimate</td><td class="right">${format(sum.TotalEstimate)}</td></tr>
          <tr><td>Total Billed</td><td class="right">${format(sum.TotalBilled)}</td></tr>
          <tr><td>Total Pending</td><td class="right">${format(sum.TotalPending)}</td></tr>
        </table>

        <div class="section-title">Scheme Adjustment Summary</div>
        <table>
          <tr><th>Description</th><th class="right">Value</th></tr>
          <tr><td>Collection Weight</td><td class="right">${format(schemeSummary.collectionWeight)} G</td></tr>
          <tr><td>Collection Amount</td><td class="right">${format(schemeSummary.collectionAmount)}</td></tr>
          <tr><td>Adjustment Weight</td><td class="right">${format(schemeSummary.adjustmentWeight)} G</td></tr>
          <tr><td>Adjustment Amount</td><td class="right">${format(schemeSummary.adjustmentAmount)}</td></tr>
          <tr><td>Scheme Amount</td><td class="right">${format(schemeSummary.schemeAmount)}</td></tr>
        </table>

        <div class="section-title">Cancelled Bills</div>
        <table>
          <tr><th>Date</th><th>Bill No</th><th class="right">Net Wt</th><th class="right">Amount</th><th>User</th></tr>
          ${
            cancels.length
              ? cancels.map((c) => `
                <tr>
                  <td>${c.TRANDATE || "-"}</td><td>${c.TRANNO || "-"}</td>
                  <td class="right">${parseFloat(c.NETWT || 0).toFixed(3)}</td>
                  <td class="right">${format(c.AMOUNT || 0)}</td>
                  <td>${c.USERNAME || "-"}</td>
                </tr>`).join("")
              : `<tr><td colspan="5">No cancelled bills</td></tr>`
          }
          ${
            cancels.length
              ? `<tr class="total-row"><td colspan="3">Total Cancelled</td><td colspan="2" class="right">${format(totalCancelAmt)}</td></tr>`
              : ""
          }
        </table>
      `;
    }

    html += `
        <footer>© JAIGURU Jewellers • Generated on ${dateTime}</footer>
      </body>
    </html>`;

    const { uri } = await Print.printToFileAsync({ html });
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert("Sharing not available");
      return;
    }
    await Sharing.shareAsync(uri);
  } catch (e) {
    console.error("PDF generation failed:", e);
    Alert.alert("PDF generation failed");
  }
};
