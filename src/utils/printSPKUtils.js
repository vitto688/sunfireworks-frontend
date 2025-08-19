import { formatNumberWithDot, formatDate } from "./numberUtils";

// Function to generate Excel file from SPK data
export const exportSPKToExcel = (data, filters = {}) => {
  // Calculate totals
  const totalCarton =
    data.items?.reduce((sum, item) => sum + (item.carton_quantity || 0), 0) ||
    0;
  const totalPack =
    data.items?.reduce((sum, item) => sum + (item.pack_quantity || 0), 0) || 0;

  // Create filter info string
  const createFilterInfo = () => {
    let filterText = [];
    if (filters.start_date && filters.end_date) {
      filterText.push(
        `Periode: ${formatDate(filters.start_date)} - ${formatDate(
          filters.end_date
        )}`
      );
    }
    if (filters.customer && filters.customer !== 0) {
      filterText.push(`Customer: ${filters.customer}`);
    }
    if (filters.warehouse && filters.warehouse !== 0) {
      filterText.push(`Gudang: ${filters.warehouse}`);
    }
    if (filters.search) {
      filterText.push(`Pencarian: ${filters.search}`);
    }
    return filterText.length > 0 ? filterText.join(" | ") : "Semua Data";
  };

  // Create CSV content (Excel-compatible)
  const csvContent = [];

  // Header information
  csvContent.push(["SURAT PERINTAH KERJA (SPK)"]);
  csvContent.push(["SUN FIREWORKS"]);
  csvContent.push([""]);
  csvContent.push([
    "No. SPK:",
    data.document_number || data.spk_number || data.id,
  ]);
  csvContent.push(["Tanggal:", formatDate(data.created_at)]);
  csvContent.push(["Customer:", data.customer_name || "-"]);
  csvContent.push(["UP:", data.customer_upline || "-"]);
  csvContent.push(["Alamat:", data.customer_address || "-"]);
  csvContent.push([""]);
  csvContent.push(["Filter:", createFilterInfo()]);
  csvContent.push(["Total Item:", `${data.items?.length || 0} item`]);
  csvContent.push(["Tanggal Export:", formatDate(new Date())]);
  csvContent.push([""]);

  // Table headers
  csvContent.push([
    "NO",
    "KODE PRODUK",
    "BARCODE",
    "NAMA PRODUK",
    "KP",
    "PACKING",
    "CARTON",
    "PACK",
  ]);

  // Table data
  if (data.items?.length > 0) {
    data.items.forEach((item, index) => {
      csvContent.push([
        index + 1,
        item.product_code || "-",
        "-",
        item.product_name || "-",
        item.supplier_name || "-",
        item.packing || "-",
        item.carton_quantity || 0,
        item.pack_quantity || 0,
      ]);
    });

    // Total row
    csvContent.push(["", "", "", "", "", "TOTAL", totalCarton, totalPack]);
  } else {
    csvContent.push([
      "",
      "",
      "",
      "Tidak ada item SPK yang ditemukan",
      "",
      "",
      "",
      "",
    ]);
  }

  // Notes section
  csvContent.push([""]);
  csvContent.push(["CATATAN:"]);
  csvContent.push([data.notes || "-"]);

  // Convert to CSV string
  const csvString = csvContent
    .map((row) =>
      row
        .map((cell) => {
          const cellString = String(cell || "");
          if (
            cellString.includes(",") ||
            cellString.includes('"') ||
            cellString.includes("\n")
          ) {
            return `"${cellString.replace(/"/g, '""')}"`;
          }
          return cellString;
        })
        .join(",")
    )
    .join("\n");

  // Add BOM for proper UTF-8 encoding in Excel
  const BOM = "\uFEFF";
  const finalCsvContent = BOM + csvString;

  // Create and download file
  const blob = new Blob([finalCsvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);

  // Generate filename with current date
  const currentDate = new Date().toISOString().split("T")[0];
  const spkNumber = data.document_number || data.spk_number || data.id;
  const filename = `SPK_${spkNumber}_${currentDate}.csv`;
  link.setAttribute("download", filename);

  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up
  URL.revokeObjectURL(url);

  return filename;
};

// Enhanced Excel export using XLSX library
export const exportSPKToExcelAdvanced = (data, filters = {}, XLSX = null) => {
  try {
    // Check if XLSX library is available
    if (!XLSX && typeof window.XLSX === "undefined") {
      console.warn("XLSX library not found. Falling back to CSV export.");
      return exportSPKToExcel(data, filters);
    }

    // Use provided XLSX or fallback to window.XLSX
    const xlsxLib = XLSX || window.XLSX;

    // Calculate totals
    const totalCarton =
      data.items?.reduce((sum, item) => sum + (item.carton_quantity || 0), 0) ||
      0;
    const totalPack =
      data.items?.reduce((sum, item) => sum + (item.pack_quantity || 0), 0) ||
      0;

    // Create filter info string
    const createFilterInfo = () => {
      let filterText = [];
      if (filters.start_date && filters.end_date) {
        filterText.push(
          `Periode: ${formatDate(filters.start_date)} - ${formatDate(
            filters.end_date
          )}`
        );
      }
      if (filters.customer && filters.customer !== 0) {
        filterText.push(`Customer: ${filters.customer}`);
      }
      if (filters.warehouse && filters.warehouse !== 0) {
        filterText.push(`Gudang: ${filters.warehouse}`);
      }
      if (filters.search) {
        filterText.push(`Pencarian: ${filters.search}`);
      }
      return filterText.length > 0 ? filterText.join(" | ") : "Semua Data";
    };

    // Create workbook and worksheet
    const wb = xlsxLib.utils.book_new();
    const wsData = [];

    // Header information
    wsData.push(["SURAT PERINTAH KERJA (SPK)"]);
    wsData.push(["SUN FIREWORKS"]);
    wsData.push([""]);
    wsData.push([
      "No. SPK:",
      data.document_number || data.spk_number || data.id,
    ]);
    wsData.push(["Tanggal:", formatDate(data.created_at)]);
    wsData.push(["Customer:", data.customer_name || "-"]);
    wsData.push(["UP:", data.customer_upline || "-"]);
    wsData.push(["Alamat:", data.customer_address || "-"]);
    wsData.push([""]);
    wsData.push(["Filter:", createFilterInfo()]);
    wsData.push(["Total Item:", `${data.items?.length || 0} item`]);
    wsData.push(["Tanggal Export:", formatDate(new Date())]);
    wsData.push([""]);

    // Table headers
    wsData.push([
      "NO",
      "KODE PRODUK",
      "BARCODE",
      "NAMA PRODUK",
      "KP",
      "PACKING",
      "CARTON",
      "PACK",
    ]);

    // Table data
    if (data.items?.length > 0) {
      data.items.forEach((item, index) => {
        wsData.push([
          index + 1,
          item.product_code || "-",
          "-",
          item.product_name || "-",
          item.supplier_name || "-",
          item.packing || "-",
          item.carton_quantity || 0,
          item.pack_quantity || 0,
        ]);
      });

      // Total row
      wsData.push(["", "", "", "", "", "TOTAL", totalCarton, totalPack]);
    } else {
      wsData.push([
        "",
        "",
        "",
        "Tidak ada item SPK yang ditemukan",
        "",
        "",
        "",
        "",
      ]);
    }

    // Notes section
    wsData.push([""]);
    wsData.push(["CATATAN:"]);
    wsData.push([data.notes || "-"]);

    // Create worksheet
    const ws = xlsxLib.utils.aoa_to_sheet(wsData);

    // Set column widths
    const colWidths = [
      { wch: 5 }, // NO
      { wch: 15 }, // KODE PRODUK
      { wch: 12 }, // BARCODE
      { wch: 30 }, // NAMA PRODUK
      { wch: 8 }, // KP
      { wch: 12 }, // PACKING
      { wch: 8 }, // CARTON
      { wch: 8 }, // PACK
    ];
    ws["!cols"] = colWidths;

    // Add worksheet to workbook
    xlsxLib.utils.book_append_sheet(wb, ws, "SPK");

    // Generate filename with current date
    const currentDate = new Date().toISOString().split("T")[0];
    const spkNumber = data.document_number || data.spk_number || data.id;
    const filename = `SPK_${spkNumber}_${currentDate}.xlsx`;

    // Write and download file
    xlsxLib.writeFile(wb, filename);

    return filename;
  } catch (error) {
    console.error("Error creating Excel file:", error);
    // Fallback to CSV export
    return exportSPKToExcel(data, filters);
  }
};

export const printSPK = (data) => {
  // Calculate totals
  const totalCarton =
    data.items?.reduce((sum, item) => sum + (item.carton_quantity || 0), 0) ||
    0;
  const totalPack =
    data.items?.reduce((sum, item) => sum + (item.pack_quantity || 0), 0) || 0;

  // Create complete HTML document

  // size: 9.5in 11in; (continuous form paper)
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
              margin: 15mm !important;
            }
            
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
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
            
            .col-kode {
              font-size: 12px !important;
              padding: 6px 2px !important;
              word-break: break-all !important;
              white-space: normal !important;
              line-height: 1.2 !important;
            }
            
            .col-barcode {
              font-size: 12px !important;
              padding: 6px 2px !important;
              word-break: break-all !important;
              white-space: normal !important;
              line-height: 1.2 !important;
            }
          }
          
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            width: 100%;
            max-width: 100%;
            font-size: 12px;
            line-height: 1.4;
            color: black;
            font-weight: 400;
            display: block;
            position: relative;
            top: 0;
            vertical-align: top;
          }
          .header {
            text-align: center;
            margin-top: 0;
            margin-bottom: 30px;
            border-bottom: 1px solid black;
            padding-top: 0;
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
            font-weight: 600;
            min-width: 100px;
            font-size: 12px;
          }
          .infoRow .value {
            font-weight: 400;
            font-size: 12px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            margin: 0 auto 25px auto;
            border: 1px solid black;
            font-size: 12px;
            table-layout: fixed;
            min-height: auto;
            vertical-align: top;
            position: relative;
          }
          th, td {
            border: 1px solid black;
            padding: 5px 3px;
            text-align: center;
            vertical-align: top;
            font-size: 12px;
            word-wrap: break-word;
            position: relative;
          }
          th {
            background: white !important;
            font-weight: 600;
            font-size: 11px;
            height: 25px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            line-height: 1.3;
            text-align: center;
            vertical-align: middle;
            padding: 4px 2px;
          }
          .col-no { 
            width: 35px; 
            font-size: 12px;
          }
          .col-kode { 
            width: 80px; 
            font-size: 12px;
            padding: 4px 2px;
            word-break: break-all;
            white-space: normal;
            line-height: 1.2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-barcode { 
            width: 70px; 
            font-size: 12px;
            padding: 4px 2px;
            word-break: break-all;
            white-space: normal;
            line-height: 1.2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-nama { 
            width: 200px; 
            padding-left: 4px;
            font-weight: 400;
            font-size: 12px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-kp { 
            width: 35px; 
            font-size: 12px;
          }
          .col-packing { 
            width: 70px; 
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-carton { 
            width: 45px; 
            font-size: 12px;
          }
          .col-pack { 
            width: 45px; 
            font-size: 12px;
          }
          
          tbody tr {
            height: auto;
            min-height: 28px;
          }
          
          tbody td {
            height: auto;
            min-height: 22px;
            vertical-align: top;
          }
          .subheader th {
            background: white !important;
            font-size: 11px;
            height: 25px;
            font-weight: 600;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            padding: 4px 2px;
            line-height: 1.3;
            text-align: center;
            vertical-align: middle;
          }
          .total-row {
            background: white !important;
            font-weight: 600;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            border-top: 1px solid black;
          }
          .total-row .total-label {
            text-align: right !important;
            font-size: 11px;
            font-weight: 600;
            padding-right: 10px;
          }
          .total-row td {
            font-weight: 600;
            font-size: 11px;
          }
          .footer {
            padding: 20px 0;
            display: flex;
            justify-content: space-between;
            margin-top: 35px;
          }
          .notesSection {
            margin-bottom: 60px;
            flex: 1;
          }
          .notesLabel {
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 12px;
          }
          .notesContent {
            font-size: 11px;
            line-height: 1.5;
          }
          .signatureSection {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 200px;
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
            margin-top: 60px;
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
              <span class="label">TANGGAL&nbsp;:</span>
              <span class="value">${new Date(
                data.created_at
              ).toLocaleDateString("id-ID")}</span>
            </div>
            <div class="infoRow">
              <span class="label">NO SPK&nbsp;&nbsp;&nbsp;&nbsp;:</span>
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
              <span class="label">UP. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
              <span class="value">${data.customer_upline || "-"}</span>
            </div>
            <div class="infoRow">
              <span class="label">Alamat &nbsp;:</span>
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
