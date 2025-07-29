import { formatNumberWithDot } from "./numberUtils";

export const printSPGKawat = (data) => {
  // Calculate totals
  const totalCarton =
    data.items?.reduce((sum, item) => sum + (item.carton_quantity || 0), 0) ||
    0;
  const totalPack =
    data.items?.reduce((sum, item) => sum + (item.pack_quantity || 0), 0) || 0;

  // Create complete HTML document
  const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>SPG KAWAT - ${
          data.document_number || data.sj_number || data.id
        }</title>
        <style>
          @page {
            margin: 10mm;
            size: 9.5in 5.5in;
            @top-left { content: ""; }
            @top-center { content: ""; }
            @top-right { content: ""; }
            @bottom-left { content: ""; }
            @bottom-center { content: ""; }
            @bottom-right { content: ""; }
          }
          body {
            font-family: 'Courier New', Courier, monospace;
            margin: 0;
            padding: 0;
            font-size: 13px;
            line-height: 1.4;
            color: black;
            font-weight: 400;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 0.5px solid black;
            padding-bottom: 10px;
          }
          .header h1 {
            font-size: 16px;
            font-weight: 400;
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
            font-weight: 400;
            min-width: 90px;
            font-size: 12px;
          }
          .infoRow .value {
            font-weight: 400;
            font-size: 12px;
          }
          .infoRow .sj {
            margin-left: 32px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
            border: 0.25px solid black;
            font-size: 12px;
          }
          th, td {
            border: 0.25px solid black;
            padding: 6px 4px;
            text-align: center;
            vertical-align: middle;
            font-size: 12px;
            line-height: 1.3;
          }
          th {
            background: white !important;
            font-weight: 400;
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
            font-size: 11px;
          }
          .col-barcode { 
            width: 85px; 
            min-width: 85px;
            font-size: 11px;
          }
          .col-nama { 
            width: 200px; 
            min-width: 200px;
            padding-left: 6px;
            font-size: 11px;
          }
          .col-kp { 
            width: 35px; 
            min-width: 35px;
          }
          .col-packing { 
            width: 70px; 
            min-width: 70px;
            font-size: 11px;
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
            font-weight: 400;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .total-row {
            background: white !important;
            font-weight: 400;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .total-row .total-label {
            text-align: right !important;
            font-size: 12px;
            font-weight: 400;
            padding-right: 15px;
          }
          .total-row td {
            font-weight: 400;
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
            font-weight: 400;
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
            font-weight: 400;
          }
          .signatureRight {
            margin-top: 50px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>SURAT PENERIMAAN GUDANG (SPG) KAWAT</h1>
        </div>

        <div class="documentInfo">
          <div class="leftInfo">
            <div class="infoRow">
              <span class="label">TANGGAL :</span>
              <span class="value">${new Date(
                data.transaction_date || data.created_at || new Date()
              ).toLocaleDateString("id-ID")}</span>
            </div>
            <div class="infoRow">
              <span class="label">NO SPG :</span>
              <span class="value">${
                data.document_number || data.sj_number || data.id
              }</span>
            </div>
          </div>
          <div class="rightInfo">
            <div class="infoRow">
              <span class="label">No. SJ :</span>
              <span class="value sj">${data.sj_number || "-"}</span>
            </div>
            <div class="infoRow">
              <span class="label">GUDANG TUJUAN :</span>
              <span class="value">${data.warehouse_name || "-"}</span>
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
              <p>${data.user_username || data.user_email || "-"}</p>
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
