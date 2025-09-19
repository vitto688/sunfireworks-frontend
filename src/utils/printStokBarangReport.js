import { formatNumberWithDot, formatDate } from "./numberUtils";
import * as XLSXStyle from "xlsx-js-style";

/*
 * For optimal styling support, include xlsx-js-style library in your HTML:
 *
 * Method 1 - CDN:
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
 * <script src="https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js"></script>
 *
 * Method 2 - NPM:
 * npm install xlsx-js-style
 * import XLSX from 'xlsx-js-style';
 *
 * The library will be detected as window.XLSX_STYLE or passed as XLSX parameter
 */

// Helper function to transform data from vertical to horizontal structure
const transformDataToHorizontal = (reportData) => {
  if (!reportData || reportData.length === 0) {
    return { transformedData: [], warehouses: [] };
  }

  // Get all unique warehouses
  const warehouses = [
    ...new Set(reportData.map((item) => item.warehouse_name)),
  ].filter(Boolean);

  // Group data by product (using product_code + product_name as key)
  const groupedData = {};

  reportData.forEach((item) => {
    const productKey = `${item.product_code || ""}_${item.product_name || ""}`;

    if (!groupedData[productKey]) {
      groupedData[productKey] = {
        product_code: item.product_code || "-",
        product_name: item.product_name || "-",
        product_category: item.product_category || "-",
        supplier_name: item.supplier_name || "-",
        packing: item.packing || "-",
        warehouses: {},
      };
    }

    // Store warehouse data
    if (item.warehouse_name) {
      groupedData[productKey].warehouses[item.warehouse_name] = {
        carton: item.carton_quantity || 0,
        pack: item.pack_quantity || 0,
      };
    }
  });

  // Convert to array and fill missing warehouse data
  const transformedData = Object.values(groupedData).map((product) => {
    const warehouseData = {};
    warehouses.forEach((warehouse) => {
      const data = product.warehouses[warehouse] || { carton: 0, pack: 0 };
      warehouseData[warehouse] = {
        carton: data.carton,
        pack: data.pack,
      };
    });

    return {
      ...product,
      warehouseData,
    };
  });

  return { transformedData, warehouses };
};

// Helper function to calculate totals for each warehouse
const calculateWarehouseTotals = (transformedData, warehouses) => {
  const totals = {};

  warehouses.forEach((warehouse) => {
    let totalCarton = 0;
    let totalPack = 0;

    transformedData.forEach((item) => {
      const warehouseData = item.warehouseData[warehouse] || {
        carton: 0,
        pack: 0,
      };
      totalCarton += warehouseData.carton;
      totalPack += warehouseData.pack;
    });

    totals[warehouse] = {
      carton: totalCarton,
      pack: totalPack,
    };
  });

  return totals;
};

// Function to generate Excel file from stok barang data
export const exportStokBarangToExcel = (reportData, filters = {}) => {
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
    if (filters.category && filters.category !== 0) {
      filterText.push(`Kategori: ${filters.category}`);
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

  // Transform data to horizontal structure
  const { transformedData, warehouses } = transformDataToHorizontal(reportData);

  // Calculate warehouse totals
  const warehouseTotals = calculateWarehouseTotals(transformedData, warehouses);

  // Create CSV content (Excel-compatible)
  const csvContent = [];

  // Header information
  csvContent.push(["LAPORAN STOK BARANG"]);
  csvContent.push(["SUN FIREWORKS"]);
  csvContent.push([""]);
  csvContent.push(["Filter:", createFilterInfo()]);
  csvContent.push(["Total Data:", `${transformedData?.length || 0} item`]);
  csvContent.push(["Tanggal Export:", formatDate(new Date())]);
  csvContent.push([""]);

  // Table headers with sub-columns - dynamic based on warehouses
  const mainHeaders = [
    "NO",
    "KODE PRODUK",
    "NAMA PRODUK",
    "KATEGORI",
    "SUPPLIER",
    "PACKING",
  ];

  // Add warehouse names as main headers
  warehouses.forEach((warehouse) => {
    mainHeaders.push(warehouse, "");
  });
  csvContent.push(mainHeaders);

  // Add sub-headers (Carton, Pack for each warehouse)
  const subHeaders = [
    "",
    "",
    "",
    "",
    "",
    "", // Empty for basic columns
  ];
  warehouses.forEach(() => {
    subHeaders.push("Carton", "Pack");
  });
  csvContent.push(subHeaders);

  // Table data
  if (transformedData?.length > 0) {
    transformedData.forEach((item, index) => {
      const row = [
        index + 1,
        item.product_code || "-",
        item.product_name || "-",
        item.product_category || "-",
        item.supplier_name || "-",
        item.packing || "-",
      ];

      // Add carton and pack values for each warehouse
      warehouses.forEach((warehouse) => {
        const warehouseData = item.warehouseData[warehouse] || {
          carton: 0,
          pack: 0,
        };
        row.push(warehouseData.carton, warehouseData.pack);
      });

      csvContent.push(row);
    });

    // Total row
    const totalRow = ["", "", "", "", "", "TOTAL"];

    warehouses.forEach((warehouse) => {
      const totals = warehouseTotals[warehouse] || { carton: 0, pack: 0 };
      totalRow.push(totals.carton, totals.pack);
    });

    csvContent.push(totalRow);
  } else {
    const emptyRow = [
      "",
      "",
      "",
      "Tidak ada data stok barang yang ditemukan",
      "",
      "",
    ];

    // Add empty cells for warehouse columns
    warehouses.forEach(() => {
      emptyRow.push("", "");
    });

    csvContent.push(emptyRow);
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
  const filename = `Laporan_Stok_Barang_${currentDate}.csv`;
  link.setAttribute("download", filename);

  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up
  URL.revokeObjectURL(url);

  return filename;
};

// Enhanced Excel export using XLSX-JS-STYLE library for better styling
export const exportStokBarangToExcelAdvanced = (
  reportData,
  filters = {},
  XLSX = null
) => {
  try {
    // Use xlsx-js-style for enhanced styling support
    let xlsxLib = null;
    let hasAdvancedStyling = false;

    if (XLSXStyle && XLSXStyle.utils) {
      // Use imported xlsx-js-style
      xlsxLib = XLSXStyle;
      hasAdvancedStyling = true;
      console.log("Using imported xlsx-js-style library for advanced styling");
    } else if (typeof window !== "undefined" && window.XLSX_STYLE) {
      // Fallback to browser XLSX-JS-STYLE
      xlsxLib = window.XLSX_STYLE;
      hasAdvancedStyling = true;
      console.log("Using browser XLSX-JS-STYLE for enhanced styling support");
    } else if (typeof window !== "undefined" && window.XLSX) {
      // Fallback to standard XLSX
      xlsxLib = window.XLSX;
      hasAdvancedStyling = false;
      console.warn("Using browser standard XLSX. Limited styling available");
    } else if (XLSX) {
      // Node.js fallback to standard XLSX
      xlsxLib = XLSX;
      hasAdvancedStyling = false;
      console.warn("Using standard XLSX library - xlsx-js-style not available");
    } else {
      console.warn("No XLSX library found. Falling back to CSV export.");
      return exportStokBarangToExcel(reportData, filters);
    }

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
      if (filters.category && filters.category !== 0) {
        filterText.push(`Kategori: ${filters.category}`);
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

    // Transform data to horizontal structure
    const { transformedData, warehouses } =
      transformDataToHorizontal(reportData);

    // Calculate warehouse totals
    const warehouseTotals = calculateWarehouseTotals(
      transformedData,
      warehouses
    );

    // Create workbook and worksheet
    const wb = xlsxLib.utils.book_new();
    const wsData = [];

    // Header information
    wsData.push(["LAPORAN STOK BARANG"]);
    wsData.push(["SUN FIREWORKS"]);
    wsData.push([""]);
    wsData.push(["Filter:", createFilterInfo()]);
    wsData.push(["Total Data:", `${transformedData?.length || 0} item`]);
    wsData.push(["Tanggal Export:", formatDate(new Date())]);
    wsData.push([""]);

    // Table headers with sub-columns - dynamic based on warehouses
    const mainHeaders = [
      "NO",
      "KODE PRODUK",
      "NAMA PRODUK",
      "KATEGORI",
      "SUPPLIER",
      "PACKING",
    ];

    // Add warehouse names as main headers
    warehouses.forEach((warehouse) => {
      mainHeaders.push(warehouse, "");
    });
    wsData.push(mainHeaders);

    // Add sub-headers (Carton, Pack for each warehouse)
    const subHeaders = [
      "",
      "",
      "",
      "",
      "",
      "", // Empty for basic columns
    ];
    warehouses.forEach(() => {
      subHeaders.push("Carton", "Pack");
    });
    wsData.push(subHeaders);

    // Table data
    if (transformedData?.length > 0) {
      transformedData.forEach((item, index) => {
        const row = [
          index + 1,
          item.product_code || "-",
          item.product_name || "-",
          item.product_category || "-",
          item.supplier_name || "-",
          item.packing || "-",
        ];

        // Add carton and pack values for each warehouse
        warehouses.forEach((warehouse) => {
          const warehouseData = item.warehouseData[warehouse] || {
            carton: 0,
            pack: 0,
          };
          row.push(warehouseData.carton, warehouseData.pack);
        });

        wsData.push(row);
      });

      // Total row
      const totalRow = ["", "", "", "", "", "TOTAL"];

      warehouses.forEach((warehouse) => {
        const totals = warehouseTotals[warehouse] || { carton: 0, pack: 0 };
        totalRow.push(totals.carton, totals.pack);
      });

      wsData.push(totalRow);
    } else {
      const emptyRow = [
        "",
        "",
        "",
        "Tidak ada data stok barang yang ditemukan",
        "",
        "",
      ];

      // Add empty cells for warehouse columns
      warehouses.forEach(() => {
        emptyRow.push("", "");
      });

      wsData.push(emptyRow);
    }

    // Create worksheet
    const ws = xlsxLib.utils.aoa_to_sheet(wsData);

    // Set column widths - dynamic based on warehouses with sub-columns
    const colWidths = [
      { wch: 5 }, // NO
      { wch: 15 }, // KODE PRODUK
      { wch: 25 }, // NAMA PRODUK
      { wch: 15 }, // KATEGORI
      { wch: 15 }, // SUPPLIER
      { wch: 10 }, // PACKING
    ];

    // Add widths for each warehouse sub-columns (Carton, Pack)
    warehouses.forEach(() => {
      colWidths.push({ wch: 10 }); // Carton column
      colWidths.push({ wch: 8 }); // Pack column
    });

    ws["!cols"] = colWidths;

    // Set row heights for better presentation
    ws["!rows"] = [
      { hpt: 20 }, // Row 0: Title "LAPORAN STOK BARANG"
      { hpt: 16 }, // Row 1: Company "SUN FIREWORKS"
      { hpt: 12 }, // Row 2: Empty
      { hpt: 12 }, // Row 3: Filter info
      { hpt: 12 }, // Row 4: Total Data
      { hpt: 12 }, // Row 5: Tanggal Export
      { hpt: 12 }, // Row 6: Empty
      { hpt: 18 }, // Row 7: Main headers (NO, KODE, warehouse names)
      { hpt: 14 }, // Row 8: Sub-headers (Carton, Pack)
    ];

    // Add comprehensive merge cells for better header presentation
    const merges = [];

    // Find the actual header row by searching wsData
    const headerRowIdx = wsData.findIndex(
      (row) => Array.isArray(row) && row[0] === "NO" && row[1] === "KODE PRODUK"
    );

    if (headerRowIdx >= 0) {
      // Merge title header across all columns
      const totalCols = 6 + warehouses.length * 2; // 6 basic columns + 2 per warehouse
      if (totalCols > 1) {
        merges.push({
          s: { r: 0, c: 0 }, // "LAPORAN STOK BARANG"
          e: { r: 0, c: totalCols - 1 },
        });

        merges.push({
          s: { r: 1, c: 0 }, // "SUN FIREWORKS"
          e: { r: 1, c: totalCols - 1 },
        });
      }

      // Merge warehouse headers across their sub-columns (Carton + Pack)
      let colIndex = 6; // Start after PACKING column (F = 5, so next is 6)
      warehouses.forEach((warehouse) => {
        // Merge warehouse header across 2 columns (Carton + Pack)
        const startCol = colIndex;
        const endCol = colIndex + 1;

        merges.push({
          s: { r: headerRowIdx, c: startCol },
          e: { r: headerRowIdx, c: endCol },
        });

        colIndex += 2; // Move to next warehouse (skip 2 columns)
      });

      // Merge basic headers vertically (NO, KODE PRODUK, etc.) to span across both header rows
      for (let col = 0; col < 6; col++) {
        merges.push({
          s: { r: headerRowIdx, c: col },
          e: { r: headerRowIdx + 1, c: col },
        });
      }
    }

    // Apply merges to worksheet
    if (merges.length > 0) {
      ws["!merges"] = merges;
    }

    // Define comprehensive styles with simple, compatible format
    const titleHeaderStyle = {
      font: {
        name: "Arial",
        sz: 14,
        bold: true,
        color: { rgb: "000000" },
      },
      alignment: {
        horizontal: "center",
        vertical: "center",
      },
    };

    const companyHeaderStyle = {
      font: {
        name: "Arial",
        sz: 12,
        bold: true,
        color: { rgb: "000000" },
      },
      alignment: {
        horizontal: "center",
        vertical: "center",
      },
    };

    const headerStyle = {
      font: {
        name: "Arial",
        sz: 10,
        bold: true,
        color: { rgb: "000000" },
      },
      alignment: {
        horizontal: "center",
        vertical: "center",
      },
      border: {
        top: { style: "medium", color: { rgb: "000000" } },
        bottom: { style: "medium", color: { rgb: "000000" } },
        left: { style: "medium", color: { rgb: "000000" } },
        right: { style: "medium", color: { rgb: "000000" } },
      },
    };

    const warehouseHeaderStyle = {
      font: {
        name: "Arial",
        sz: 11,
        bold: true,
        color: { rgb: "000000" },
      },
      alignment: {
        horizontal: "center",
        vertical: "center",
      },
      border: {
        top: { style: "medium", color: { rgb: "000000" } },
        bottom: { style: "medium", color: { rgb: "000000" } },
        left: { style: "medium", color: { rgb: "000000" } },
        right: { style: "medium", color: { rgb: "000000" } },
      },
    };

    // Define data cell styles with simplified format
    const dataCellStyle = {
      font: {
        name: "Arial",
        sz: 9,
        color: { rgb: "000000" },
      },
      alignment: {
        horizontal: "center",
        vertical: "center",
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    };

    const productNameCellStyle = {
      font: {
        name: "Arial",
        sz: 9,
        color: { rgb: "000000" },
      },
      alignment: {
        horizontal: "left", // Product names left-aligned
        vertical: "center",
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    };

    const totalRowStyle = {
      font: {
        name: "Arial",
        sz: 10,
        bold: true,
        color: { rgb: "000000" },
      },
      alignment: {
        horizontal: "center",
        vertical: "center",
      },
      border: {
        top: { style: "medium", color: { rgb: "000000" } },
        bottom: { style: "medium", color: { rgb: "000000" } },
        left: { style: "medium", color: { rgb: "000000" } },
        right: { style: "medium", color: { rgb: "000000" } },
      },
    };

    // Apply comprehensive styling to ALL cells
    // First, find the actual header rows by checking wsData
    const actualHeaderRowIndex = wsData.findIndex(
      (row) => Array.isArray(row) && row[0] === "NO" && row[1] === "KODE PRODUK"
    );
    const actualSubHeaderRowIndex = actualHeaderRowIndex + 1;

    // Calculate the correct range based on wsData dimensions
    const maxRows = wsData.length;
    const maxCols = Math.max(
      ...wsData.map((row) => (Array.isArray(row) ? row.length : 0))
    );

    // Update worksheet range to ensure all cells are included
    ws["!ref"] = xlsxLib.utils.encode_range({
      s: { r: 0, c: 0 },
      e: { r: maxRows - 1, c: maxCols - 1 },
    });

    // Apply styles to EVERY cell using a more robust approach
    for (let row = 0; row < maxRows; row++) {
      for (let col = 0; col < maxCols; col++) {
        const cellAddress = xlsxLib.utils.encode_cell({ r: row, c: col });
        const cellValue =
          wsData[row] && wsData[row][col] ? wsData[row][col] : "";

        // Ensure cell exists with proper structure
        if (!ws[cellAddress]) {
          ws[cellAddress] = { v: cellValue, t: "s" }; // s = string type
        }

        // Ensure cell has value
        if (ws[cellAddress].v === undefined || ws[cellAddress].v === null) {
          ws[cellAddress].v = cellValue;
        }

        // Apply appropriate style based on cell position and content
        let cellStyle = null;

        if (row === 0) {
          // Title row "LAPORAN STOK BARANG"
          cellStyle = { ...titleHeaderStyle };
        } else if (row === 1) {
          // Company row "SUN FIREWORKS"
          cellStyle = { ...companyHeaderStyle };
        } else if (row === actualHeaderRowIndex) {
          // Main header row
          if (col >= 6 && cellValue && cellValue !== "") {
            // Warehouse header (merged across 2 columns)
            cellStyle = { ...warehouseHeaderStyle };
          } else {
            // Basic header (merged vertically with sub-header)
            cellStyle = { ...headerStyle };
          }
        } else if (row === actualSubHeaderRowIndex) {
          // Sub-header row (Carton, Pack)
          if (col >= 6) {
            // Sub-header under warehouse (Carton/Pack)
            cellStyle = { ...headerStyle };
          } else {
            // Merged cells don't need separate styling
            cellStyle = null;
          }
        } else if (row > actualSubHeaderRowIndex) {
          // Data rows
          const isTotalRow =
            (wsData[row] && wsData[row][5] === "TOTAL") ||
            String(cellValue).includes("Tidak ada data");

          if (isTotalRow) {
            // Total row
            cellStyle = { ...totalRowStyle };
          } else {
            // Regular data cell
            if (col === 2) {
              // NAMA PRODUK column
              cellStyle = { ...productNameCellStyle };
            } else {
              cellStyle = { ...dataCellStyle };
            }
          }
        } else {
          // Info rows (Filter, Total Data, Tanggal Export)
          cellStyle = {
            font: {
              name: "Arial",
              sz: 10,
              color: { rgb: "000000" },
            },
            alignment: {
              horizontal: "left",
              vertical: "center",
              wrapText: false,
              shrinkToFit: false,
              indent: 0,
            },
            numFmt: "@",
          };
        }

        // Apply style if defined
        if (cellStyle) {
          ws[cellAddress].s = cellStyle;

          // Ensure cell type is correct for numbers vs text
          if (typeof cellValue === "number") {
            ws[cellAddress].t = "n"; // number type
          } else {
            ws[cellAddress].t = "s"; // string type
          }
        }
      }
    }

    // Add worksheet to workbook
    xlsxLib.utils.book_append_sheet(wb, ws, "Laporan Stok Barang");

    // Generate filename with current date
    const currentDate = new Date().toISOString().split("T")[0];
    const filename = `Laporan_Stok_Barang_${currentDate}.xlsx`;

    // Debug: Check library and styling
    console.log("Has advanced styling:", hasAdvancedStyling);
    console.log("Library name:", xlsxLib.version || "Unknown version");
    console.log(
      "First cell has styling:",
      !!ws[xlsxLib.utils.encode_cell({ r: 0, c: 0 })].s
    );

    // Write and download file with proper styling options
    try {
      if (hasAdvancedStyling) {
        // Using xlsx-js-style - write with styling options enabled
        console.log("Writing with xlsx-js-style advanced styling options");
        xlsxLib.writeFile(wb, filename, {
          cellStyles: true,
          bookSST: false,
          bookType: "xlsx",
        });
      } else {
        // Using standard XLSX - basic write without styling
        console.log("Writing with standard XLSX (no styling)");
        xlsxLib.writeFile(wb, filename);
      }
    } catch (writeError) {
      console.error("Error writing Excel file with styling:", writeError);
      // Emergency fallback - try basic write
      try {
        xlsxLib.writeFile(wb, filename);
      } catch (basicError) {
        console.error("Basic write also failed:", basicError);
        throw basicError;
      }
    }

    return filename;
  } catch (error) {
    console.error("Error creating Excel file:", error);
    // Fallback to CSV export
    return exportStokBarangToExcel(reportData, filters);
  }
};

export const printStokBarangReport = (reportData, filters = {}) => {
  // Use original vertical structure for print
  const printData = reportData || [];

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
    if (filters.category && filters.category !== 0) {
      filterText.push(`Kategori: ${filters.category}`);
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
        <title>LAPORAN STOK BARANG</title>
        <style>
          @page {
            margin: 10mm;
            size: A4 landscape;
            @top-left { content: ""; }
            @top-center { content: ""; }
            @top-right { content: ""; }
            @bottom-left { content: ""; }
            @bottom-center { content: ""; }
            @bottom-right { content: ""; }
          }
          
          @media print {
            @page {
              size: A4 landscape !important;
              margin: 10mm !important;
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
            font-size: 8px;
            line-height: 1.3;
            color: black;
            font-weight: 400;
          }
          .header {
            text-align: center;
            margin-bottom: 15px;
            border-bottom: 1px solid black;
            padding-bottom: 8px;
          }
          .header h1 {
            font-size: 16px;
            font-weight: 600;
            margin: 0;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .header h2 {
            font-size: 12px;
            margin: 6px 0;
            color: #333;
          }
          .reportInfo {
            margin-bottom: 15px;
            font-size: 8px;
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
            font-size: 8px;
            margin-bottom: 20px;
            table-layout: fixed;
          }
          th, td {
            border: 1px solid black;
            padding: 4px 2px;
            text-align: center !important;
            vertical-align: middle !important;
            word-wrap: break-word;
            overflow: hidden;
          }
          th {
            background: white !important;
            font-weight: 600 !important;
            text-align: center !important;
            vertical-align: middle !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            border: 1px solid black !important;
            font-size: 8px;
          }
          .col-no { 
            width: 4%; 
            text-align: center !important;
            font-size: 8px;
          }
          .col-kode { 
            width: 10%; 
            font-size: 7px;
            text-align: center !important;
          }
          .col-nama { 
            width: 25%; 
            text-align: left !important;
            padding-left: 4px;
            font-size: 7px;
          }
          .col-kategori { 
            width: 15%; 
            font-size: 7px;
            text-align: center !important;
          }
          .col-supplier { 
            width: 15%; 
            font-size: 7px;
            text-align: center !important;
          }
          .col-packing { 
            width: 10%; 
            font-size: 7px;
            text-align: center !important;
          }
          .col-gudang { 
            width: 12%; 
            font-size: 7px;
            text-align: center !important;
          }
          .col-carton { 
            width: 7%; 
            font-size: 7px;
            text-align: center !important;
          }
          .col-pack { 
            width: 7%; 
            font-size: 7px;
            text-align: center !important;
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
            margin-top: 35px;
            display: flex;
            justify-content: space-between;
            font-size: 9px;
          }
          .printInfo {
            font-size: 10px;
            color: #666;
            text-align: right;
            margin-top: 25px;
          }
          .signature {
            text-align: center;
            margin-top: 25px;
          }
          .signature-box {
            display: inline-block;
            margin: 0 30px;
            text-align: center;
          }
          .signature-line {
            border-bottom: 1px solid black;
            width: 120px;
            height: 40px;
            display: inline-block;
            margin-bottom: 5px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>LAPORAN STOK BARANG</h1>
          <h2>SUN FIREWORKS</h2>
        </div>

        <div class="reportInfo">
          <div>
            <span class="label">Filter:</span>
            <span>${createFilterInfo()}</span>
          </div>
          <div>
            <span class="label">Total Data:</span>
            <span>${printData?.length || 0} item</span>
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
              <th class="col-kode">KODE</th>
              <th class="col-nama">NAMA</th>
              <th class="col-kategori">KATEGORI</th>
              <th class="col-supplier">SUPPLIER</th>
              <th class="col-packing">PACKING</th>
              <th class="col-gudang">GUDANG</th>
              <th class="col-carton">CARTON</th>
              <th class="col-pack">PACK</th>
            </tr>
          </thead>
          <tbody>
            ${
              printData?.length > 0
                ? printData
                    .map(
                      (item, index) => `
                <tr>
                  <td class="col-no">${index + 1}</td>
                  <td class="col-kode">${item.product_code || "-"}</td>
                  <td class="col-nama">${item.product_name || "-"}</td>
                  <td class="col-kategori">${item.product_category || "-"}</td>
                  <td class="col-supplier">${item.supplier_name || "-"}</td>
                  <td class="col-packing">${item.packing || "-"}</td>
                  <td class="col-gudang">${item.warehouse_name || "-"}</td>
                  <td class="col-carton">${formatNumberWithDot(
                    item.carton_quantity || 0
                  )}</td>
                  <td class="col-pack">${formatNumberWithDot(
                    item.pack_quantity || 0
                  )}</td>
                </tr>
              `
                    )
                    .join("")
                : `
                <tr>
                  <td colspan="9" style="text-align: center; padding: 20px; color: #666;">
                    Tidak ada data stok barang yang ditemukan
                  </td>
                </tr>
              `
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
        <title>Preview - LAPORAN STOK BARANG</title>
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
            <h1 class="preview-title">Preview - Laporan Stok Barang</h1>
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
export const downloadStokBarangReportAsPDF = async (
  reportData,
  filters = {}
) => {
  try {
    // This would require a PDF library like jsPDF or html2pdf
    // For now, we'll use the print function as fallback
    printStokBarangReport(reportData, filters);
  } catch (error) {
    console.error("Error generating PDF:", error);
    printStokBarangReport(reportData, filters);
  }
};
