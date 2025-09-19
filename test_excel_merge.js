// Test file untuk export Excel dengan merge cells
// Untuk menjalankan test ini, pastikan XLSX library sudah tersedia

import { exportStokBarangToExcelAdvanced } from "./src/utils/printStokBarangReport.js";

// Sample test data dengan multiple warehouses
const testData = [
  {
    product_code: "P001",
    product_name: "Produk Test 1",
    product_category: "Kategori A",
    supplier_name: "Supplier 1",
    packing: "Box",
    warehouse_name: "Gudang Utama",
    carton_quantity: 10,
    pack_quantity: 5,
  },
  {
    product_code: "P001",
    product_name: "Produk Test 1",
    product_category: "Kategori A",
    supplier_name: "Supplier 1",
    packing: "Box",
    warehouse_name: "Gudang Cabang A",
    carton_quantity: 8,
    pack_quantity: 3,
  },
  {
    product_code: "P001",
    product_name: "Produk Test 1",
    product_category: "Kategori A",
    supplier_name: "Supplier 1",
    packing: "Box",
    warehouse_name: "Gudang Cabang B",
    carton_quantity: 12,
    pack_quantity: 7,
  },
  {
    product_code: "P002",
    product_name: "Produk Test 2",
    product_category: "Kategori B",
    supplier_name: "Supplier 2",
    packing: "Pcs",
    warehouse_name: "Gudang Utama",
    carton_quantity: 15,
    pack_quantity: 2,
  },
  {
    product_code: "P002",
    product_name: "Produk Test 2",
    product_category: "Kategori B",
    supplier_name: "Supplier 2",
    packing: "Pcs",
    warehouse_name: "Gudang Cabang A",
    carton_quantity: 20,
    pack_quantity: 1,
  },
  {
    product_code: "P002",
    product_name: "Produk Test 2",
    product_category: "Kategori B",
    supplier_name: "Supplier 2",
    packing: "Pcs",
    warehouse_name: "Gudang Cabang B",
    carton_quantity: 5,
    pack_quantity: 9,
  },
];

const testFilters = {
  start_date: "2025-01-01",
  end_date: "2025-09-15",
  category: "Semua Kategori",
  supplier: "Semua Supplier",
  warehouse: "Semua Gudang",
};

// Test function dengan mock XLSX
console.log("🧪 Testing exportStokBarangToExcelAdvanced with merge cells...");

try {
  // Mock XLSX object untuk testing
  const mockXLSX = {
    utils: {
      book_new: () => ({ Sheets: {}, SheetNames: [] }),
      aoa_to_sheet: (data) => {
        console.log("✅ AOA to sheet conversion successful");
        const ws = {};
        // Mock worksheet dengan cells
        data.forEach((row, r) => {
          row.forEach((cell, c) => {
            const cellAddress = String.fromCharCode(65 + c) + (r + 1);
            ws[cellAddress] = { v: cell };
          });
        });
        return ws;
      },
      book_append_sheet: (wb, ws, name) => {
        console.log(`✅ Worksheet "${name}" added to workbook`);
        wb.Sheets[name] = ws;
        wb.SheetNames.push(name);
      },
      encode_cell: ({ r, c }) => {
        return String.fromCharCode(65 + c) + (r + 1);
      },
    },
    writeFile: (wb, filename) => {
      console.log(`✅ File "${filename}" would be generated`);
      console.log(`📊 Workbook contains ${wb.SheetNames.length} sheet(s)`);

      // Check for merges
      const ws = wb.Sheets[wb.SheetNames[0]];
      if (ws && ws["!merges"]) {
        console.log(`🔗 Merge cells found: ${ws["!merges"].length} merges`);
        ws["!merges"].forEach((merge, index) => {
          const startCell =
            String.fromCharCode(65 + merge.s.c) + (merge.s.r + 1);
          const endCell = String.fromCharCode(65 + merge.e.c) + (merge.e.r + 1);
          console.log(`   Merge ${index + 1}: ${startCell}:${endCell}`);
        });
      } else {
        console.log("❌ No merge cells found");
      }

      return filename;
    },
  };

  const result = exportStokBarangToExcelAdvanced(
    testData,
    testFilters,
    mockXLSX
  );
  console.log("✅ Function executed successfully");
  console.log(`📁 Generated file: ${result}`);
} catch (error) {
  console.error("❌ Error:", error);
}

console.log("\n📋 Test Summary:");
console.log(
  "- Function should handle data transformation to horizontal structure"
);
console.log("- Merge cells should be applied to warehouse headers");
console.log("- Each warehouse header should span 2 columns (Carton + Pack)");
console.log("- Styling should be applied to merged headers");
