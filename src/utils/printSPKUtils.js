import { formatNumberWithDot } from "./numberUtils";

export const printSPK = (data) => {
  // Calculate totals
  const totalCarton =
    data.items?.reduce((sum, item) => sum + (item.carton_quantity || 0), 0) ||
    0;
  const totalPack =
    data.items?.reduce((sum, item) => sum + (item.pack_quantity || 0), 0) || 0;

  console.log("data", data);

  // Create complete HTML document
  const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>SPK - ${
          data.document_number || data.spk_number || data.id
        }</title>
        <style>
          @page {
            margin: 15mm;
            size: A4;
          }
          body {
            font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
            margin: 0;
            padding: 0;
            font-size: 13px;
            line-height: 1.4;
            color: black;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid black;
            padding-bottom: 10px;
          }
          .header h1 {
            font-size: 16px;
            font-weight: bold;
            margin: 0;
            letter-spacing: 3px;
            text-transform: uppercase;
          }
          .documentInfo {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            gap: 40px;
          }
          .leftInfo, .rightInfo {
            flex: 1;
          }
          .infoRow {
            display: flex;
            gap: 15px;
            align-items: center;
            margin-bottom: 8px;
          }
          .infoRow .label {
            font-weight: bold;
            min-width: 90px;
            font-size: 12px;
          }
          .infoRow .value {
            font-weight: normal;
            font-size: 12px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
            border: 1.5px solid black;
            font-size: 12px;
          }
          th, td {
            border: 1px solid black;
            padding: 6px 4px;
            text-align: center;
            vertical-align: middle;
            font-size: 12px;
            line-height: 1.3;
          }
          th {
            background: white !important;
            font-weight: bold;
            font-size: 12px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .col-no { 
            width: 35px; 
            min-width: 35px;
          }
          .col-kode { 
            width: 85px; 
            min-width: 85px;
            font-size: 10px;
          }
          .col-barcode { 
            width: 85px; 
            min-width: 85px;
            font-size: 10px;
          }
          .col-nama { 
            width: 200px; 
            min-width: 200px;
            padding-left: 6px;
            font-size: 10px;
          }
          .col-kp { 
            width: 35px; 
            min-width: 35px;
          }
          .col-packing { 
            width: 70px; 
            min-width: 70px;
            font-size: 10px;
          }
          .col-carton { 
            width: 60px; 
            min-width: 60px;
          }
          .col-pack { 
            width: 60px; 
            min-width: 60px;
          }
          .subheader th {
            background: white !important;
            font-size: 12px;
            height: 25px;
            font-weight: bold;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .total-row {
            background: white !important;
            font-weight: bold;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .total-row .total-label {
            text-align: right !important;
            font-size: 12px;
            font-weight: bold;
            padding-right: 15px;
          }
          .total-row td {
            font-weight: bold;
            font-size: 12px;
          }
          .footer {
            padding: 15px;
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
          }
          .notesSection {
            margin-bottom: 50px;
          }
          .notesLabel {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .notesContent {
            font-size: 12px;
            line-height: 1.5;
          }
          .signatureSection {
            display: flex;
            flex-direction: column;
            align-items: centers;
          }
          .signatureLeft, .signatureRight {
            text-align: center;
          }
          .signatureLeft p, .signatureRight p {
            margin: 0;
            font-size: 12px;
            font-weight: normal;
          }
          .signatureRight {
            margin-top: 50px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>SURAT PERINTAH KERJA (SPK)</h1>
        </div>

        <div class="documentInfo">
          <div class="leftInfo">
            <div class="infoRow">
              <span class="label">TANGGAL :</span>
              <span class="value">${new Date(
                data.created_at
              ).toLocaleDateString("id-ID")}</span>
            </div>
            <div class="infoRow">
              <span class="label">NO SPK :</span>
              <span class="value">${
                data.document_number || data.spk_number || data.id
              }</span>
            </div>
          </div>
          <div class="rightInfo">
            <div class="infoRow">
              <span class="label">Kepada :</span>
              <span class="value">${data.customer_name || "-"}</span>
            </div>
            <div class="infoRow">
              <span class="label">UP. :</span>
              <span class="value">${data.customer_upline || "-"}</span>
            </div>
            <div class="infoRow">
              <span class="label">Alamat :</span>
              <span class="value">${data.customer_address || "-"}</span>
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th rowspan="2" class="col-no">NO</th>
              <th rowspan="2" class="col-kode">KODE PRODUK</th>
              <th rowspan="2" class="col-barcode">BARCODE</th>
              <th rowspan="2" class="col-nama">NAMA PRODUK</th>
              <th rowspan="2" class="col-kp">KP</th>
              <th rowspan="2" class="col-packing">PACKING</th>
              <th colspan="2">JUMLAH</th>
            </tr>
            <tr class="subheader">
              <th class="col-carton">CARTON</th>
              <th class="col-pack">PACK</th>
            </tr>
          </thead>
          <tbody>
            ${
              data.items
                ?.map(
                  (item, index) => `
              <tr>
                <td class="col-no">${index + 1}</td>
                <td class="col-kode">${item.product_code || "-"}</td>
                <td class="col-barcode">-</td>
                <td class="col-nama">${item.product_name || "-"}</td>
                <td class="col-kp">${item.supplier_name || "-"}</td>
                <td class="col-packing">${item.packing || "-"}</td>
                <td class="col-carton">${formatNumberWithDot(
                  item.carton_quantity || 0
                )}</td>
                <td class="col-pack">${formatNumberWithDot(
                  item.pack_quantity || 0
                )}</td>
              </tr>
            `
                )
                .join("") || ""
            }
            <tr class="total-row">
              <td colspan="6" class="total-label">TOTAL</td>
              <td class="col-carton">${formatNumberWithDot(totalCarton)}</td>
              <td class="col-pack">${formatNumberWithDot(totalPack)}</td>
            </tr>
          </tbody>
        </table>

        <div class="footer">
          <div class="notesSection">
            <div class="notesLabel">
              <strong>CATATAN :</strong>
            </div>
            <div class="notesContent">
              ${data.notes || "-"}
            </div>
          </div>
          
          <div class="signatureSection">
            <div class="signatureLeft">
              <p>Yang membuat,</p>
            </div>
            <div class="signatureRight">
              <p>${data.user_username || "-"}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

  // Create blob URL for the HTML content
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  // Open in new window
  const printWindow = window.open(url, "_blank");

  if (printWindow) {
    // Wait for content to load then focus and setup print
    printWindow.onload = () => {
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        URL.revokeObjectURL(url); // Clean up
      }, 250);
    };

    // Fallback if onload doesn't trigger
    setTimeout(() => {
      if (printWindow && !printWindow.closed) {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
        URL.revokeObjectURL(url);
      }
    }, 1000);
  } else {
    // Fallback to regular print
    URL.revokeObjectURL(url);
    window.print();
  }
};
