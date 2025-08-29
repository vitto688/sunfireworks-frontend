import { formatNumberWithDot, formatDate } from "./numberUtils";

/**
 * Preview Mutasi Barang Penjualan Report
 * @param {Array} data - Array of mutasi barang penjualan data
 * @param {Object} filters - Applied filters
 */
export const previewMutasiBarangPenjualanReport = (data, filters = {}) => {
  try {
    // Create a new window for preview
    const previewWindow = window.open("", "_blank");

    // Get current date for report header
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    // Build filter info string
    let filterInfo = [];
    if (filters.customer_name) {
      filterInfo.push(`Pelanggan: ${filters.customer_name}`);
    }
    if (filters.product_name) {
      filterInfo.push(`Produk: ${filters.product_name}`);
    }
    if (filters.start_date) {
      filterInfo.push(`Dari: ${formatDate(filters.start_date)}`);
    }
    if (filters.end_date) {
      filterInfo.push(`Sampai: ${formatDate(filters.end_date)}`);
    }

    const filterText =
      filterInfo.length > 0 ? filterInfo.join(" | ") : "Semua Data";

    // Create HTML content for preview
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Preview - Laporan Mutasi Barang Penjualan</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              font-size: 9px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0 0 10px 0;
              font-size: 18px;
              font-weight: bold;
            }
            .header .subtitle {
              margin: 5px 0;
              font-size: 14px;
            }
            .header .filter-info {
              margin: 10px 0;
              font-size: 9px;
              color: #666;
            }
            .table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .table th,
            .table td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            .table th {
              background-color: #f2f2f2 !important;
              font-weight: bold;
              text-align: center;
            }
            .table td.number {
              text-align: right;
            }
            .table td.center {
              text-align: center;
            }
            .footer {
              margin-top: 30px;
              text-align: right;
              font-size: 9px;
            }
            .summary {
              margin-top: 20px;
              text-align: right;
              font-weight: bold;
            }
            .preview-controls {
              position: fixed;
              top: 10px;
              right: 10px;
              background: white;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              z-index: 1000;
            }
            .btn {
              margin: 0 5px;
              padding: 8px 15px;
              border: none;
              border-radius: 3px;
              cursor: pointer;
              font-size: 12px;
            }
            .btn-print {
              background-color: #007bff;
              color: white;
            }
            .btn-close {
              background-color: #6c757d;
              color: white;
            }
            @media print {
              .preview-controls { display: none; }
              body { margin: 0; }
              .header { margin-bottom: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="preview-controls">
            <button class="btn btn-print" onclick="window.print()">Print</button>
            <button class="btn btn-close" onclick="window.close()">Close</button>
          </div>
          
          <div class="header">
            <h1>LAPORAN MUTASI BARANG PENJUALAN</h1>
            <div class="subtitle">Periode: ${filterText}</div>
            <div class="filter-info">Dicetak pada: ${formattedDate}</div>
          </div>
          
          <table class="table">
            <thead>
              <tr>
                <th style="width: 40px;">No</th>
                <th style="width: 120px;">Kode Produk</th>
                <th>Nama Produk</th>
                <th style="width: 100px;">Packing</th>
                <th style="width: 100px;">Total Carton</th>
                <th style="width: 100px;">Total Pack</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (item, index) => `
                <tr>
                  <td class="center">${index + 1}</td>
                  <td>${item.product_code || "-"}</td>
                  <td>${item.product_name || "-"}</td>
                  <td class="center">${item.packing || "-"}</td>
                  <td class="number">${formatNumberWithDot(
                    item.total_carton_quantity || 0
                  )}</td>
                  <td class="number">${formatNumberWithDot(
                    item.total_pack_quantity || 0
                  )}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          
          <div class="summary">
            Total Records: ${data.length}
          </div>
          
          <div class="footer">
            <p>Sunfireworks - Laporan Mutasi Barang Penjualan</p>
          </div>
        </body>
      </html>
    `;

    // Write content to preview window
    previewWindow.document.write(htmlContent);
    previewWindow.document.close();

    return previewWindow;
  } catch (error) {
    console.error("Error previewing mutasi barang penjualan report:", error);
    alert("Gagal menampilkan preview laporan. Silakan coba lagi.");
  }
};

/**
 * Print Mutasi Barang Penjualan Report
 * @param {Array} data - Array of mutasi barang penjualan data
 * @param {Object} filters - Applied filters
 */
export const printMutasiBarangPenjualanReport = (data, filters = {}) => {
  try {
    // Create a new window for printing
    // const printWindow = window.open("", "_blank");

    // Get current date for report header
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    // Build filter info string
    let filterInfo = [];
    if (filters.customer_name) {
      filterInfo.push(`Pelanggan: ${filters.customer_name}`);
    }
    if (filters.product_name) {
      filterInfo.push(`Produk: ${filters.product_name}`);
    }
    if (filters.start_date) {
      filterInfo.push(`Dari: ${formatDate(filters.start_date)}`);
    }
    if (filters.end_date) {
      filterInfo.push(`Sampai: ${formatDate(filters.end_date)}`);
    }

    const filterText =
      filterInfo.length > 0 ? filterInfo.join(" | ") : "Semua Data";

    // Create HTML content for printing
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Laporan Mutasi Barang Penjualan</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              font-size: 9px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0 0 10px 0;
              font-size: 18px;
              font-weight: bold;
            }
            .header .subtitle {
              margin: 5px 0;
              font-size: 14px;
            }
            .header .filter-info {
              margin: 10px 0;
              font-size: 9px;
              color: #666;
            }
            .table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .table th,
            .table td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            .table th {
              background-color: #f2f2f2;
              font-weight: bold;
              text-align: center;
            }
            .table td.number {
              text-align: right;
            }
            .table td.center {
              text-align: center;
            }
            .footer {
              margin-top: 30px;
              text-align: right;
              font-size: 9px;
            }
            .summary {
              margin-top: 20px;
              text-align: right;
              font-weight: bold;
            }
            @media print {
              body { margin: 0; }
              .header { margin-bottom: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>LAPORAN MUTASI BARANG PENJUALAN</h1>
            <div class="subtitle">Periode: ${filterText}</div>
            <div class="filter-info">Dicetak pada: ${formattedDate}</div>
          </div>
          
          <table class="table">
            <thead>
              <tr>
                <th style="width: 40px;">No</th>
                <th style="width: 120px;">Kode Produk</th>
                <th>Nama Produk</th>
                <th style="width: 100px;">Packing</th>
                <th style="width: 100px;">Total Carton</th>
                <th style="width: 100px;">Total Pack</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (item, index) => `
                <tr>
                  <td class="center">${index + 1}</td>
                  <td>${item.product_code || "-"}</td>
                  <td>${item.product_name || "-"}</td>
                  <td class="center">${item.packing || "-"}</td>
                  <td class="number">${formatNumberWithDot(
                    item.total_carton_quantity || 0
                  )}</td>
                  <td class="number">${formatNumberWithDot(
                    item.total_pack_quantity || 0
                  )}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          
          <div class="summary">
            Total Records: ${data.length}
          </div>
          
          <div class="footer">
            <p>Sunfireworks - Laporan Mutasi Barang Penjualan</p>
          </div>
        </body>
      </html>
    `;

    // Write content to print window
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
          <title>Preview - LAPORAN MUTASI BARANG PENJUALAN</title>
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
              <h1 class="preview-title">Preview - Laporan Mutasi Barang Penjualan</h1>
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
  } catch (error) {
    console.error("Error printing mutasi barang penjualan report:", error);
    alert("Gagal mencetak laporan. Silakan coba lagi.");
  }
};

/**
 * Export Mutasi Barang Penjualan to CSV
 * @param {Array} data - Array of mutasi barang penjualan data
 * @param {Object} filters - Applied filters
 * @returns {string} filename of exported file
 */
export const exportMutasiBarangPenjualanToExcel = (data, filters = {}) => {
  try {
    // Create CSV headers
    const headers = [
      "No",
      "Kode Produk",
      "Nama Produk",
      "Packing",
      "Total Carton",
      "Total Pack",
    ];

    // Create CSV rows
    const rows = data.map((item, index) => [
      index + 1,
      item.product_code || "",
      item.product_name || "",
      item.packing || "",
      item.total_carton_quantity || 0,
      item.total_pack_quantity || 0,
    ]);

    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((field) => {
            // Handle fields that might contain commas or quotes
            const stringField = String(field);
            if (
              stringField.includes(",") ||
              stringField.includes('"') ||
              stringField.includes("\n")
            ) {
              return `"${stringField.replace(/"/g, '""')}"`;
            }
            return stringField;
          })
          .join(",")
      )
      .join("\n");

    // Add BOM for proper UTF-8 encoding in Excel
    const BOM = "\uFEFF";
    const csvWithBOM = BOM + csvContent;

    // Create and download file
    const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    // Generate filename
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    const filename = `laporan_mutasi_barang_penjualan_${timestamp}.csv`;

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    return filename;
  } catch (error) {
    console.error("Error exporting mutasi barang penjualan to CSV:", error);
    alert("Gagal mengekspor data ke CSV. Silakan coba lagi.");
    throw error;
  }
};

/**
 * Export Mutasi Barang Penjualan to Excel (Advanced with XLSX)
 * @param {Array} data - Array of mutasi barang penjualan data
 * @param {Object} filters - Applied filters
 * @param {Object} XLSX - XLSX library object
 * @returns {string} filename of exported file
 */
export const exportMutasiBarangPenjualanToExcelAdvanced = (
  data,
  filters = {},
  XLSX
) => {
  try {
    if (!XLSX) {
      throw new Error("XLSX library is not available");
    }

    // Prepare data for Excel
    const excelData = data.map((item, index) => ({
      No: index + 1,
      "Kode Produk": item.product_code || "",
      "Nama Produk": item.product_name || "",
      Packing: item.packing || "",
      "Total Carton": item.total_carton_quantity || 0,
      "Total Pack": item.total_pack_quantity || 0,
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const columnWidths = [
      { wch: 5 }, // No
      { wch: 15 }, // Kode Produk
      { wch: 30 }, // Nama Produk
      { wch: 15 }, // Packing
      { wch: 12 }, // Total Carton
      { wch: 12 }, // Total Pack
    ];
    worksheet["!cols"] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Mutasi Barang Penjualan"
    );

    // Generate filename
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    const filename = `laporan_mutasi_barang_penjualan_${timestamp}.xlsx`;

    // Write and download file
    XLSX.writeFile(workbook, filename);

    return filename;
  } catch (error) {
    console.error("Error exporting mutasi barang penjualan to Excel:", error);
    throw error;
  }
};

const mutasiBarangPenjualanReportUtils = {
  previewMutasiBarangPenjualanReport,
  printMutasiBarangPenjualanReport,
  exportMutasiBarangPenjualanToExcel,
  exportMutasiBarangPenjualanToExcelAdvanced,
};

export default mutasiBarangPenjualanReportUtils;
