// Test file untuk verifikasi xlsx-js-style center alignment
const XLSXStyle = require("xlsx-js-style");

console.log("Testing xlsx-js-style library...");
console.log("Version:", XLSXStyle.version);

// Test data
const testData = [
  ["LAPORAN STOK BARANG"],
  ["SUN FIREWORKS"],
  [""],
  ["NO", "NAMA PRODUK", "KATEGORI"],
  ["1", "Test Product 1", "Test Category"],
  ["2", "Test Product 2", "Test Category"],
];

// Create worksheet
const ws = XLSXStyle.utils.aoa_to_sheet(testData);

// Define center alignment style
const centerStyle = {
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
  border: {
    top: { style: "thin", color: { rgb: "000000" } },
    bottom: { style: "thin", color: { rgb: "000000" } },
    left: { style: "thin", color: { rgb: "000000" } },
    right: { style: "thin", color: { rgb: "000000" } },
  },
};

// Apply style to header cells
const range = XLSXStyle.utils.decode_range(ws["!ref"]);
for (let row = 0; row <= 3; row++) {
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddr = XLSXStyle.utils.encode_cell({ r: row, c: col });
    if (ws[cellAddr]) {
      ws[cellAddr].s = centerStyle;
      console.log(`Applied style to cell ${cellAddr}:`, ws[cellAddr].s);
    }
  }
}

// Create workbook and add worksheet
const wb = XLSXStyle.utils.book_new();
XLSXStyle.utils.book_append_sheet(wb, ws, "Test Sheet");

// Write test file
try {
  XLSXStyle.writeFile(wb, "test_center_alignment.xlsx", {
    cellStyles: true,
    bookType: "xlsx",
  });
  console.log("✅ Test file created: test_center_alignment.xlsx");
  console.log("Check if headers are centered in Excel/LibreOffice");
} catch (error) {
  console.error("❌ Error creating test file:", error);
}
