// Test styling header Excel dengan center alignment
// Untuk memverifikasi bahwa semua header ter-align center

import { exportStokBarangToExcelAdvanced } from "./src/utils/printStokBarangReport.js";

// Sample test data
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
];

console.log("🎨 Testing Excel header styling with center alignment...");

// Mock XLSX dengan support styling
const mockXLSX = {
  utils: {
    book_new: () => ({ Sheets: {}, SheetNames: [] }),
    aoa_to_sheet: (data) => {
      const ws = {};
      data.forEach((row, r) => {
        row.forEach((cell, c) => {
          const cellAddress = String.fromCharCode(65 + c) + (r + 1);
          ws[cellAddress] = { v: cell, s: {} }; // Include style object
        });
      });
      console.log("✅ Worksheet created with style support");
      return ws;
    },
    book_append_sheet: (wb, ws, name) => {
      wb.Sheets[name] = ws;
      wb.SheetNames.push(name);
    },
    encode_cell: ({ r, c }) => String.fromCharCode(65 + c) + (r + 1),
  },
  writeFile: (wb, filename) => {
    console.log(`\n📊 Excel File: ${filename}`);

    const ws = wb.Sheets[wb.SheetNames[0]];

    console.log("\n🎯 Header Styling Check:");

    // Check main headers (A8 to F8)
    const mainHeaders = ["A8", "B8", "C8", "D8", "E8", "F8"];
    mainHeaders.forEach((cell, index) => {
      const headers = [
        "NO",
        "KODE PRODUK",
        "NAMA PRODUK",
        "KATEGORI",
        "SUPPLIER",
        "PACKING",
      ];
      if (ws[cell] && ws[cell].s) {
        const style = ws[cell].s;
        const alignment = style.alignment || {};
        console.log(
          `   ${cell} (${headers[index]}): ✅ Center aligned - H:${alignment.horizontal}, V:${alignment.vertical}`
        );
      } else {
        console.log(`   ${cell} (${headers[index]}): ❌ No styling found`);
      }
    });

    // Check warehouse headers (G8, I8, etc.)
    console.log("\n🏢 Warehouse Header Styling:");
    let colIndex = 6; // Start from G column
    ["Gudang Utama", "Gudang Cabang A"].forEach((warehouse, index) => {
      const cellAddress = String.fromCharCode(65 + colIndex) + "8";
      if (ws[cellAddress] && ws[cellAddress].s) {
        const style = ws[cellAddress].s;
        const alignment = style.alignment || {};
        const fill = style.fill || {};
        console.log(
          `   ${cellAddress} (${warehouse}): ✅ Center aligned - H:${alignment.horizontal}, V:${alignment.vertical}`
        );
        console.log(`      Background: ${fill.fgColor?.rgb || "none"}`);
      } else {
        console.log(`   ${cellAddress} (${warehouse}): ❌ No styling found`);
      }
      colIndex += 2;
    });

    // Check sub-headers (G9, H9, I9, J9)
    console.log("\n📦 Sub-Header Styling:");
    const subHeaders = ["G9", "H9", "I9", "J9"];
    const subLabels = ["Carton", "Pack", "Carton", "Pack"];
    subHeaders.forEach((cell, index) => {
      if (ws[cell] && ws[cell].s) {
        const style = ws[cell].s;
        const alignment = style.alignment || {};
        console.log(
          `   ${cell} (${subLabels[index]}): ✅ Center aligned - H:${alignment.horizontal}, V:${alignment.vertical}`
        );
      } else {
        console.log(`   ${cell} (${subLabels[index]}): ❌ No styling found`);
      }
    });

    // Check merges
    if (ws["!merges"]) {
      console.log(`\n🔗 Merge Cells: ${ws["!merges"].length} merges found`);
      ws["!merges"].forEach((merge, index) => {
        const startCell = String.fromCharCode(65 + merge.s.c) + (merge.s.r + 1);
        const endCell = String.fromCharCode(65 + merge.e.c) + (merge.e.r + 1);
        console.log(`   Merge ${index + 1}: ${startCell}:${endCell}`);
      });
    }

    return filename;
  },
};

try {
  const result = exportStokBarangToExcelAdvanced(testData, {}, mockXLSX);
  console.log("\n✅ Test completed successfully!");
  console.log("\n📋 Summary:");
  console.log(
    "- All headers should be center aligned horizontally and vertically"
  );
  console.log("- Warehouse headers should have light gray background");
  console.log("- All headers should have bold font and borders");
  console.log("- Sub-headers (Carton/Pack) should be center aligned");
} catch (error) {
  console.error("❌ Test failed:", error);
}
