import { formatNumberWithDot } from "./numberUtils";

export const printSPGLain = (data) => {
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
        <title>SPG LAIN - ${
          data.document_number || data.sj_number || data.id
        }</title>
        <style>
          @page {
            margin: 0; /* Custom margin - set to zero for manual control */
            size: 9.5in 11in; /* Portrait size for continuous form */
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
              // width: 100% !important;
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
            font-family: 'Liberation Mono', 'Consolas', 'Courier New', Courier, monospace;
            margin: 10mm 5mm 5mm 5mm; /* Top margin larger for header space */
            padding: 0;
            width: calc(100% - 10mm); /* Adjust width based on equal margins */
            max-width: 8.1in; /* Reduced max-width significantly */
            font-size: 13px; /* Adjusted for LX-310 readability */
            line-height: 1.3; /* Tighter line spacing for dot matrix */
            color: black;
            font-weight: 400;
            /* ESC/P compatible character spacing */
            letter-spacing: 0.5px;
            /* Force content to start from top */
            display: block;
            position: relative;
            top: 0;
            vertical-align: top;
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
            font-size: 13px; /* Optimized for dot matrix clarity */
            font-weight: 700; /* Bolder for better dot matrix visibility */
            margin: 0;
            letter-spacing: 1.5px; /* Reduced for better character definition */
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
            min-width: 85px; /* Slightly reduced */
            font-size: 11px; /* Optimized for clarity */
          }
          .infoRow .value {
            font-weight: 500; /* Slightly bolder for better visibility */
            font-size: 11px; /* Consistent with label */
          }
          .infoRow .sj {
            margin-left: 32px;
          }
          table {
            width: 100%;
            border-collapse: collapse; /* Changed to collapse for cleaner borders */
            border-spacing: 0; /* No spacing between cells */
            margin: 0 auto 20px auto; /* Center table */
            border: 0.1px solid black; /* Solid border for table */
            font-size: 11px; /* Optimized for LX-310 clarity */
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
            font-size: 11px; /* Optimized for clarity */
            line-height: 1.2; /* Optimized line height for dot matrix */
            word-break: keep-all;
            white-space: nowrap;
            height: auto; /* Allow natural height */
            min-height: 18px; /* Reduced minimum row height */
            box-sizing: border-box; /* Include padding in width calculation */
          }
          th {
            background: white !important;
            font-weight: 600; /* Consistent bold weight for headers */
            font-size: 11px; /* Optimized for clarity */
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
            font-size: 12px; /* Smaller for better code readability */
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
            font-weight: 500; /* Slightly bolder for better visibility */
            font-size: 12px; /* Optimized for clarity */
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
            font-size: 12px; /* Slightly larger for numbers */
          }
          .col-pack { 
            width: 35px; 
            font-weight: 400;
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
            font-size: 12px; /* Consistent with main headers */
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
          <h1>SURAT PENERIMAAN GUDANG (SPG) LAIN</h1>
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
              <span class="label">No. SJ  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
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
