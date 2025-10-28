# 📄 Dokumentasi Layout Continuous Form 2-Up

## Overview

Fungsi `printSuratJalan` telah dikonfigurasi untuk mencetak dalam format **2-up layout** pada kertas continuous form ukuran **9.5 x 11 inci**.

Setiap lembar kertas 11 inci dibagi menjadi **2 halaman @ 5.5 inci**, sehingga lebih efisien dan hemat kertas.

---

## 📐 Spesifikasi Layout

### Ukuran Kertas

- **Lebar**: 9.5 inci (continuous form standard)
- **Panjang**: 11 inci (per lembar)

### Layout Per Lembar

- **Halaman 1**: 0" - 5.5" (bagian atas)
- **Halaman 2**: 5.5" - 11" (bagian bawah)

### Padding

- **Horizontal**: 0.4 inci (kiri & kanan)
- **Vertical**: 0.3 inci (atas & bawah)

---

## 🎯 Cara Kerja

### 1. **Pagination Logic**

```javascript
// Page break setiap 2 halaman (karena 1 lembar = 2 halaman)
const pageBreakClass = !isLastPage && (page + 1) % 2 === 0 ? "page-break" : "";
```

**Contoh dengan 5 halaman surat jalan:**

- Lembar 1: Halaman 1 & 2
- Lembar 2: Halaman 3 & 4
- Lembar 3: Halaman 5

### 2. **CSS Height Control**

```css
.page-container {
  height: 5.5in; /* Setiap halaman tepat 5.5 inci */
  overflow: hidden; /* Cegah overflow ke halaman berikutnya */
}
```

### 3. **Font Size Optimization**

Semua font size dikurangi untuk memuat konten dalam 5.5 inci:

- **Header**: 12px (dari 14px)
- **Body Text**: 9px (dari 11px)
- **Table**: 9px (dari 11px)

---

## 📊 Contoh Skenario

### Skenario 1: 10 Items (1 Halaman SJ)

```
Lembar 1:
├── Halaman 1: Items 1-10 + Total + Footer
└── [Kosong - bisa dipotong]
```

### Skenario 2: 25 Items (2 Halaman SJ)

```
Lembar 1:
├── Halaman 1: Items 1-15
└── Halaman 2: Items 16-25 + Total + Footer
```

### Skenario 3: 50 Items (4 Halaman SJ)

```
Lembar 1:
├── Halaman 1: Items 1-15
└── Halaman 2: Items 16-30

Lembar 2:
├── Halaman 3: Items 31-45
└── Halaman 4: Items 46-50 + Total + Footer
```

### Skenario 4: 70 Items (5 Halaman SJ)

```
Lembar 1:
├── Halaman 1: Items 1-15
└── Halaman 2: Items 16-30

Lembar 2:
├── Halaman 3: Items 31-45
└── Halaman 4: Items 46-60

Lembar 3:
├── Halaman 5: Items 61-70 + Total + Footer
└── [Kosong - bisa dipotong]
```

---

## 💡 Keuntungan Layout 2-Up

### ✅ **Efisiensi Kertas**

- Hemat 50% kertas untuk dokumen dengan halaman ganjil
- Misal: 3 halaman hanya butuh 2 lembar (bukan 3)

### ✅ **Continuous Form Friendly**

- Cocok untuk printer dot matrix
- Mudah dipotong sesuai kebutuhan
- Standard format untuk dokumen bisnis

### ✅ **Konsistensi**

- Setiap halaman memiliki tinggi yang sama (5.5")
- Header berulang di setiap halaman
- Mudah dibaca dan diarsipkan

---

## ⚙️ Konfigurasi Print

### Pengaturan Printer yang Direkomendasikan:

1. **Paper Size**: Custom 9.5 x 11 inches
2. **Margins**: 0 (Zero margin)
3. **Scale**: 100% (No scaling)
4. **Headers/Footers**: None
5. **Background Graphics**: On

### Untuk Browser Chrome:

```
Destination: Pilih printer Anda
Pages: All
Layout: Portrait
Margins: None
Scale: 100
Options: ✓ Background graphics
```

---

## 🔧 Customization

### Mengubah Jumlah Items Per Halaman

```javascript
// Default: 15 items per halaman
printSuratJalan(data);

// Custom: 10 items per halaman
printSuratJalan(data, 10);

// Custom: 20 items per halaman (butuh lebih banyak lembar)
printSuratJalan(data, 20);
```

### Mengubah Ukuran Font

Edit di file `printSuratJalanUtils.js`:

```css
/* Ubah nilai font-size sesuai kebutuhan */
.header h1 {
  font-size: 12px;
} /* Header utama */
.infoRow .label {
  font-size: 9px;
} /* Label info */
th,
td {
  font-size: 9px;
} /* Tabel */
```

### Mengubah Padding Container

```css
.page-container {
  padding: 0.3in 0.4in; /* vertical horizontal */
}
```

---

## 📝 Tips & Best Practices

### 1. **Testing Sebelum Print**

- Gunakan Print Preview untuk verifikasi layout
- Cek apakah konten tidak terpotong
- Pastikan page break di posisi yang benar

### 2. **Handling Footer**

- Footer (Total, Catatan, Tanda Tangan) hanya muncul di halaman terakhir
- Jika halaman terakhir terlalu penuh, kurangi items per page

### 3. **Kertas Continuous Form**

- Pastikan kertas terpasang dengan benar
- Set printer ke mode continuous form
- Kalibrasi page length jika diperlukan

### 4. **Pemotongan Kertas**

- Potong di tengah (5.5") jika ingin pisahkan 2 halaman
- Atau biarkan 2 halaman menyatu untuk arsip

---

## 🐛 Troubleshooting

### Problem: Konten terpotong di halaman kedua

**Solusi**:

- Kurangi `itemsPerPage` dari 15 ke 12 atau 10
- Atau kurangi font size di CSS

### Problem: Page break tidak tepat

**Solusi**:

- Pastikan browser mendukung CSS `page-break-after`
- Coba gunakan Chrome atau Firefox terbaru
- Check printer settings (margins = 0)

### Problem: Halaman kedua terlalu ke atas/bawah

**Solusi**:

- Adjust height di `.page-container { height: 5.5in; }`
- Bisa coba 5.4in atau 5.6in sesuai printer

### Problem: Preview berbeda dengan hasil print

**Solusi**:

- Set scale ke 100% (no scaling)
- Disable header/footer browser
- Enable background graphics

---

## 📦 File Terkait

- **Fungsi Print**: `/src/utils/printSuratJalanUtils.js`
- **API**: `/src/api/suratJalan.js`
- **Number Formatter**: `/src/utils/numberUtils.js`
- **Test File**: `/test_pagination_surat_jalan.html`

---

## 🎉 Summary

Format continuous form 2-up ini memberikan:

- ✅ Efisiensi kertas hingga 50%
- ✅ Layout profesional dan konsisten
- ✅ Kompatibel dengan printer dot matrix
- ✅ Mudah dipotong dan diarsipkan
- ✅ Header berulang di setiap halaman
- ✅ Pagination otomatis

**Update**: 24 Oktober 2025
