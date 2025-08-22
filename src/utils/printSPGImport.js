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
            margin: 0; /* Custom margin - set to zero for manual control */
            size: A4 landscape; /* Keep landscape for import document */
            /* Epson LX-310 ESC/P settings */
            marks: none;
            orphans: 1;
            widows: 1;
            @top-left { content: ""; }
            @top-center { content: ""; }
            @top-right { content: ""; }
            @bottom-left { content: ""; }
            @bottom-center { content: ""; }
            @bottom-right { content: ""; }
          }
          
          /* Epson LX-310 optimized settings */
          @media print {
            @page {
              size: A4 landscape !important; /* Keep landscape for wide table */
              margin: 0 !important; /* Custom margin control */
            }
            
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            body {
              margin: 5mm; /* Equal margins on all sides */
              padding: 0 !important;
              position: relative !important;
              top: 0 !important;
              vertical-align: top !important;
              display: block !important;
            }
            
            table {
              page-break-inside: avoid;
              vertical-align: top !important;
              position: relative !important;
              margin-top: 0 !important;
            }
            
            tbody tr {
              min-height: 25px !important;
              height: auto !important;
            }
            
            tbody td {
              min-height: 20px !important;
              height: auto !important;
              padding: 6px 4px !important;
              line-height: 1.4 !important;
              vertical-align: top !important;
              font-size: 12px !important;
              font-weight: 300 !important;
            }
            
            th {
              min-height: 25px !important;
              height: 25px !important;
              padding: 4px 2px !important;
              vertical-align: middle !important;
              font-size: 12px !important;
              font-weight: 600 !important;
              text-align: center !important;
            }
          }
          body {
            font-family: 'Courier New', Courier, monospace;
            margin: 10mm auto 5mm auto; /* Top margin larger, auto horizontal centering */
            padding: 0;
            width: calc(100% - 10mm); /* Adjust width based on equal margins */
            max-width: calc(297mm - 10mm); /* A4 landscape width minus margins */
            font-size: 12px; /* Standard font size */
            line-height: 1.2; /* Tighter line spacing for 10cpi */
            color: black;
            font-weight: 400;
            /* 10cpi character spacing */
            letter-spacing: 0.2px;
            /* Force content to start from top center */
            display: block;
            position: relative;
            top: 0;
            vertical-align: top;
            text-align: left; /* Reset text alignment for content */
          }
          .header {
            text-align: center;
            margin-top: 0; /* Start from very top */
            margin-bottom: 25px; /* Reduced for continuous form */
            border-bottom: 0.1px solid black; /* Solid border for header */
            padding-top: 0; /* No top padding */
            padding-bottom: 8px;
          }
          .header h1 {
            font-size: 12px; /* 10cpi compatible header size */
            font-weight: 700; /* Bolder for better dot matrix visibility */
            margin: 0;
            letter-spacing: 1.0px; /* 10cpi character spacing */
            text-transform: uppercase;
          }
          .documentInfo {
            display: flex;
            justify-content: space-between;
            margin-bottom: 25px; /* Reduced spacing */
            gap: 30px; /* Reduced gap */
          }
          .leftInfo, .rightInfo {
            flex: 1;
          }
          .infoRow {
            display: flex;
            gap: 12px; /* Reduced gap */
            align-items: center;
            margin-bottom: 6px; /* Tighter spacing */
          }
          .infoRow .label {
            font-weight: 700; /* Bolder for better dot matrix visibility */
            min-width: 120px; /* Keep wider for landscape */
            font-size: 12px; /* Standard font size */
          }
          .infoRow .value {
            font-weight: 500; /* Slightly bolder for better visibility */
            font-size: 12px; /* Standard font size */
          }
          table {
            width: 100%;
            border-collapse: collapse; /* Changed to collapse for cleaner borders */
            border-spacing: 0; /* No spacing between cells */
            margin: 0 auto 20px auto; /* Center table */
            border: 0.1px solid black; /* Solid border for table */
            font-size: 12px; /* Standard font size */
            table-layout: fixed;
            min-height: auto;
            vertical-align: top;
            position: relative;
          }
          th, td {
            border: 0.1px solid black; /* Solid border for cells */
            padding: 4px 2px; /* Reduced padding to save space */
            text-align: center;
            vertical-align: top; /* Keep top alignment */
            font-size: 12px; /* Standard font size */
            line-height: 1.2; /* Optimized line height for dot matrix */
            word-wrap: break-word;
            overflow: hidden;
          }
          th {
            background: white !important;
            font-weight: 600; /* Consistent bold weight for headers */
            font-size: 12px; /* Standard font size */
            height: 22px; /* Reduced height for headers */
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            line-height: 1.1; /* Tighter line height for headers */
            text-align: center; /* Center align all headers */
            vertical-align: middle; /* Center vertically in header cells */
            padding: 3px 1px; /* Reduced padding for headers */
          }
          .col-no { 
            width: 3%;
            font-size: 12px;
          }
          .col-kode { 
            width: 8%;
            font-size: 12px; /* Standard font size */
          }
          .col-nama { 
            width: 15%;
            padding-left: 3px;
            font-weight: 500; /* Slightly bolder for better visibility */
            font-size: 12px; /* Standard font size */
            text-align: left;
          }
          .col-packing { 
            width: 6%;
            font-size: 12px; /* Standard font size */
          }
          .col-carton { 
            width: 5%;
            font-weight: 400;
            font-size: 12px; /* Standard font size */
          }
          .col-pack { 
            width: 5%;
            font-weight: 400;
            font-size: 12px; /* Standard font size */
          }
          .col-ukuran-dus { 
            width: 8%;
            font-size: 12px; /* Standard font size */
          }
          .col-inn { 
            width: 4%;
            font-size: 12px;
          }
          .col-out { 
            width: 4%;
            font-size: 12px;
          }
          .col-pjg { 
            width: 4%;
            font-size: 12px;
          }
          .col-kg-dus { 
            width: 6%;
            font-size: 12px; /* Standard font size */
          }
          .col-ukuran-gudang { 
            width: 10%;
            font-size: 12px; /* Standard font size */
          }
          .col-kg-gudang { 
            width: 7%;
            font-size: 12px; /* Standard font size */
          }
          .col-kode-produksi { 
            width: 15%;
            font-size: 12px; /* Standard font size */
          }
          .subheader th {
            background: white !important;
            font-size: 12px; /* Standard font size for subheaders */
            height: 22px; /* Reduced height for better spacing */
            font-weight: 500; /* Consistent bold weight */
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            padding: 3px 1px; /* Consistent with main headers */
            line-height: 1.1;
            text-align: center; /* Center align subheaders */
            vertical-align: middle; /* Center vertically */
          }
          .total-row {
            background: white !important;
            font-weight: 500; /* Bolder total row for emphasis */
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            border-top: 0.2px solid black; /* Solid border for total row */
          }
          .total-row .total-label {
            text-align: right !important;
            font-size: 12px;
            font-weight: 500; /* Bold total label */
            padding-right: 10px; /* Reduced padding */
          }
          .total-row td {
            font-weight: 500; /* Bold total values */
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

  // Create preview window first
  const previewWindow = window.open(
    "",
    "_blank",
    "width=1200,height=800,scrollbars=yes,resizable=yes"
  );

  if (previewWindow) {
    // Add preview HTML with print button
    const previewHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Preview - SPG IMPORT</title>
        <style>
          body {
            margin: 0;
            padding: 10px 20px 20px 20px;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
          }
          .preview-container {
            max-width: 1200px;
            margin: 20px auto 0 auto;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            top: 0;
          }
          .preview-header {
            background: #2563eb;
            color: white;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .preview-title {
            font-size: 18px;
            font-weight: 600;
            margin: 0;
          }
          .preview-actions {
            display: flex;
            gap: 10px;
          }
          .btn {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.2s;
          }
          .btn-print {
            background: #16a34a;
            color: white;
          }
          .btn-print:hover {
            background: #15803d;
          }
          .btn-close {
            background: #dc2626;
            color: white;
          }
          .btn-close:hover {
            background: #b91c1c;
          }
          .preview-content {
            padding: 20px;
            background: white;
          }
          .document-frame {
            border: 1px solid #d1d5db;
            border-radius: 4px;
            overflow: hidden;
            background: white;
          }
          iframe {
            width: 100%;
            height: 800px;
            border: none;
            display: block;
          }
          .preview-info {
            background: #f8fafc;
            padding: 15px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="preview-container">
          <div class="preview-header">
            <h1 class="preview-title">Preview - Surat Penerimaan Gudang (SPG) Import</h1>
            <div class="preview-actions">
              <button class="btn btn-print" onclick="printDocument()">
                <span>🖨️</span> Print Document
              </button>
              <button class="btn btn-close" onclick="window.close()">
                <span>✕</span> Close
              </button>
            </div>
          </div>
          <div class="preview-info">
            <strong>Petunjuk:</strong> Ini adalah preview dokumen yang akan dicetak dalam format landscape. Klik "Print Document" untuk melanjutkan ke proses print, atau "Close" untuk membatalkan.
          </div>
          <div class="preview-content">
            <div class="document-frame">
              <iframe src="${url}" title="Document Preview"></iframe>
            </div>
          </div>
        </div>

        <script>
          function printDocument() {
            // Open print window with the document
            const printWindow = window.open("${url}", "_blank");
            
            if (printWindow) {
              // Wait for content to load then focus and setup print
              printWindow.onload = () => {
                printWindow.focus();
                setTimeout(() => {
                  printWindow.print();
                  printWindow.close();
                }, 250);
              };

              // Fallback if onload doesn't trigger
              setTimeout(() => {
                if (printWindow && !printWindow.closed) {
                  printWindow.focus();
                  printWindow.print();
                  printWindow.close();
                }
              }, 1000);
              
              // Close preview window after initiating print
              setTimeout(() => {
                window.close();
              }, 500);
            } else {
              alert('Pop-up diblokir! Silakan izinkan pop-up untuk website ini.');
            }
          }

          // Clean up URL when preview window is closed
          window.addEventListener('beforeunload', () => {
            URL.revokeObjectURL("${url}");
          });
        </script>
      </body>
      </html>
    `;

    previewWindow.document.write(previewHtml);
    previewWindow.document.close();
    previewWindow.focus();
  } else {
    // Fallback: if preview window blocked, directly open print window
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
  }
};
