// Test file untuk verifikasi border rata dan tanpa background berwarna
const XLSXStyle = require("xlsx-js-style");

console.log("Testing border consistency and no colored backgrounds...");

// Test data yang mirip dengan struktur real
const testData = [
  ["LAPORAN STOK BARANG"],
  ["SUN FIREWORKS"],
  [""],
  [
    "NO",
    "KODE PRODUK",
    "NAMA PRODUK",
    "KATEGORI",
    "Royal",
    "",
    "G3-Updated",
    "",
  ],
  ["", "", "", "", "Carton", "Pack", "Carton", "Pack"],
  [
    "1",
    "IF RC0805 A-2",
    'Roman Candle 0.8" 5 shots A-2',
    "ROMAN CANDLE",
    "100",
    "100",
    "9",
    "19",
  ],
  [
    "2",
    "IF RC0808 A-1",
    'Roman Candle 0.8" 8 shots A-1',
    "ROMAN CANDLE",
    "43",
    "27",
    "0",
    "5",
  ],
  ["", "", "", "TOTAL", "143", "127", "9", "24"],
];

// Create worksheet
const ws = XLSXStyle.utils.aoa_to_sheet(testData);

// Define styles tanpa background berwarna dan border konsisten
const titleStyle = {
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

const dataStyle = {
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

const totalStyle = {
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

// Apply styles
const range = XLSXStyle.utils.decode_range(ws["!ref"]);

for (let row = 0; row <= range.e.r; row++) {
  for (let col = 0; col <= range.e.c; col++) {
    const cellAddr = XLSXStyle.utils.encode_cell({ r: row, c: col });

    if (!ws[cellAddr]) {
      ws[cellAddr] = { t: "s", v: "" };
    }

    // Apply styles based on row
    if (row === 0 || row === 1) {
      ws[cellAddr].s = titleStyle;
    } else if (row === 3 || row === 4) {
      // Header rows - medium border, no background
      ws[cellAddr].s = headerStyle;
    } else if (row === 7) {
      // Total row - medium border, no background
      ws[cellAddr].s = totalStyle;
    } else if (row > 4 && row < 7) {
      // Data rows - thin border
      ws[cellAddr].s = dataStyle;
    }
  }
}

// Add merge cells for warehouse headers
ws["!merges"] = [
  { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }, // Title
  { s: { r: 1, c: 0 }, e: { r: 1, c: 7 } }, // Company
  { s: { r: 3, c: 4 }, e: { r: 3, c: 5 } }, // Royal
  { s: { r: 3, c: 6 }, e: { r: 3, c: 7 } }, // G3-Updated
];

// Set column widths
ws["!cols"] = [
  { wch: 5 }, // NO
  { wch: 15 }, // KODE PRODUK
  { wch: 30 }, // NAMA PRODUK
  { wch: 15 }, // KATEGORI
  { wch: 10 }, // Carton
  { wch: 8 }, // Pack
  { wch: 10 }, // Carton
  { wch: 8 }, // Pack
];

// Create workbook
const wb = XLSXStyle.utils.book_new();
XLSXStyle.utils.book_append_sheet(wb, ws, "Test Border & No Background");

// Write file
try {
  XLSXStyle.writeFile(wb, "test_border_no_background.xlsx", {
    cellStyles: true,
    bookType: "xlsx",
  });
  console.log("✅ Test file created: test_border_no_background.xlsx");
  console.log("📋 Verification checklist:");
  console.log("   ✓ Header borders should be medium (thick and consistent)");
  console.log("   ✓ Data cell borders should be thin but consistent");
  console.log("   ✓ Total row borders should be medium (thick)");
  console.log("   ✓ NO colored backgrounds - all cells should be white");
  console.log("   ✓ Headers should be centered and bold");
  console.log("   ✓ Merged warehouse headers should look professional");
} catch (error) {
  console.error("❌ Error creating test file:", error);
}
