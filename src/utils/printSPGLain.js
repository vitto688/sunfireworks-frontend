import { formatNumberWithDot } from "./numberUtils";

export const printSPGLain = (data, itemsPerPage = 7) => {
  // Calculate pagination
  const items = data.items || [];
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Generate pages HTML
  const generatePagesHTML = () => {
    let pagesHTML = "";

    for (let page = 0; page < totalPages; page++) {
      const startIndex = page * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, items.length);
      const pageItems = items.slice(startIndex, endIndex);

      // Generate rows for current page
      const rowsHTML = pageItems
        .map((item) => {
          return `
          <tr>
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
        `;
        })
        .join("");

      // Calculate total for current page only
      const pageCartonTotal = pageItems.reduce(
        (sum, item) => sum + (item.carton_quantity || 0),
        0
      );
      const pagePackTotal = pageItems.reduce(
        (sum, item) => sum + (item.pack_quantity || 0),
        0
      );

      // Pagination control - no page breaks for continuous printing
      const pageBreakClass = "";
      const isFirstPage = page === 0;
      const isFirstOnNewPaper = false;
      const sectionHeightClass = isFirstPage ? "first-page" : "other-page";
      const isOddPage = (page + 1) % 2 === 1;
      const oddPageNotFirstClass =
        isOddPage && !isFirstPage ? "odd-page-not-first" : "";

      pagesHTML += `
        <div class="page-container ${pageBreakClass} ${
        !isFirstPage ? "next-page" : ""
      } ${
        isFirstOnNewPaper ? "first-on-paper" : ""
      } ${sectionHeightClass} ${oddPageNotFirstClass}">
          <div class="header">
            <h1>SURAT PENERIMAAN GUDANG (SPG) LAIN</h1>
          </div>

          <div class="documentInfo">
            <div class="leftInfo">
              <div class="infoRow">
                <span class="label">Tanggal </span>
                <span class="value">: ${new Date(
                  data.transaction_date || data.created_at || new Date()
                ).toLocaleDateString("id-ID")}</span>
              </div>
              <div class="infoRow">
                <span class="label">No. SPG </span>
                <span class="value">: ${
                  data.document_number || data.sj_number || data.id
                }</span>
              </div>
            </div>
            <div class="rightInfo">
              <div class="infoRow">
                <span class="label">No. SJ </span>
                <span class="value">: ${data.sj_number || "-"}</span>
              </div>
              <div class="infoRow">
                <span class="label">Gudang Tujuan </span>
                <span class="value">: ${data.warehouse_name || "-"}</span>
              </div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th rowspan="2" class="col-kode-head">KODE PRODUK</th>
                <th rowspan="2" class="col-barcode-head">BARCODE</th>
                <th rowspan="2" class="col-nama-head">NAMA PRODUK</th>
                <th rowspan="2" class="col-kp-head">KP</th>
                <th rowspan="2" class="col-packing-head">PACKING</th>
                <th colspan="2">JUMLAH</th>
              </tr>
              <tr class="subheader">
                <th class="col-carton-head">CARTON</th>
                <th class="col-pack-head">PACK</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHTML}
              <tr class="total-row">
                <td colspan="5" class="total-label">TOTAL</td>
                <td class="col-carton">${formatNumberWithDot(
                  pageCartonTotal
                )}</td>
                <td class="col-pack">${formatNumberWithDot(pagePackTotal)}</td>
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
        </div>
      `;
    }

    return pagesHTML;
  };

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
            margin: 0;
            padding: 0;
            size: letter;
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
              size: letter !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .page-break {
              page-break-after: always;
              break-after: always;
            }
            
            .page-container {
              box-sizing: border-box !important;
            }
            
            .page-container.first-page {
              height: 5.5in !important;
            }
            
            .page-container.other-page {
              height: 5.5in !important;
            }
            
            .page-container.odd-page-not-first {
              padding-top: 40px !important;
            }
            
            .page-container.next-page {
              margin-top: 0 !important;
            }
            
            .page-container.first-on-paper {
              margin-top: 0 !important;
              padding-top: 0 !important;
            }
            
            body {
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              position: relative !important;
              top: 0 !important;
              vertical-align: top !important;
              display: block !important;
            }
            
            table {
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
            margin: 0;
            padding: 0;
            width: 100%;
            font-size: 11px;
            line-height: 1.2;
            color: black;
            font-weight: 100;
            letter-spacing: 0.2px;
            display: block;
            position: relative;
            top: 0;
            vertical-align: top;
            text-align: left;
          }
          
          .page-container {
            position: relative;
            width: 100%;
            padding: 0.3in 0.4in;
            box-sizing: border-box;
            overflow: hidden;
          }
          
          .page-container.first-page {
            height: 5.5in;
          }
          
          .page-container.other-page {
            height: 5.5in;
          }
          
          .page-container.odd-page-not-first {
            padding-top: 40px !important;
          }
          
          .page-container.next-page {
            margin-top: 0;
            padding-top: 0.3in;
          }
          
          .page-container.first-on-paper {
            margin-top: 0;
            padding-top: 0.5in;
          }
          
          .page-break {
            page-break-after: always;
            break-after: always;
          }
          
          .header {
            text-align: center;
            margin-bottom: 10px;
            border-bottom: 0.1px solid black;
            padding-bottom: 4px;
            padding-top: 20px;
          }
          
          .header h1 {
            font-size: 13px;
            font-weight: 400;
            margin: 0;
            letter-spacing: 1.0px;
            text-transform: uppercase;
          }
          .documentInfo {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            letter-spacing: 0.5px;
            gap: 15px;
          }
          .leftInfo, .rightInfo {
            flex: 1;
          }
          .infoRow {
            display: flex;
            gap: 3px;
            align-items: center;
            margin-bottom: 3px;
          }
          .infoRow .label {
            font-weight: 200;
            min-width: 70px;
            font-size: 9px;
          }
          .infoRow .value {
            font-weight: 100;
            font-size: 11px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            margin: 0 auto 10px auto;
            border: 0.1px solid black;
            font-size: 9px;
            table-layout: fixed;
            min-height: auto;
            vertical-align: top;
            position: relative;
          }
          th, td {
            border: 0.1px solid black;
            padding: 1px 1px;
            text-align: center;
            vertical-align: top;
            font-size: 9px;
            line-height: 1.0;
            word-break: keep-all;
            white-space: nowrap;
            height: auto;
            min-height: 10px;
            box-sizing: border-box;
          }
          th {
            background: white !important;
            font-weight: 200;
            font-size: 9px;
            height: 14px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            line-height: 1.0;
            text-align: center;
            vertical-align: middle;
            padding: 1px 1px;
          }
          /* Column widths optimized for SPG Lain documents */
          .col-kode { 
            width: 120px; 
            font-size: 9px;
            padding: 2px 1px;
            word-break: break-all;
            white-space: normal;
            line-height: 1.1;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
          }
          .col-kode-head { 
            width: 120px; 
            font-size: 9px;
            padding: 2px 1px;
            word-break: break-all;
            white-space: normal;
            line-height: 1.1;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
          }
          .col-barcode { 
            width: 63px; 
            font-size: 9px;
            padding: 2px 1px;
            word-break: break-all;
            white-space: normal;
            line-height: 1.1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-barcode-head { 
            width: 63px; 
            font-size: 9px;
            padding: 2px 1px;
            word-break: break-all;
            white-space: normal;
            line-height: 1.1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-nama { 
            width: 300px; 
            font-size: 9px;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
          }
          .col-nama-head { 
            width: 300px; 
            font-size: 9px;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
          }
          .col-kp { 
            width: 60px; 
            font-size: 9px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-kp-head { 
            width: 60px; 
            font-size: 9px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-packing { 
            width: 60px; 
            font-size: 9px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-packing-head { 
            width: 60px; 
            font-size: 9px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-carton { 
            width: 10px; 
            font-weight: 200;
            font-size: 9px;
          }
          .col-carton-head { 
            width: 10px; 
            font-weight: 200;
            font-size: 9px;
          }
          .col-pack { 
            width: 10px; 
            font-weight: 200;
            font-size: 9px;
          }
          .col-pack-head { 
            width: 10px; 
            font-weight: 200;
            font-size: 9px;
          }
          
          /* Data row specific styling to prevent overlapping */
          tbody tr {
            height: auto;
            min-height: 12px;
          }
          
          tbody td {
            height: auto;
            min-height: 10px;
            vertical-align: top;
          }
          .subheader th {
            background: white !important;
            font-size: 9px;
            height: 12px;
            font-weight: 200;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            padding: 1px 1px;
            line-height: 1.0;
            text-align: center;
            vertical-align: middle;
          }
          .total-row {
            background: white !important;
            font-weight: 200;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            border-top: 0.2px solid black;
          }
          .total-row .total-label {
            text-align: right !important;
            font-size: 9px;
            font-weight: 200;
            padding-right: 8px;
          }
          .total-row td {
            font-weight: 200;
            font-size: 9px;
          }
          .footer {
            padding: 8px;
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
          }
          .notesSection {
            margin-bottom: 20px;
          }
          .notesLabel {
            font-size: 9px;
            font-weight: 100;
            margin-bottom: 5px;
          }
          .notesContent {
            font-size: 9px;
            line-height: 1.3;
            font-weight: 100;
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
            font-size: 13px;
            font-weight: 100;
          }
          .signatureRight {
            margin-top: 40px;
          }
        </style>
      </head>
      <body>
        ${generatePagesHTML()}
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
        <title>Preview - SPG LAIN</title>
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
            font-size: 12px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="preview-container">
          <div class="preview-header">
            <h1 class="preview-title">Preview - Surat Penerimaan Gudang (SPG) Lain</h1>
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
