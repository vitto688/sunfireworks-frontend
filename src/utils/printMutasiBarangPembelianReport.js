import { formatDate } from "./dateUtils";
import { formatNumberWithDot } from "./numberUtils";

/**
 * Print Mutasi Barang Pembelian Report
 * @param {Array} data - Array of mutasi barang pembelian data
 * @param {Object} filters - Applied filters
 */
export const printMutasiBarangPembelianReport = (data, filters = {}) => {
  try {
    // Get current date for report header
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    // Build filter info string
    let filterInfo = [];
    if (filters.supplier_name) {
      filterInfo.push(`Supplier: ${filters.supplier_name}`);
    }
    if (filters.warehouse_name) {
      filterInfo.push(`Gudang: ${filters.warehouse_name}`);
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
          <title>Laporan Mutasi Barang Pembelian</title>
          <style>
            @page {
              margin: 20mm;
              size: A4;
            }
            
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
            <h1>LAPORAN MUTASI BARANG PEMBELIAN</h1>
            <div class="subtitle">Periode: ${filterText}</div>
            <div class="filter-info">Dicetak pada: ${formattedDate}</div>
          </div>
          
          <table class="table">
            <thead>
              <tr>
                <th style="width: 40px;">No</th>
                <th style="width: 120px;">Kode Produk</th>
                <th>Nama Produk</th>
                <th style="width: 60px;">Packing</th>
                <th style="width: 50px;">Total Carton</th>
                <th style="width: 50px;">Total Pack</th>
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
            ${
              data.length > 0
                ? `<br>Total Carton: ${formatNumberWithDot(
                    data.reduce(
                      (sum, item) => sum + (item.total_carton_quantity || 0),
                      0
                    )
                  )}<br>Total Pack: ${formatNumberWithDot(
                    data.reduce(
                      (sum, item) => sum + (item.total_pack_quantity || 0),
                      0
                    )
                  )}`
                : ""
            }
          </div>
          
          <div class="footer">
            <p>Sunfireworks - Laporan Mutasi Barang Pembelian</p>
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
          <title>Preview - Laporan Mutasi Barang Pembelian</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
            }
            .preview-container {
              width: 100%;
              max-width: 1200px;
              margin: 0 auto;
              background: white;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
              position: relative;
            }
            .preview-header {
              background: #2563eb;
              color: white;
              padding: 15px 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              position: sticky;
              top: 0;
              z-index: 1000;
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
            .preview-info {
              background: #f8fafc;
              padding: 15px 20px;
              border-bottom: 1px solid #e5e7eb;
              font-size: 14px;
              color: #6b7280;
            }
            .preview-content {
              padding: 20px;
              background: white;
              min-height: calc(100vh - 120px);
            }
            
            /* Document content styles - matching htmlContent exactly */
            .document-content {
              font-family: Arial, sans-serif;
              font-size: 9px;
              max-width: 210mm; /* A4 width */
              margin: 0 auto;
              background: white;
              padding: 20px;
              box-shadow: 0 0 5px rgba(0,0,0,0.1);
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
          </style>
        </head>
        <body>
          <div class="preview-container">
            <div class="preview-header">
              <h1 class="preview-title">Preview - Laporan Mutasi Barang Pembelian</h1>
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
              <strong>Petunjuk:</strong> Ini adalah preview laporan yang akan dicetak. Klik "Print Document" untuk melanjutkan ke proses print, atau "Close" untuk membatalkan.
            </div>
            <div class="preview-content">
              <div class="document-content">
                <div class="header">
                  <h1>LAPORAN MUTASI BARANG PEMBELIAN</h1>
                  <div class="subtitle">Periode: ${filterText}</div>
                  <div class="filter-info">Dicetak pada: ${formattedDate}</div>
                </div>
                
                <table class="table">
                  <thead>
                    <tr>
                      <th style="width: 40px;">No</th>
                      <th style="width: 120px;">Kode Produk</th>
                      <th>Nama Produk</th>
                      <th style="width: 120px;">Packing</th>
                      <th style="width: 120px;">Total Carton</th>
                      <th style="width: 120px;">Total Pack</th>
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
                  ${
                    data.length > 0
                      ? `<br>Total Carton: ${formatNumberWithDot(
                          data.reduce(
                            (sum, item) =>
                              sum + (item.total_carton_quantity || 0),
                            0
                          )
                        )}<br>Total Pack: ${formatNumberWithDot(
                          data.reduce(
                            (sum, item) =>
                              sum + (item.total_pack_quantity || 0),
                            0
                          )
                        )}`
                      : ""
                  }
                </div>
                
                <div class="footer">
                  <p>Sunfireworks - Laporan Mutasi Barang Pembelian</p>
                </div>
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
    console.error("Error printing mutasi barang pembelian report:", error);
    alert("Gagal mencetak laporan. Silakan coba lagi.");
  }
};

/**
 * Export Mutasi Barang Pembelian to CSV
 * @param {Array} data - Array of mutasi barang pembelian data
 * @param {Object} filters - Applied filters
 * @returns {string} filename of exported file
 */
export const exportMutasiBarangPembelianToExcel = (data, filters = {}) => {
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
    const filename = `laporan_mutasi_barang_pembelian_${timestamp}.csv`;

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
    console.error("Error exporting mutasi barang pembelian to CSV:", error);
    alert("Gagal mengekspor data ke CSV. Silakan coba lagi.");
    throw error;
  }
};

/**
 * Export Mutasi Barang Pembelian to Excel (Advanced with XLSX)
 * @param {Array} data - Array of mutasi barang pembelian data
 * @param {Object} filters - Applied filters
 * @param {Object} XLSX - XLSX library object
 * @returns {string} filename of exported file
 */
export const exportMutasiBarangPembelianToExcelAdvanced = (
  data,
  filters = {},
  XLSX
) => {
  try {
    if (!XLSX) {
      throw new Error("XLSX library is not available");
    }

    // Prepare worksheet data
    const worksheetData = [];

    // Add header information
    worksheetData.push(["LAPORAN MUTASI BARANG PEMBELIAN"]);
    worksheetData.push([""]);

    // Add filter information
    if (filters.supplier_name) {
      worksheetData.push([`Supplier: ${filters.supplier_name}`]);
    }
    if (filters.warehouse_name) {
      worksheetData.push([`Gudang: ${filters.warehouse_name}`]);
    }
    if (filters.start_date && filters.end_date) {
      worksheetData.push([
        `Periode: ${formatDate(filters.start_date)} - ${formatDate(
          filters.end_date
        )}`,
      ]);
    }
    worksheetData.push([""]);

    // Add table headers
    const headers = [
      "No",
      "Kode Produk",
      "Nama Produk",
      "Packing",
      "Total Carton",
      "Total Pack",
    ];
    worksheetData.push(headers);

    // Add data rows
    data.forEach((item, index) => {
      const row = [
        index + 1,
        item.product_code || "-",
        item.product_name || "-",
        item.packing || "-",
        item.total_carton_quantity || 0,
        item.total_pack_quantity || 0,
      ];
      worksheetData.push(row);
    });

    // Add summary row
    if (data.length > 0) {
      worksheetData.push([""]);
      const totalCarton = data.reduce(
        (sum, item) => sum + (item.total_carton_quantity || 0),
        0
      );
      const totalPack = data.reduce(
        (sum, item) => sum + (item.total_pack_quantity || 0),
        0
      );

      worksheetData.push(["TOTAL", "", "", "", totalCarton, totalPack]);
    }

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

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
      "Mutasi Barang Pembelian"
    );

    // Generate filename with timestamp
    const now = new Date();
    const timestamp = now.toISOString().slice(0, 19).replace(/:/g, "-");
    const filename = `Laporan_Mutasi_Barang_Pembelian_${timestamp}.xlsx`;

    // Save file
    XLSX.writeFile(workbook, filename);

    return filename;
  } catch (error) {
    console.error("Error generating Excel file:", error);
    throw new Error("Gagal menggenerate file Excel: " + error.message);
  }
};

const mutasiBarangPembelianReportUtils = {
  printMutasiBarangPembelianReport,
  exportMutasiBarangPembelianToExcel,
  exportMutasiBarangPembelianToExcelAdvanced,
};

export default mutasiBarangPembelianReportUtils;
