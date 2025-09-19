// Example usage of the new horizontal warehouse structure
// This file demonstrates how the transformed printStokBarangReport functions work

// Sample data in the original vertical format
const sampleReportData = [
  {
    product_code: "FW001",
    product_name: "Roman Candle Red",
    product_category: "Roman Candles",
    supplier_name: "Supplier A",
    packing: "12/1",
    warehouse_name: "Gudang Utama",
    carton_quantity: 50,
    pack_quantity: 600,
  },
  {
    product_code: "FW001",
    product_name: "Roman Candle Red",
    product_category: "Roman Candles",
    supplier_name: "Supplier A",
    packing: "12/1",
    warehouse_name: "Gudang Cabang",
    carton_quantity: 25,
    pack_quantity: 300,
  },
  {
    product_code: "FW002",
    product_name: "Fountain Gold",
    product_category: "Fountains",
    supplier_name: "Supplier B",
    packing: "6/1",
    warehouse_name: "Gudang Utama",
    carton_quantity: 30,
    pack_quantity: 180,
  },
  {
    product_code: "FW002",
    product_name: "Fountain Gold",
    product_category: "Fountains",
    supplier_name: "Supplier B",
    packing: "6/1",
    warehouse_name: "Gudang Transit",
    carton_quantity: 15,
    pack_quantity: 90,
  },
];

// Sample filters
const sampleFilters = {
  start_date: "2025-09-01",
  end_date: "2025-09-15",
  category: 0,
  supplier: 0,
  warehouse: 0,
  search: "",
};

/*
Expected transformation result:

ORIGINAL STRUCTURE (vertical):
NO | KODE | NAMA | KATEGORI | SUPPLIER | PACKING | GUDANG | CARTON | PACK
1  | FW001| Roman Candle Red | Roman Candles | Supplier A | 12/1 | Gudang Utama | 50 | 600
2  | FW001| Roman Candle Red | Roman Candles | Supplier A | 12/1 | Gudang Cabang | 25 | 300  
3  | FW002| Fountain Gold | Fountains | Supplier B | 6/1 | Gudang Utama | 30 | 180
4  | FW002| Fountain Gold | Fountains | Supplier B | 6/1 | Gudang Transit | 15 | 90

NEW STRUCTURE (horizontal with sub-columns):
NO | KODE | NAMA | KATEGORI | SUPPLIER | PACKING |    Gudang Utama     |    Gudang Cabang    |    Gudang Transit   
   |      |      |          |          |         | Carton | Pack      | Carton | Pack      | Carton | Pack      
1  | FW001| Roman Candle Red | Roman Candles | Supplier A | 12/1 | 50     | 600       | 25     | 300       | 0      | 0        
2  | FW002| Fountain Gold | Fountains | Supplier B | 6/1 | 30     | 180       | 0      | 0         | 15     | 90       
-- | ---- | ---- | ---- | ---- | TOTAL | 80     | 780       | 25     | 300       | 15     | 90       

Benefits:
1. More compact display - fewer rows  
2. Clear separation between carton and pack values
3. Easy comparison across warehouses for same product
4. Better readability with dedicated sub-columns
5. Professional table structure with multi-level headers
*/

// Usage examples:
// exportStokBarangToExcel(sampleReportData, sampleFilters)
// exportStokBarangToExcelAdvanced(sampleReportData, sampleFilters)
// printStokBarangReport(sampleReportData, sampleFilters)

export { sampleReportData, sampleFilters };
