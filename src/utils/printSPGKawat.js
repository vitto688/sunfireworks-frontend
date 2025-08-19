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
            margin: 0;
            size: 9.5in 11in;
            @top-left { content: ""; }
            @top-center { content: ""; }
            @top-right { content: ""; }
            @bottom-left { content: ""; }
            @bottom-center { content: ""; }
            @bottom-right { content: ""; }
          }
          @media print {
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
          body {
            font-family: 'DejaVu Sans Mono', 'Courier New', Courier, monospace;
            margin: 10mm 5mm 5mm 5mm;
            padding: 0;
            font-size: 12px;
            line-height: 1.3;
            color: black;
            font-weight: 400;
            max-width: 8.1in;
          }
          .header {
            text-align: center;
            margin-bottom: 25px;
            border-bottom: 0.1px solid black;
            padding-bottom: 8px;
          }
          .header h1 {
            font-size: 14px;
            font-weight: 600;
            margin: 0;
            letter-spacing: 2px;
            text-transform: uppercase;
          }
          .documentInfo {
            display: flex;
            justify-content: space-between;
            margin-bottom: 25px;
            gap: 30px;
          }
          .leftInfo, .rightInfo {
            flex: 1;
          }
          .infoRow {
            display: flex;
            gap: 8px;
            align-items: center;
            margin-bottom: 6px;
          }
          .infoRow .label {
            font-weight: 600;
            min-width: 100px;
            font-size: 11px;
          }
          .infoRow .value {
            font-weight: 500;
            font-size: 11px;
          }
          .infoRow .sj {
            margin-left: 32px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            border: 0.1px solid black;
            font-size: 11px;
            table-layout: fixed;
          }
          th, td {
            border: 0.1px solid black;
            padding: 4px 3px;
            text-align: center;
            vertical-align: middle;
            font-size: 12px;
            line-height: 1.2;
          }
          th {
            background: white !important;
            font-weight: 500;
            font-size: 12px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .col-no { 
            width: 40px; 
            min-width: 40px;
          }
          .col-kode { 
            width: 90px; 
            min-width: 90px;
            font-size: 12px;
          }
          .col-barcode { 
            width: 90px; 
            min-width: 90px;
            font-size: 12px;
          }
          .col-nama { 
            width: 220px; 
            min-width: 220px;
            padding-left: 4px;
            font-size: 12px;
            text-align: left;
          }
          .col-kp { 
            width: 40px; 
            min-width: 40px;
          }
          .col-packing { 
            width: 80px; 
            min-width: 80px;
            font-size: 12px;
          }
          .col-carton { 
            width: 70px; 
            min-width: 70px;
          }
          .col-pack { 
            width: 70px; 
            min-width: 70px;
          }
          .subheader th {
            background: white !important;
            font-size: 11px;
            height: 25px;
            font-weight: 600;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            border: 0.1px solid black;
          }
          .total-row {
            background: white !important;
            font-weight: 600;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .total-row .total-label {
            text-align: right !important;
            font-size: 11px;
            font-weight: 600;
            padding-right: 10px;
          }
          .total-row td {
            font-weight: 500;
            font-size: 11px;
          }
          .footer {
            padding: 15px 0;
            display: flex;
            justify-content: space-between;
            margin-top: 25px;
          }
          .notesSection {
            margin-bottom: 35px;
            flex: 1;
          }
          .notesLabel {
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 10px;
          }
          .notesContent {
            font-size: 11px;
            line-height: 1.5;
          }
          .signatureSection {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 180px;
          }
          .signatureLeft, .signatureRight {
            text-align: center;
          }
          .signatureLeft p, .signatureRight p {
            margin: 0;
            font-size: 11px;
            font-weight: 500;
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
              <span class="label">NO SPG &nbsp;:</span>
              <span class="value">${
                data.document_number || data.sj_number || data.id
              }</span>
            </div>
          </div>
          <div class="rightInfo">
            <div class="infoRow">
              <span class="label">No. SJ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
              <span class="value">${data.sj_number || "-"}</span>
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
