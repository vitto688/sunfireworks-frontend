import { formatNumberWithDot, formatDate } from "./numberUtils";

// Function to generate Excel file from pengeluaran barang data
export const exportPengeluaranBarangToExcel = (reportData, filters = {}) => {
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
  csvContent.push(["LAPORAN PENGELUARAN BARANG"]);
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
      "Tidak ada data pengeluaran barang yang ditemukan",
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
  const filename = `Laporan_Pengeluaran_Barang_${currentDate}.csv`;
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
export const exportPengeluaranBarangToExcelAdvanced = (
  reportData,
  filters = {},
  XLSX = null
) => {
  try {
    // Check if XLSX library is available
    if (!XLSX && typeof window.XLSX === "undefined") {
      console.warn("XLSX library not found. Falling back to CSV export.");
      return exportPengeluaranBarangToExcel(reportData, filters);
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
    wsData.push(["LAPORAN PENGELUARAN BARANG"]);
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
        "Tidak ada data pengeluaran barang yang ditemukan",
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
    xlsxLib.utils.book_append_sheet(wb, ws, "Laporan Pengeluaran Barang");

    // Generate filename with current date
    const currentDate = new Date().toISOString().split("T")[0];
    const filename = `Laporan_Pengeluaran_Barang_${currentDate}.xlsx`;

    // Write and download file
    xlsxLib.writeFile(wb, filename);

    return filename;
  } catch (error) {
    console.error("Error creating Excel file:", error);
    // Fallback to CSV export
    return exportPengeluaranBarangToExcel(reportData, filters);
  }
};

export const printPengeluaranBarangReport = (reportData, filters = {}) => {
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
        <title>LAPORAN PENGELUARAN BARANG</title>
        <style>
          @page {
            margin: 15mm;
            size: A4 landscape;
            @top-left { content: ""; }
            @top-center { content: ""; }
            @top-right { content: ""; }
            @bottom-left { content: ""; }
            @bottom-center { content: ""; }
            @bottom-right { content: ""; }
          }
          body {
            font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
            margin: 0;
            padding: 0;
            font-size: 11px;
            line-height: 1.3;
            color: black;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid black;
            padding-bottom: 10px;
          }
          .header h1 {
            font-size: 18px;
            font-weight: bold;
            margin: 0;
            letter-spacing: 2px;
            text-transform: uppercase;
          }
          .header h2 {
            font-size: 12px;
            margin: 5px 0;
            color: #666;
          }
          .reportInfo {
            margin-bottom: 20px;
            font-size: 11px;
          }
          .reportInfo div {
            margin: 3px 0;
          }
          .reportInfo .label {
            font-weight: bold;
            display: inline-block;
            width: 120px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid black;
            padding: 4px 3px;
            text-align: center;
            vertical-align: middle;
          }
          th {
            background: #f0f0f0 !important;
            font-weight: bold;
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
            width: 100px; 
            min-width: 100px;
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
            width: 120px; 
            min-width: 120px;
            text-align: left !important;
            padding-left: 6px;
            font-size: 9px;
          }
          .total-row {
            background: #e0e0e0 !important;
            font-weight: bold;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .total-row .total-label {
            text-align: center !important;
            font-size: 11px;
            font-weight: bold;
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
          <h1>LAPORAN PENGELUARAN BARANG</h1>
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

// Alternative function for downloading as PDF (requires additional setup)
export const downloadReturPembelianReportAsPDF = async (
  reportData,
  filters = {}
) => {
  try {
    // This would require a PDF library like jsPDF or html2pdf
    // For now, we'll use the print function as fallback
    printPengeluaranBarangReport(reportData, filters);
  } catch (error) {
    console.error("Error generating PDF:", error);
    printPengeluaranBarangReport(reportData, filters);
  }
};
