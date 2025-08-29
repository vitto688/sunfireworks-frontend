import { formatNumberWithDot, formatDate } from "./numberUtils";

// Function to generate Excel file from penerimaan barang data
export const exportPenerimaanBarangToExcel = (reportData, filters = {}) => {
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
    if (filters.supplier && filters.supplier !== 0) {
      filterText.push(`Supplier: ${filters.supplier}`);
    }
    if (filters.warehouse && filters.warehouse !== 0) {
      filterText.push(`Gudang: ${filters.warehouse}`);
    }
    if (filters.search) {
      filterText.push(`Pencarian: ${filters.search}`);
    }
    return filterText.length > 0 ? filterText.join(" | ") : "Semua Data";
  };

  // Calculate totals
  const totalCarton =
    reportData?.reduce((sum, item) => sum + (item.carton_quantity || 0), 0) ||
    0;
  const totalPack =
    reportData?.reduce((sum, item) => sum + (item.pack_quantity || 0), 0) || 0;

  // Create CSV content (Excel-compatible)
  const csvContent = [];

  // Header information
  csvContent.push(["LAPORAN PENERIMAAN BARANG"]);
  csvContent.push(["SUN FIREWORKS"]);
  csvContent.push([""]);
  csvContent.push(["Filter:", createFilterInfo()]);
  csvContent.push(["Total Data:", `${reportData?.length || 0} item`]);
  csvContent.push(["Tanggal Export:", formatDate(new Date())]);
  csvContent.push([""]);

  // Table headers
  csvContent.push([
    "NO",
    "NO. DOKUMEN",
    "TANGGAL TRANSAKSI",
    "NAMA PRODUK",
    "SUPPLIER",
    "PACKING",
    "GUDANG",
    "CARTON",
    "PACK",
  ]);

  // Table data
  if (reportData?.length > 0) {
    reportData.forEach((item, index) => {
      csvContent.push([
        index + 1,
        item.document_number || "-",
        formatDate(item.transaction_date),
        item.product_name || "-",
        item.supplier_name || "-",
        item.packing || "-",
        item.warehouse_name || "-",
        item.carton_quantity || 0,
        item.pack_quantity || 0,
      ]);
    });

    // Total row
    csvContent.push(["", "", "", "", "", "", "TOTAL", totalCarton, totalPack]);
  } else {
    csvContent.push([
      "",
      "",
      "",
      "",
      "Tidak ada data penerimaan barang yang ditemukan",
      "",
      "",
      "",
      "",
    ]);
  }

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
  const filename = `Laporan_Penerimaan_Barang_${currentDate}.csv`;
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
export const exportPenerimaanBarangToExcelAdvanced = (
  reportData,
  filters = {},
  XLSX = null
) => {
  try {
    // Check if XLSX library is available
    if (!XLSX && typeof window.XLSX === "undefined") {
      console.warn("XLSX library not found. Falling back to CSV export.");
      return exportPenerimaanBarangToExcel(reportData, filters);
    }

    // Use provided XLSX or fallback to window.XLSX
    const xlsxLib = XLSX || window.XLSX;

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
      if (filters.supplier && filters.supplier !== 0) {
        filterText.push(`Supplier: ${filters.supplier}`);
      }
      if (filters.warehouse && filters.warehouse !== 0) {
        filterText.push(`Gudang: ${filters.warehouse}`);
      }
      if (filters.search) {
        filterText.push(`Pencarian: ${filters.search}`);
      }
      return filterText.length > 0 ? filterText.join(" | ") : "Semua Data";
    };

    // Calculate totals
    const totalCarton =
      reportData?.reduce((sum, item) => sum + (item.carton_quantity || 0), 0) ||
      0;
    const totalPack =
      reportData?.reduce((sum, item) => sum + (item.pack_quantity || 0), 0) ||
      0;

    // Create workbook and worksheet
    const wb = xlsxLib.utils.book_new();
    const wsData = [];

    // Header information
    wsData.push(["LAPORAN PENERIMAAN BARANG"]);
    wsData.push(["SUN FIREWORKS"]);
    wsData.push([""]);
    wsData.push(["Filter:", createFilterInfo()]);
    wsData.push(["Total Data:", `${reportData?.length || 0} item`]);
    wsData.push(["Tanggal Export:", formatDate(new Date())]);
    wsData.push([""]);

    // Table headers
    wsData.push([
      "NO",
      "NO. DOKUMEN",
      "TANGGAL TRANSAKSI",
      "NAMA PRODUK",
      "SUPPLIER",
      "PACKING",
      "GUDANG",
      "CARTON",
      "PACK",
    ]);

    // Table data
    if (reportData?.length > 0) {
      reportData.forEach((item, index) => {
        wsData.push([
          index + 1,
          item.document_number || "-",
          formatDate(item.transaction_date),
          item.product_name || "-",
          item.supplier_name || "-",
          item.packing || "-",
          item.warehouse_name || "-",
          item.carton_quantity || 0,
          item.pack_quantity || 0,
        ]);
      });

      // Total row
      wsData.push(["", "", "", "", "", "", "TOTAL", totalCarton, totalPack]);
    } else {
      wsData.push([
        "",
        "",
        "",
        "",
        "Tidak ada data penerimaan barang yang ditemukan",
        "",
        "",
        "",
        "",
      ]);
    }

    // Create worksheet
    const ws = xlsxLib.utils.aoa_to_sheet(wsData);

    // Set column widths
    const colWidths = [
      { wch: 5 }, // NO
      { wch: 15 }, // NO. DOKUMEN
      { wch: 12 }, // TANGGAL TRANSAKSI
      { wch: 25 }, // NAMA PRODUK
      { wch: 15 }, // SUPPLIER
      { wch: 10 }, // PACKING
      { wch: 15 }, // GUDANG
      { wch: 8 }, // CARTON
      { wch: 8 }, // PACK
    ];
    ws["!cols"] = colWidths;

    // Add worksheet to workbook
    xlsxLib.utils.book_append_sheet(wb, ws, "Laporan Penerimaan Barang");

    // Generate filename with current date
    const currentDate = new Date().toISOString().split("T")[0];
    const filename = `Laporan_Penerimaan_Barang_${currentDate}.xlsx`;

    // Write and download file
    xlsxLib.writeFile(wb, filename);

    return filename;
  } catch (error) {
    console.error("Error creating Excel file:", error);
    // Fallback to CSV export
    return exportPenerimaanBarangToExcel(reportData, filters);
  }
};

export const printPenerimaanBarangReport = (reportData, filters = {}) => {
  // Calculate totals
  const totalCarton =
    reportData?.reduce((sum, item) => sum + (item.carton_quantity || 0), 0) ||
    0;
  const totalPack =
    reportData?.reduce((sum, item) => sum + (item.pack_quantity || 0), 0) || 0;

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
    if (filters.supplier && filters.supplier !== 0) {
      filterText.push(`Supplier: ${filters.supplier}`);
    }
    if (filters.warehouse && filters.warehouse !== 0) {
      filterText.push(`Gudang: ${filters.warehouse}`);
    }
    if (filters.search) {
      filterText.push(`Pencarian: ${filters.search}`);
    }
    return filterText.length > 0 ? filterText.join(" | ") : "Semua Data";
  };

  // Create complete HTML document
  const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>LAPORAN PENERIMAAN BARANG</title>
        <style>
          @page {
            margin: 15mm;
            size: A4;
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
          }
          
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            font-size: 9px;
            line-height: 1.4;
            color: black;
            font-weight: 400;
          }
          .header {
            text-align: center;
            margin-bottom: 25px;
            border-bottom: 1px solid black;
            padding-bottom: 12px;
          }
          .header h1 {
            font-size: 18px;
            font-weight: 600;
            margin: 0;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .header h2 {
            font-size: 14px;
            margin: 8px 0;
            color: #333;
          }
          .reportInfo {
            margin-bottom: 25px;
            font-size: 9px;
          }
          .reportInfo div {
            margin: 5px 0;
          }
          .reportInfo .label {
            font-weight: 600;
            display: inline-block;
            width: 120px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
            margin-bottom: 25px;
          }
          th, td {
            border: 1px solid black;
            padding: 6px 4px;
            text-align: center;
            vertical-align: middle;
          }
          th {
            background: white !important;
            font-weight: 600;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .col-no { 
            width: 30px; 
            min-width: 30px;
          }
          .col-dokumen { 
            width: 90px; 
            min-width: 90px;
            font-size: 9px;
          }
          .col-tanggal { 
            width: 80px; 
            min-width: 80px;
            font-size: 9px;
          }
          .col-kode { 
            width: 80px; 
            min-width: 80px;
            font-size: 9px;
          }
          .col-nama { 
            width: 150px; 
            min-width: 150px;
            text-align: left !important;
            padding-left: 6px;
            font-size: 9px;
          }
          .col-supplier { 
            min-width: 60px;
            font-size: 9px;
          }
          .col-gudang { 
            width: 80px; 
            min-width: 80px;
            font-size: 9px;
          }
          .col-packing { 
            width: 70px; 
            min-width: 70px;
            font-size: 9px;
          }
          .col-carton { 
            width: 60px; 
            min-width: 60px;
          }
          .col-pack { 
            width: 60px; 
            min-width: 60px;
          }
          .col-keterangan { 
            min-width: 120px;
            text-align: left !important;
            padding-left: 6px;
            font-size: 9px;
          }
          .total-row {
            background: white !important;
            font-weight: 600;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            border-top: 1px solid black;
          }
          .total-row .total-label {
            text-align: center !important;
            font-size: 11px;
            font-weight: 600;
          }
          .footer {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            font-size: 11px;
          }
          .printInfo {
            font-size: 9px;
            color: #666;
            text-align: right;
            margin-top: 20px;
          }
          .signature {
            text-align: center;
            margin-top: 40px;
          }
          .signature-box {
            display: inline-block;
            margin: 0 40px;
            text-align: center;
          }
          .signature-line {
            border-bottom: 1px solid black;
            width: 150px;
            height: 50px;
            display: inline-block;
            margin-bottom: 5px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>LAPORAN PENERIMAAN BARANG</h1>
          <h2>SUN FIREWORKS</h2>
        </div>

        <div class="reportInfo">
          <div>
            <span class="label">Filter:</span>
            <span>${createFilterInfo()}</span>
          </div>
          <div>
            <span class="label">Total Data:</span>
            <span>${reportData?.length || 0} item</span>
          </div>
          <div>
            <span class="label">Tanggal Cetak:</span>
            <span>${formatDate(new Date())}</span>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th class="col-no">NO</th>
              <th class="col-dokumen">NO. DOKUMEN</th>
              <th class="col-tanggal">TANGGAL TRANSAKSI</th>
              <th class="col-kode">KODE PRODUK</th>
              <th class="col-nama">NAMA PRODUK</th>
              <th class="col-supplier">SUPPLIER</th>
              <th class="col-gudang">GUDANG</th>
              <th class="col-packing">PACKING</th>
              <th class="col-carton">CARTON</th>
              <th class="col-pack">PACK</th>
              <th class="col-keterangan">KETERANGAN</th>
            </tr>
          </thead>
          <tbody>
            ${
              reportData?.length > 0
                ? reportData
                    .map(
                      (item, index) => `
                <tr>
                  <td class="col-no">${index + 1}</td>
                  <td class="col-dokumen">${item.document_number || "-"}</td>
                  <td class="col-tanggal">${formatDate(
                    item.transaction_date
                  )}</td>
                  <td class="col-kode">${item.product_code || "-"}</td>
                  <td class="col-nama">${item.product_name || "-"}</td>
                  <td class="col-supplier">${item.supplier_name || "-"}</td>
                  <td class="col-gudang">${item.warehouse_name || "-"}</td>
                  <td class="col-packing">${item.packing || "-"}</td>
                  <td class="col-carton">${formatNumberWithDot(
                    item.carton_quantity || 0
                  )}</td>
                  <td class="col-pack">${formatNumberWithDot(
                    item.pack_quantity || 0
                  )}</td>
                  <td class="col-keterangan">${item.notes || "-"}</td>
                </tr>
              `
                    )
                    .join("")
                : `
                <tr>
                  <td colspan="11" style="text-align: center; padding: 20px; color: #666;">
                    Tidak ada data retur pembelian yang ditemukan
                  </td>
                </tr>
              `
            }
            ${
              reportData?.length > 0
                ? `
            <tr class="total-row">
              <td colspan="8" class="total-label">TOTAL</td>
              <td class="col-carton">${formatNumberWithDot(totalCarton)}</td>
              <td class="col-pack">${formatNumberWithDot(totalPack)}</td>
              <td class="col-keterangan">-</td>
            </tr>
            `
                : ""
            }
          </tbody>
        </table>

        <div class="signature">
          <div class="signature-box">
            <div>Dibuat oleh,</div>
            <div class="signature-line"></div>
            <div>Admin</div>
          </div>
          <div class="signature-box">
            <div>Disetujui oleh,</div>
            <div class="signature-line"></div>
            <div>Manager</div>
          </div>
        </div>

        <div class="printInfo">
          Dicetak pada: ${new Date().toLocaleString("id-ID")} | 
          Halaman: 1 dari 1 | 
          System: Sun Fireworks Management
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
        <title>Preview - LAPORAN PENERIMAAN BARANG</title>
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
            <h1 class="preview-title">Preview - Laporan Penerimaan Barang</h1>
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

// Alternative function for downloading as PDF (requires additional setup)
export const downloadReturPembelianReportAsPDF = async (
  reportData,
  filters = {}
) => {
  try {
    // This would require a PDF library like jsPDF or html2pdf
    // For now, we'll use the print function as fallback
    printPenerimaanBarangReport(reportData, filters);
  } catch (error) {
    console.error("Error generating PDF:", error);
    printPenerimaanBarangReport(reportData, filters);
  }
};
