import { formatNumberWithDot } from "./numberUtils";

export const printSPB = (data) => {
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
        <title>SPB - ${
          data.document_number || data.spb_number || data.id
        }</title>
        <style>
          @page {
            margin: 0; /* Custom margin - set to zero for manual control */
            size: 9.5in 11in; /* Back to correct portrait size for continuous form */
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
              size: 9.5in 11in !important; /* Portrait orientation for physical printer */
              margin: 0 !important; /* Custom margin control */
            }
            
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            body {
              margin: 5mm; /* Equal margins on all sides */
              padding: 0 !important;
              width: 100% !important;
              /* Force content to start from absolute top */
              position: relative !important;
              top: 0 !important;
              vertical-align: top !important;
              display: block !important;
            }
            
            /* Ensure proper page breaks for continuous form */
            .page-break {
              page-break-before: always;
            }
            
            /* Optimize for dot matrix printing */
            table {
              page-break-inside: avoid;
              /* Force table alignment to top */
              vertical-align: top !important;
              position: relative !important;
              margin-top: 0 !important;
            }
            
            /* Fix overlapping rows in print */
            tbody tr {
              min-height: 25px !important;
              height: auto !important;
            }
            
            tbody td {
              min-height: 20px !important;
              height: auto !important;
              padding: 6px 4px !important;
              line-height: 1.4 !important;
              /* Force top alignment in print */
              vertical-align: top !important;
            }
            
            th {
              min-height: 25px !important;
              height: 25px !important;
              padding: 4px 2px !important; /* Consistent header padding */
              /* Force top alignment in print */
              vertical-align: middle !important; /* Center align in print */
              font-size: 12px !important; /* Consistent header font size */
              font-weight: 400 !important; /* Normal weight */
              text-align: center !important; /* Center align text */
            }
         
          }
          body {
            font-family: 'Courier New', Courier, monospace;
            margin: 10mm auto 5mm auto; /* Top margin larger, auto horizontal centering */
            padding: 0;
            width: calc(100% - 10mm); /* Adjust width based on equal margins */
            max-width: 8.1in; /* Reduced max-width significantly */
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
            font-weight: 400; /* Normal weight */
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
            font-weight: 400; /* Normal weight */
            min-width: 85px; /* Slightly reduced */
            font-size: 12px; /* Standard font size */
          }
          .infoRow .value {
            font-weight: 400; /* Normal weight */
            font-size: 12px; /* Standard font size */
          }
          table {
            width: 100%;
            border-collapse: collapse; /* Changed to collapse for cleaner borders */
            border-spacing: 0; /* No spacing between cells */
            margin: 0 auto 20px auto; /* Center table */
            border: 0.1px solid black; /* Solid border for table */
            font-size: 12px; /* Optimized for LX-310 */
            /* ESC/P table spacing */
            table-layout: fixed;
            /* Prevent table compression */
            min-height: auto;
            /* Force table to top */
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
            /* Default text handling */
            word-break: keep-all;
            white-space: nowrap;
            height: auto; /* Allow natural height */
            min-height: 18px; /* Reduced minimum row height */
            box-sizing: border-box; /* Include padding in width calculation */
          }
          th {
            background: white !important;
            font-weight: 400; /* Normal weight for headers */
            font-size: 12px; /* Standard font size */
            height: 22px; /* Reduced height for headers */
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            line-height: 1.1; /* Tighter line height for headers */
            text-align: center; /* Center align all headers */
            vertical-align: middle; /* Center vertically in header cells */
            padding: 3px 1px; /* Reduced padding for headers */
          }
          /* Column widths optimized for Epson LX-310 9.5" portrait continuous form */
          .col-no { 
            width: 35px; 
            font-size: 12px;
          }
          .col-kode { 
            width: 110px; 
            font-size: 12px; /* Standard font size */
            padding: 4px 1px; /* Reduced horizontal padding for better fit */
            word-break: break-all; /* Allow breaking long codes */
            white-space: normal; /* Allow wrapping if needed */
            line-height: 1.1; /* Tighter line spacing */
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-barcode { 
            width: 60px; 
            font-size: 12px;
            padding: 4px 1px; /* Consistent with kode column */
            word-break: break-all; /* Allow breaking if needed */
            white-space: normal; /* Allow wrapping if needed */
            line-height: 1.1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-nama { 
            width: 290px; 
            padding-left: 3px;
            font-weight: 400; /* Normal weight */
            font-size: 12px; /* Standard font size */
            text-align: left; /* Left align for product names */
            /* Prevent text wrapping issues */
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-kp { 
            width: 35px; 
            font-size: 12px;
          }
          .col-packing { 
            width: 65px; 
            font-size: 12px;
            /* Prevent wrapping */
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-carton { 
            width: 35px; 
            font-weight: 400;
            font-size: 12px; /* Standard font size */
          }
          .col-pack { 
            width: 35px; 
            font-size: 12px;
          }
          
          /* Data row specific styling to prevent overlapping */
          tbody tr {
            height: auto;
            min-height: 25px; /* Minimum row height */
          }
          
          tbody td {
            height: auto;
            min-height: 20px; /* Ensure minimum cell height */
            vertical-align: top; /* Align content to top */
          }
          .subheader th {
            background: white !important;
            font-size: 12px; /* Standard font size for subheaders */
            height: 22px; /* Reduced height for better spacing */
            font-weight: 400; /* Normal weight */
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            padding: 3px 1px; /* Consistent with main headers */
            line-height: 1.1;
            text-align: center; /* Center align subheaders */
            vertical-align: middle; /* Center vertically */
          }
          .total-row {
            background: white !important;
            font-weight: 400; /* Normal weight for total row */
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            border-top: 0.2px solid black; /* Solid border for total row */
          }
          .total-row .total-label {
            text-align: right !important;
            font-size: 12px;
            font-weight: 400; /* Normal weight for total label */
            padding-right: 10px; /* Reduced padding */
          }
          .total-row td {
            font-weight: 400; /* Normal weight for total values */
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
          <h1>SURAT PENGELUARAN BARANG (SPB)</h1>
        </div>

        <div class="documentInfo">
          <div class="leftInfo">
            <div class="infoRow">
              <span class="label">TANGGAL :</span>
              <span class="value">${new Date(
                data.created_at || data.transaction_date
              ).toLocaleDateString("id-ID")}</span>
            </div>
            <div class="infoRow">
              <span class="label">NO SPB &nbsp;:</span>
              <span class="value">${
                data.document_number || data.spb_number || data.id
              }</span>
            </div>
          </div>
          <div class="rightInfo">
            <div class="infoRow">
              <span class="label">GUDANG TUJUAN &nbsp;:</span>
              <span class="value">${data.warehouse_name || "-"}</span>
            </div>
            <div class="infoRow">
              <span class="label">NO SURAT JALAN :</span>
              <span class="value">${data.sj_number || "-"}</span>
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
                <td class="col-nama">${item.product_name || ""}</td>
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
              <p>CATATAN :</p>
            </div>
            <div class="notesContent">
              ${data.notes || "-"}
            </div>
          </div>
          
          <div class="signatureSection">
            <div class="signatureLeft">
              <p>Yang menyerahkan,</p>
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

  // Create preview window first
  const previewWindow = window.open(
    "",
    "_blank",
    "width=1000,height=800,scrollbars=yes,resizable=yes"
  );

  if (previewWindow) {
    // Add preview HTML with print button
    previewWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Preview - SPB ${
          data.document_number || data.spb_number || data.id
        }</title>
        <style>
          body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background: #f5f5f5;
          }
          .preview-controls {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 1000;
            display: flex;
            gap: 10px;
          }
          .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 400;
          }
          .btn-print {
            background: #007cba;
            color: white;
          }
          .btn-print:hover {
            background: #005a87;
          }
          .btn-close {
            background: #dc3545;
            color: white;
          }
          .btn-close:hover {
            background: #c82333;
          }
          .preview-container {
            max-width: 1000px;
            margin: 50px auto 20px auto;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            border-radius: 5px;
            overflow: hidden;
          }
          iframe {
            width: 100%;
            height: 800px;
            border: none;
          }
        </style>
      </head>
      <body>
        <div class="preview-controls">
          <button class="btn btn-print" onclick="printDocument()">🖨️ Print</button>
          <button class="btn btn-close" onclick="window.close()">❌ Close</button>
        </div>
        <div class="preview-container">
          <iframe id="printFrame" src="${url}"></iframe>
        </div>
        <script>
          function printDocument() {
            const frame = document.getElementById('printFrame');
            frame.contentWindow.focus();
            frame.contentWindow.print();
          }
          
          // Auto-cleanup when window closes
          window.addEventListener('beforeunload', function() {
            URL.revokeObjectURL('${url}');
          });
        </script>
      </body>
      </html>
    `);
    previewWindow.document.close();
  } else {
    // Fallback if popup is blocked - direct print
    const printWindow = window.open(url, "_blank");

    if (printWindow) {
      printWindow.onload = () => {
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
          URL.revokeObjectURL(url);
        }, 250);
      };

      setTimeout(() => {
        if (printWindow && !printWindow.closed) {
          printWindow.focus();
          printWindow.print();
          printWindow.close();
          URL.revokeObjectURL(url);
        }
      }, 1000);
    } else {
      URL.revokeObjectURL(url);
      window.print();
    }
  }
};
