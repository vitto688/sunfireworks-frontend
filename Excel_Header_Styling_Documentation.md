# Header Styling untuk Excel Export - Documentation

## ✅ Fitur Center Alignment Header Excel Berhasil Ditambahkan

### **1. Header Style Configuration:**

#### **Base Header Style:**

```javascript
const headerStyle = {
  font: { bold: true, sz: 10 },
  alignment: { horizontal: "center", vertical: "center" },
  border: {
    /* thin black borders on all sides */
  },
};
```

#### **Warehouse Header Style:**

```javascript
const warehouseHeaderStyle = {
  ...headerStyle,
  font: { bold: true, sz: 11 }, // Slightly larger font
  fill: { fgColor: { rgb: "F8F9FA" } }, // Light gray background
};
```

### **2. Header Cells yang Di-styling:**

#### **Main Headers (Row 8):**

- ✅ **A8**: NO - Center aligned, bold
- ✅ **B8**: KODE PRODUK - Center aligned, bold
- ✅ **C8**: NAMA PRODUK - Center aligned, bold
- ✅ **D8**: KATEGORI - Center aligned, bold
- ✅ **E8**: SUPPLIER - Center aligned, bold
- ✅ **F8**: PACKING - Center aligned, bold

#### **Warehouse Headers (Row 8, Dynamic Columns):**

- ✅ **G8, I8, K8, etc.**: Nama Gudang - Center aligned, bold, gray background, merged cells
- ✅ Setiap header gudang merentang 2 kolom (Carton + Pack)

#### **Sub-Headers (Row 9):**

- ✅ **G9, I9, K9, etc.**: "Carton" - Center aligned, bold
- ✅ **H9, J9, L9, etc.**: "Pack" - Center aligned, bold

### **3. Styling Features:**

#### **Alignment:**

- 🎯 **Horizontal**: Center untuk semua header
- 🎯 **Vertical**: Center untuk semua header

#### **Typography:**

- 🎯 **Font Weight**: Bold untuk semua header
- 🎯 **Font Size**: 10pt untuk main/sub headers, 11pt untuk warehouse headers

#### **Visual:**

- 🎯 **Borders**: Thin black borders pada semua sisi
- 🎯 **Background**: Light gray (#F8F9FA) untuk warehouse headers
- 🎯 **Merge Cells**: Warehouse headers ter-merge merentang 2 kolom

### **4. Implementation Benefits:**

#### **Konsistensi Visual:**

- ✅ Semua header memiliki styling yang uniform
- ✅ Center alignment membuat tampilan lebih professional
- ✅ Warehouse headers menonjol dengan background gray

#### **Readability:**

- ✅ Bold font membuat header mudah dibaca
- ✅ Center alignment memudahkan scanning data
- ✅ Consistent borders memberikan struktur yang jelas

#### **Professional Look:**

- ✅ Styling mirip dengan format HTML print
- ✅ Merged warehouse headers terlihat rapi
- ✅ Color coding untuk membedakan jenis header

### **5. Usage Example:**

```javascript
// Memanggil fungsi dengan XLSX library
const filename = exportStokBarangToExcelAdvanced(reportData, filters, XLSX);

// Hasil: Excel file dengan header yang ter-center alignment
// - Semua header bold dan center aligned
// - Warehouse headers dengan background gray
// - Border hitam pada semua header cells
// - Merge cells untuk warehouse headers
```

### **6. Compatibility:**

- ✅ **XLSX Library**: Requires XLSX.js library untuk styling support
- ✅ **Fallback**: Otomatis fallback ke CSV export jika XLSX tidak tersedia
- ✅ **Dynamic**: Mendukung jumlah gudang yang dinamis
- ✅ **Cross-platform**: Berfungsi di semua platform yang support XLSX

---

**Status: ✅ COMPLETED**
Semua header table pada Excel export sekarang memiliki center alignment dengan styling yang konsisten dan professional.
