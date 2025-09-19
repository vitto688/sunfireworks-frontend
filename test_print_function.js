// Test file to verify printStokBarangReport function
import { printStokBarangReport } from "./src/utils/printStokBarangReport.js";

// Sample test data
const testData = [
  {
    product_code: "P001",
    product_name: "Produk Test 1",
    product_category: "Kategori A",
    supplier_name: "Supplier 1",
    packing: "Box",
    warehouses: {
      "Gudang Utama": { carton: 10, pack: 5 },
      "Gudang Cabang A": { carton: 8, pack: 3 },
      "Gudang Cabang B": { carton: 12, pack: 7 },
    },
  },
  {
    product_code: "P002",
    product_name: "Produk Test 2",
    product_category: "Kategori B",
    supplier_name: "Supplier 2",
    packing: "Pcs",
    warehouses: {
      "Gudang Utama": { carton: 15, pack: 2 },
      "Gudang Cabang A": { carton: 20, pack: 1 },
      "Gudang Cabang B": { carton: 5, pack: 9 },
    },
  },
];

// Test the function
console.log("Testing printStokBarangReport function...");
try {
  printStokBarangReport(testData);
  console.log("✅ Function executed successfully");
} catch (error) {
  console.error("❌ Error:", error);
}
