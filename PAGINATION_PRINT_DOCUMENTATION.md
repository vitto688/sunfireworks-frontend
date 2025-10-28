# Dokumentasi Print Function dengan Pagination

## Fitur Print Surat Jalan dengan Pagination Otomatis

Fungsi `printSuratJalan` telah diperbarui untuk mendukung pagination otomatis ketika jumlah item melebihi batas per halaman.

### Fitur Utama

✅ **Pagination Otomatis**

- Secara otomatis membagi items menjadi beberapa halaman
- Default: 10 items per halaman (dapat disesuaikan)
- Penomoran item berlanjut antar halaman (continuous numbering)

✅ **Header yang Berulang di Setiap Halaman**

- Judul "SURAT JALAN"
- Informasi dokumen (Tanggal, No. SJ, No. SPK, dll.)
- Informasi customer (Kepada YTH, UP, Alamat, dll.)
- Header tabel lengkap dengan kolom CARTON dan PACK
- Nomor halaman (contoh: "Halaman 1 dari 3")

✅ **Footer Hanya di Halaman Terakhir**

- Total CARTON dan PACK
- Catatan
- Tanda tangan

✅ **Page Break Otomatis**

- Menggunakan CSS `page-break-after` untuk pemisahan halaman
- Optimized untuk printer A4

### Cara Penggunaan

#### 1. Import Fungsi

```javascript
import { printSuratJalan } from "./utils/printSuratJalanUtils";
```

#### 2. Penggunaan Dasar (10 items per halaman)

```javascript
// Dengan data surat jalan yang sudah ada
printSuratJalan(suratJalanData);
```

#### 3. Custom Items Per Halaman

```javascript
// Contoh: 15 items per halaman
printSuratJalan(suratJalanData, 15);

// Contoh: 5 items per halaman
printSuratJalan(suratJalanData, 5);
```

#### 4. Contoh Implementasi di React Component

```javascript
import React from "react";
import { printSuratJalan } from "../utils/printSuratJalanUtils";
import { fetchSuratJalanById } from "../api/suratJalan";

const SuratJalanDetail = ({ id }) => {
  const handlePrint = async () => {
    try {
      const data = await fetchSuratJalanById(id);
      printSuratJalan(data); // 10 items per halaman
    } catch (error) {
      console.error("Error printing:", error);
      alert("Gagal mencetak dokumen");
    }
  };

  return <button onClick={handlePrint}>🖨️ Print Surat Jalan</button>;
};
```

### Struktur Data yang Diperlukan

```javascript
const suratJalanData = {
  document_number: "SJ-2024-001",
  created_at: "2024-10-23",
  transaction_date: "2024-10-23",
  customer_name: "PT. Contoh",
  customer_upline: "Bpk. John",
  customer_address: "Jl. Contoh No. 123",
  vehicle_type: "Truk",
  vehicle_number: "B 1234 XYZ",
  spk_document_number: "SPK-2024-001",
  notes: "Harap diperiksa dengan teliti",
  items: [
    {
      product_code: "PRD001",
      product_name: "Produk A",
      packing: "Box",
      carton_quantity: 10,
      pack_quantity: 100,
    },
    // ... item lainnya (bisa lebih dari 10)
  ],
};
```

### Contoh Skenario

#### Skenario 1: 8 Items (1 Halaman)

```javascript
// Data dengan 8 items
printSuratJalan(dataWith8Items);
// Hasil: 1 halaman dengan semua item + footer
```

#### Skenario 2: 25 Items (3 Halaman dengan default 10 items/page)

```javascript
// Data dengan 25 items
printSuratJalan(dataWith25Items);
// Hasil:
// - Halaman 1: Items 1-10 (dengan header tabel)
// - Halaman 2: Items 11-20 (dengan header tabel)
// - Halaman 3: Items 21-25 (dengan header tabel + total + footer)
```

#### Skenario 3: 25 Items (2 Halaman dengan 15 items/page)

```javascript
// Data dengan 25 items, custom 15 items per halaman
printSuratJalan(dataWith25Items, 15);
// Hasil:
// - Halaman 1: Items 1-15 (dengan header tabel)
// - Halaman 2: Items 16-25 (dengan header tabel + total + footer)
```

### Fitur Preview

Sebelum print, akan muncul window preview dengan:

- Preview dokumen lengkap
- Tombol "Print Document" untuk melanjutkan ke dialog print
- Tombol "Close" untuk membatalkan

### Catatan Teknis

1. **Penomoran Global**: Nomor item berlanjut antar halaman (1, 2, 3, ... 25)
2. **Total**: Total CARTON dan PACK hanya muncul di halaman terakhir
3. **Page Break**: Menggunakan CSS `page-break-after: always` untuk pemisahan halaman
4. **Print Optimization**: Sudah dioptimasi untuk printer Epson LX-310 dan A4

### Troubleshooting

#### Print tidak bekerja?

- Pastikan browser mengizinkan pop-up
- Cek console browser untuk error

#### Header tidak muncul di halaman kedua?

- Pastikan browser mendukung CSS `page-break-after`
- Coba gunakan Chrome atau Firefox terbaru

#### Total muncul di setiap halaman?

- Ini bug, seharusnya hanya di halaman terakhir
- Pastikan menggunakan versi terbaru dari file ini

### File Terkait

- **Function**: `/src/utils/printSuratJalanUtils.js`
- **API**: `/src/api/suratJalan.js`
- **Number Formatter**: `/src/utils/numberUtils.js`

### Update History

- **23 Oktober 2024**: Menambahkan fitur pagination otomatis dengan header berulang
