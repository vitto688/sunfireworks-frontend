import { formatNumberWithDot } from "./numberUtils";

export const printReturPenjualan = (data) => {
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
        <title>RETUR PENJUALAN - ${
          data.document_number || data.sj_number || data.id
        }</title>
        <style>
          @page {
            margin: 0; /* Custom margin - set to zero for manual control */
            size: A4; /* A4 size for documents */
            /* Print settings */
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
          
          @media print {
            @page {
              size: A4 !important;
              margin: 0 !important; /* Custom margin control */
            }
            
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            body {
              margin: 0 auto 5mm auto; /* Top margin larger, auto horizontal centering */
              padding: 0 !important;
              width: 100%; /* Adjust width based on margins */
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
              vertical-align: top !important;
              font-size: 12px !important; /* Increased by 1 point */
              font-weight: 100 !important; /* Reduced by another 100 points */
            }
            
            th {
              min-height: 25px !important;
              height: 25px !important;
              padding: 4px 2px !important;
              vertical-align: middle !important;
              font-size: 11px !important; /* Increased by 1 point */
              font-weight: 200 !important; /* Reduced by another 100 points */
              text-align: center !important;
            }
            
            .col-kode {
              font-size: 13px !important; /* Increased by 1 point */
              padding: 6px 2px !important;
              word-break: break-all !important;
              white-space: normal !important;
              line-height: 1.2 !important;
            }

            .col-kode-head {
              font-size: 11px !important; /* Increased by 1 point */
              padding: 6px 2px !important;
              word-break: break-all !important;
              white-space: normal !important;
              line-height: 1.2 !important;
            }
            
            .col-barcode {
              font-size: 11px !important; /* Increased by 1 point */
              padding: 6px 2px !important;
              word-break: break-all !important;
              white-space: normal !important;
              line-height: 1.2 !important;
            }

            .col-barcode-head {
              font-size: 11px !important; /* Increased by 1 point */
              padding: 6px 2px !important;
              word-break: break-all !important;
              white-space: normal !important;
              line-height: 1.2 !important;
            }
         
          }
          body {
            font-family: Arial, sans-serif;
            margin: 10mm auto 5mm auto; /* Top margin larger, auto horizontal centering */
            padding: 0;
            width: 100%; /* Adjust width based on margins */
            font-size: 11px; /* Increased by 1 point */
            line-height: 1.2; /* Tighter line spacing for 10cpi */
            color: black;
            font-weight: 100; /* Reduced by another 100 points */
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
            font-size: 14px; /* Increased by 1 point */
            font-weight: 300; /* Reduced by another 100 points */
            margin: 0;
            letter-spacing: 1.0px; /* Character spacing */
            text-transform: uppercase;
          }
          .documentInfo {
            display: flex;
            justify-content: space-between;
            margin-bottom: 25px; /* Reduced spacing */
            letter-spacing: 1.0px; /* Character spacing */
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
            font-weight: 200; /* Reduced by another 100 points */
            min-width: 85px; /* Slightly reduced */
            font-size: 11px; /* Increased by 1 point */
          }
          .infoRow .value {
            font-weight: 100; /* Reduced by another 100 points */
            font-size: 11px; /* Increased by 1 point */
          }
          .infoRowBigger {
            display: flex;
            gap: 12px; /* Reduced gap */
            align-items: center;
            margin-bottom: 6px; /* Tighter spacing */
          }
          .infoRowBigger .label {
            font-weight: 200; /* Reduced by another 100 points */
            min-width: 85px; /* Slightly reduced */
            font-size: 12px; /* Increased by 1 point */
          }
          .infoRowBigger .value {
            font-weight: 100; /* Reduced by another 100 points */
            font-size: 12px; /* Increased by 1 point */
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
            font-size: 11px; /* Increased by 1 point */
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
            font-size: 12px; /* Increased by 1 point */
            word-break: keep-all;
            white-space: nowrap;
            height: auto; /* Allow natural height */
            min-height: 18px; /* Reduced minimum row height */
            box-sizing: border-box; /* Include padding in width calculation */
          }
          th {
            background: white !important;
            font-weight: 200; /* Reduced by another 100 points */
            font-size: 11px; /* Increased by 1 point */
            height: 22px; /* Reduced height for headers */
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            text-align: center; /* Center align all headers */
            vertical-align: middle; /* Center vertically in header cells */
            padding: 3px 1px; /* Reduced padding for headers */
          }
          /* Column widths optimized for A4 portrait form */
          .col-no { 
            width: 35px; 
            font-size: 11px; /* Increased by 1 point */
          }
          .col-kode { 
            width: 110px; 
            font-size: 13px; /* Increased by 1 point */
            padding: 4px 1px; /* Reduced horizontal padding for better fit */
            word-break: break-all; /* Allow breaking long codes */
            white-space: normal; /* Allow wrapping if needed */
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
          }
          .col-kode-head { 
            width: 110px; 
            font-size: 11px; /* Increased by 1 point */
            padding: 4px 1px; /* Reduced horizontal padding for better fit */
            word-break: break-all; /* Allow breaking long codes */
            white-space: normal; /* Allow wrapping if needed */
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
          }
          .col-barcode { 
            width: 75px; 
            font-size: 11px; /* Increased by 1 point */
            padding: 4px 1px; /* Consistent with kode column */
            word-break: break-all; /* Allow breaking if needed */
            white-space: normal; /* Allow wrapping if needed */
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-barcode-head { 
            width: 75px; 
            font-size: 11px; /* Increased by 1 point */
            padding: 4px 1px; /* Consistent with kode column */
            word-break: break-all; /* Allow breaking if needed */
            white-space: normal; /* Allow wrapping if needed */
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-nama { 
            width: 290px; 
            font-size: 13px; /* Increased by 1 point */
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
          }
          .col-nama-head { 
            width: 290px; 
            font-size: 11px; /* Increased by 1 point */
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
          }
          .col-kp { 
            width: 35px; 
            font-size: 11px; /* Increased by 1 point */
          }
          .col-kp-head { 
            width: 35px; 
            font-size: 11px; /* Increased by 1 point */
          }
          .col-packing { 
            width: 65px; 
            font-size: 13px; /* Increased by 1 point */
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-packing-head { 
            width: 65px; 
            font-size: 11px; /* Increased by 1 point */
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-carton { 
            width: 35px; 
            font-weight: 200; /* Reduced by another 100 points */
            font-size: 11px; /* Increased by 1 point */
          }
          .col-carton-head { 
            width: 35px; 
            font-weight: 200; /* Reduced by another 100 points */
            font-size: 11px; /* Increased by 1 point */
          }
          .col-pack { 
            width: 35px; 
            font-weight: 200; /* Reduced by another 100 points */
            font-size: 11px; /* Increased by 1 point */
          }
          .col-pack-head { 
            width: 35px; 
            font-weight: 200; /* Reduced by another 100 points */
            font-size: 11px; /* Increased by 1 point */
          }
          
          /* Data row specific styling to prevent overlapping */
          tbody tr {
            height: auto;
            min-height: 20px; /* Minimum row height */
          }
          
          tbody td {
            height: auto;
            min-height: 20px; /* Ensure minimum cell height */
            vertical-align: top; /* Align content to top */
          }
          .subheader th {
            background: white !important;
            font-size: 11px; /* Increased by 1 point */
            height: 22px; /* Reduced height for better spacing */
            font-weight: 200; /* Reduced by another 100 points */
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            padding: 3px 1px; /* Consistent with main headers */
            line-height: 1.1;
            text-align: center; /* Center align subheaders */
            vertical-align: middle; /* Center vertically */
          }
          .total-row {
            background: white !important;
            font-weight: 200; /* Reduced by another 100 points */
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            border-top: 0.2px solid black; /* Solid border for total row */
          }
          .total-row .total-label {
            text-align: right !important;
            font-size: 11px; /* Increased by 1 point */
            font-weight: 200; /* Reduced by another 100 points */
            padding-right: 10px; /* Reduced padding */
          }
          .total-row td {
            font-weight: 200; /* Reduced by another 100 points */
            font-size: 11px; /* Increased by 1 point */
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
            font-size: 11px; /* Increased by 1 point */
            font-weight: 100; /* Reduced by another 100 points */
            margin-bottom: 10px;
          }
          .notesContent {
            font-size: 11px; /* Increased by 1 point */
            line-height: 1.5;
            font-weight: 100; /* Reduced by another 100 points */
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
            font-size: 11px; /* Increased by 1 point */
            font-weight: 100; /* Reduced by another 100 points */
          }
          .signatureRight {
            margin-top: 50px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>RETUR PENJUALAN</h1>
        </div>

        <div class="documentInfo">
          <div class="leftInfo">
            <div class="infoRow">
              <span class="label">Tanggal &nbsp;&nbsp;&nbsp;&nbsp;:</span>
              <span class="value">${new Date(
                data.transaction_date
              ).toLocaleDateString("id-ID")}</span>
            </div>
            <div class="infoRow">
              <span class="label">No. Faktur :</span>
              <span class="value">${
                data.document_number || data.sj_number || data.id
              }</span>
            </div>
          </div>
          <div class="rightInfo">
            <div class="infoRow">
              <span class="label">No. SJ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
              <span class="value">${data.sj_number || "-"}</span>
            </div>
            <div class="infoRow">
              <span class="label">Gudang Asal :</span>
              <span class="value">${data.warehouse_name || "-"}</span>
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th rowspan="2" class="col-no-head">NO</th>
              <th rowspan="2" class="col-kode-head">KODE PRODUK</th>
              <th rowspan="2" class="col-barcode-head">BARCODE</th>
              <th rowspan="2" class="col-nama-head">NAMA PRODUK</th>
              <th rowspan="2" class="col-kp-head">KP</th>
              <th rowspan="2" class="col-packing-head">PACKING</th>
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

  // Create preview window first
  const previewWindow = window.open(
    "",
    "_blank",
    "width=1000,height=800,scrollbars=yes,resizable=yes"
  );

  if (previewWindow) {
    // Add preview HTML with print button
    const previewHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Preview - RETUR PENJUALAN</title>
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
            max-width: 1000px;
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
            font-size: 12px;
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
            <h1 class="preview-title">Preview - Retur Penjualan</h1>
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
            <strong>Petunjuk:</strong> Ini adalah preview dokumen yang akan dicetak. Klik "Print Document" untuk melanjutkan ke proses print, atau "Close" untuk membatalkan.
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
