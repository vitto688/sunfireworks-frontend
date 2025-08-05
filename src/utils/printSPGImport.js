import { formatNumberWithDot } from "./numberUtils";

export const printSPGImport = (data) => {
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
        <title>SPG IMPORT - ${
          data.document_number || data.sj_number || data.id
        }</title>
        <style>
          @page {
            margin: 10mm;
            size: A4 landscape;
            @top-left { content: ""; }
            @top-center { content: ""; }
            @top-right { content: ""; }
            @bottom-left { content: ""; }
            @bottom-center { content: ""; }
            @bottom-right { content: ""; }
          }
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            font-size: 12px;
            line-height: 1.4;
            color: black;
            font-weight: 400;
            width: calc(100% - 20mm);
          }
          .header {
            text-align: center;
            margin-bottom: 25px;
            border-bottom: 1px solid black;
            padding-bottom: 10px;
          }
          .header h1 {
            font-size: 16px;
            font-weight: 600;
            margin: 0;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .documentInfo {
            display: flex;
            justify-content: space-between;
            margin-bottom: 25px;
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
            font-weight: 600;
            min-width: 120px;
            font-size: 11px;
          }
          .infoRow .value {
            font-weight: 400;
            font-size: 11px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
            border: 1px solid black;
            font-size: 8px;
            table-layout: fixed;
          }
          th, td {
            border: 1px solid black;
            padding: 2px 1px;
            text-align: center;
            vertical-align: middle;
            font-size: 8px;
            line-height: 1.2;
            word-wrap: break-word;
            overflow: hidden;
          }
          th {
            background: #f5f5f5 !important;
            font-weight: 600;
            font-size: 8px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .col-no { 
            width: 3%;
          }
          .col-kode { 
            width: 8%;
            font-size: 7px;
          }
          .col-nama { 
            width: 15%;
            padding-left: 2px;
            font-size: 7px;
            text-align: left;
          }
          .col-packing { 
            width: 6%;
            font-size: 7px;
          }
          .col-carton { 
            width: 5%;
          }
          .col-pack { 
            width: 5%;
          }
          .col-ukuran-dus { 
            width: 8%;
            font-size: 7px;
          }
          .col-inn { 
            width: 4%;
          }
          .col-out { 
            width: 4%;
          }
          .col-pjg { 
            width: 4%;
          }
          .col-kg-dus { 
            width: 6%;
            font-size: 7px;
          }
          .col-ukuran-gudang { 
            width: 10%;
            font-size: 7px;
          }
          .col-kg-gudang { 
            width: 7%;
            font-size: 7px;
          }
          .col-kode-produksi { 
            width: 15%;
            font-size: 7px;
          }
          .subheader th {
            background: #f5f5f5 !important;
            font-size: 8px;
            height: 20px;
            font-weight: 600;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .total-row {
            background: #f9f9f9 !important;
            font-weight: 600;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .total-row .total-label {
            text-align: right !important;
            font-size: 8px;
            font-weight: 600;
            padding-right: 5px;
          }
          .total-row td {
            font-weight: 600;
            font-size: 8px;
          }
          .footer {
            padding: 15px 0;
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
          }
          .notesSection {
            margin-bottom: 40px;
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
          <h1>SURAT PENERIMAAN GUDANG (SPG) IMPORT</h1>
        </div>

        <div class="documentInfo">
          <div class="leftInfo">
            <div class="infoRow">
              <span class="label">NO SPG :</span>
              <span class="value">${
                data.document_number || data.sj_number || data.id
              }</span>
            </div>
            <div class="infoRow">
              <span class="label">NO KONTAINER :</span>
              <span class="value">${data.container_number || "-"}</span>
            </div>
            <div class="infoRow">
              <span class="label">NO KENDARAAN :</span>
              <span class="value">${data.vehicle_number || "-"}</span>
            </div>
             <div class="infoRow">
              <span class="label">GUDANG TUJUAN :</span>
              <span class="value">${data.warehouse_name || "-"}</span>
            </div>
          </div>
          <div class="rightInfo">
            <div class="infoRow">
              <span class="label">TANGGAL INPUT :</span>
              <span class="value">${
                new Date(data.transaction_date).toLocaleDateString("id-ID") ||
                "-"
              }</span>
            </div>
            <div class="infoRow">
              <span class="label">MULAI BONGKAR :</span>
              <span class="value">${data.start_unload || "-"}</span>
            </div>
            <div class="infoRow">
              <span class="label">SELESAI BONGKAR :</span>
              <span class="value">${data.finish_load || "-"}</span>
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th rowspan="2" class="col-no">NO</th>
              <th rowspan="2" class="col-kode">KODE PRODUK</th>
              <th rowspan="2" class="col-nama">NAMA PRODUK</th>
              <th rowspan="2" class="col-packing">PACKING</th>
              <th colspan="2">JUMLAH</th>
              <th rowspan="2" class="col-ukuran-dus">UKURAN DUS</th>
              <th rowspan="2" class="col-inn">INN</th>
              <th rowspan="2" class="col-out">OUT</th>
              <th rowspan="2" class="col-pjg">PJG</th>
              <th rowspan="2" class="col-kg-dus">KG DUS</th>
              <th rowspan="2" class="col-ukuran-gudang">UKURAN GUDANG</th>
              <th rowspan="2" class="col-kg-gudang">KG GUDANG</th>
              <th rowspan="2" class="col-kode-produksi">KODE PRODUKSI</th>
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
                <td class="col-nama">${item.product_name || "-"}</td>
                <td class="col-packing">${item.packing || "-"}</td>
                <td class="col-carton">${formatNumberWithDot(
                  item.carton_quantity || 0
                )}</td>
                <td class="col-pack">${formatNumberWithDot(
                  item.pack_quantity || 0
                )}</td>
                <td class="col-ukuran-dus">${item.packaging_size || "-"}</td>
                <td class="col-inn">${formatNumberWithDot(item.inn || 0)}</td>
                <td class="col-out">${formatNumberWithDot(item.out || 0)}</td>
                <td class="col-pjg">${item.pjg || "-"}</td>
                <td class="col-kg-dus">${item.packaging_weight || "-"}</td>
                <td class="col-ukuran-gudang">${item.warehouse_size || "-"}</td>
                <td class="col-kg-gudang">${item.warehouse_weight || "-"}</td>
                <td class="col-kode-produksi">${
                  item.production_code || "-"
                }</td>
              </tr>
            `
                )
                .join("") || ""
            }
            <tr class="total-row">
              <td colspan="4" class="total-label">TOTAL</td>
              <td class="col-carton">${formatNumberWithDot(totalCarton)}</td>
              <td class="col-pack">${formatNumberWithDot(totalPack)}</td>
              <td colspan="8"></td>
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
