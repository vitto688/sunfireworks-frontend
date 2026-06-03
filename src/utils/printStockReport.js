import { formatNumberWithDot, formatDate } from "./numberUtils";
import { writeStyledReport } from "./excelReportStyle";

/*
 * Util export/print khusus halaman Stok (/stok).
 * Kolom dibuat FLAT persis seperti tabel di website (data sudah di-grouping per produk):
 *   No | Kode Produk | Nama Produk | Packing | Karton | Pack | Total
 * Data yang dikirim adalah data yang sedang tampil (sudah terfilter & di-grouping),
 * sehingga hasil export/print selalu sama dengan yang dilihat user di website.
 */

// Definisi kolom (urutan & lebar mengikuti tabel website)
const COLUMNS = [
  { label: "NO", width: 6, align: "center" },
  { label: "KODE PRODUK", width: 16, align: "center" },
  { label: "NAMA PRODUK", width: 34, align: "left" },
  { label: "PACKING", width: 12, align: "center" },
  { label: "KARTON", width: 12, align: "center" },
  { label: "PACK", width: 12, align: "center" },
  { label: "TOTAL", width: 12, align: "center" },
];

// Gabungkan baris stok per produk (carton & pack dijumlahkan lintas gudang)
export const groupStockByProduct = (data = []) => {
  const map = new Map();
  data.forEach((item) => {
    const key = item.product ?? `${item.product_code}-${item.product_name}`;
    if (!map.has(key)) {
      map.set(key, {
        product: item.product,
        product_code: item.product_code,
        product_name: item.product_name,
        packing: item.packing,
        carton_quantity: 0,
        pack_quantity: 0,
      });
    }
    const group = map.get(key);
    group.carton_quantity += item.carton_quantity || 0;
    group.pack_quantity += item.pack_quantity || 0;
  });
  return Array.from(map.values());
};

// Susun baris data flat + hitung total
const buildRows = (data = []) => {
  let totalCarton = 0;
  let totalPack = 0;

  const rows = data.map((item, index) => {
    const carton = item.carton_quantity || 0;
    const pack = item.pack_quantity || 0;
    totalCarton += carton;
    totalPack += pack;

    return [
      index + 1,
      item.product_code || "-",
      item.product_name || "-",
      item.packing || "-",
      carton,
      pack,
      carton + pack,
    ];
  });

  return {
    rows,
    totalCarton,
    totalPack,
    totalAll: totalCarton + totalPack,
  };
};

// Info filter yang aktif (untuk header laporan)
const createFilterInfo = (filters = {}) => {
  const parts = [];
  if (filters.start_date || filters.end_date) {
    parts.push(
      `Periode: ${filters.start_date ? formatDate(filters.start_date) : "..."} - ${
        filters.end_date ? formatDate(filters.end_date) : "..."
      }`
    );
  }
  if (filters.category && filters.category !== 0) {
    parts.push(`Kategori: ${filters.category}`);
  }
  if (filters.supplier && filters.supplier !== 0) {
    parts.push(`Eksportir: ${filters.supplier}`);
  }
  if (filters.warehouse && filters.warehouse !== 0) {
    parts.push(`Gudang: ${filters.warehouse}`);
  }
  if (filters.only_with_stock) {
    parts.push("Hanya yang ada stok");
  }
  if (filters.search) {
    parts.push(`Pencarian: ${filters.search}`);
  }
  return parts.length > 0 ? parts.join(" | ") : "Semua Data";
};

// ===== CSV (Excel-compatible, tanpa styling) =====
export const exportStockToCsv = (data = [], filters = {}) => {
  const { rows, totalCarton, totalPack, totalAll } = buildRows(data);

  const content = [];
  content.push(["LAPORAN STOK"]);
  content.push(["SUN FIREWORKS"]);
  content.push([""]);
  content.push(["Filter:", createFilterInfo(filters)]);
  content.push(["Total Data:", `${rows.length} item`]);
  content.push(["Tanggal Export:", formatDate(new Date())]);
  content.push([""]);
  content.push(COLUMNS.map((c) => c.label));

  if (rows.length > 0) {
    rows.forEach((row) => content.push(row));
    content.push(["", "", "", "TOTAL", totalCarton, totalPack, totalAll]);
  } else {
    content.push(["", "", "Tidak ada data stok yang ditemukan", "", "", "", ""]);
  }

  const csvString = content
    .map((row) =>
      row
        .map((cell) => {
          const s = String(cell ?? "");
          if (s.includes(",") || s.includes('"') || s.includes("\n")) {
            return `"${s.replace(/"/g, '""')}"`;
          }
          return s;
        })
        .join(",")
    )
    .join("\n");

  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const currentDate = new Date().toISOString().split("T")[0];
  const filename = `Laporan_Stok_${currentDate}.csv`;
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return filename;
};

// ===== Excel berstyling (pakai helper bersama excelReportStyle) =====
export const exportStockToExcel = (data = [], filters = {}) => {
  try {
    const { rows, totalCarton, totalPack, totalAll } = buildRows(data);

    const wsData = [];
    wsData.push(["LAPORAN STOK"]);
    wsData.push(["SUN FIREWORKS"]);
    wsData.push([""]);
    wsData.push(["Filter:", createFilterInfo(filters)]);
    wsData.push(["Total Data:", `${rows.length} item`]);
    wsData.push(["Tanggal Export:", formatDate(new Date())]);
    wsData.push([""]);
    wsData.push(COLUMNS.map((c) => c.label));

    if (rows.length > 0) {
      rows.forEach((row) => wsData.push(row));
      wsData.push(["", "", "", "TOTAL", totalCarton, totalPack, totalAll]);
    } else {
      wsData.push(["", "", "Tidak ada data stok yang ditemukan", "", "", "", ""]);
    }

    const currentDate = new Date().toISOString().split("T")[0];
    const filename = `Laporan_Stok_${currentDate}.xlsx`;

    return writeStyledReport(wsData, {
      colWidths: COLUMNS.map((c) => ({ wch: c.width })),
      sheetName: "Laporan Stok",
      filename,
    });
  } catch (error) {
    console.error("Error membuat file Excel:", error);
    return exportStockToCsv(data, filters);
  }
};

// ===== Print (HTML, kolom flat sama seperti website) =====
export const printStockReport = (data = [], filters = {}) => {
  const { rows, totalCarton, totalPack, totalAll } = buildRows(data);

  const bodyRows =
    rows.length > 0
      ? rows
          .map(
            (row) => `
              <tr>
                <td class="c">${row[0]}</td>
                <td class="c">${row[1]}</td>
                <td class="l">${row[2]}</td>
                <td class="c">${row[3]}</td>
                <td class="r">${formatNumberWithDot(row[4])}</td>
                <td class="r">${formatNumberWithDot(row[5])}</td>
                <td class="r">${formatNumberWithDot(row[6])}</td>
              </tr>`
          )
          .join("")
      : `<tr><td colspan="7" style="text-align:center;padding:20px;color:#666;">Tidak ada data stok yang ditemukan</td></tr>`;

  const totalRow =
    rows.length > 0
      ? `<tr class="total-row">
           <td colspan="4" class="r"><strong>TOTAL</strong></td>
           <td class="r"><strong>${formatNumberWithDot(totalCarton)}</strong></td>
           <td class="r"><strong>${formatNumberWithDot(totalPack)}</strong></td>
           <td class="r"><strong>${formatNumberWithDot(totalAll)}</strong></td>
         </tr>`
      : "";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>LAPORAN STOK</title>
      <style>
        @page { margin: 10mm; size: A4 landscape; }
        @media print { @page { size: A4 landscape !important; margin: 10mm !important; } }
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; font-size: 9px; color: #000; }
        .header { text-align: center; margin-bottom: 12px; border-bottom: 1px solid #000; padding-bottom: 6px; }
        .header h1 { font-size: 16px; margin: 0; text-transform: uppercase; letter-spacing: 1px; }
        .header h2 { font-size: 12px; margin: 4px 0; color: #333; }
        .reportInfo { margin-bottom: 12px; font-size: 9px; }
        .reportInfo div { margin: 3px 0; }
        .reportInfo .label { font-weight: 600; display: inline-block; width: 110px; }
        table { width: 100%; border-collapse: collapse; font-size: 9px; }
        th, td { border: 1px solid #000; padding: 4px 6px; }
        th { background: #2563eb; color: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        td.c, th { text-align: center; }
        td.l { text-align: left; }
        td.r { text-align: right; }
        .total-row { background: #f1f5f9; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .printInfo { margin-top: 20px; font-size: 9px; color: #666; text-align: right; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Laporan Stok</h1>
        <h2>SUN FIREWORKS</h2>
      </div>
      <div class="reportInfo">
        <div><span class="label">Filter:</span><span>${createFilterInfo(filters)}</span></div>
        <div><span class="label">Total Data:</span><span>${rows.length} item</span></div>
        <div><span class="label">Tanggal Cetak:</span><span>${formatDate(new Date())}</span></div>
      </div>
      <table>
        <thead>
          <tr>
            ${COLUMNS.map((c) => `<th>${c.label}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${bodyRows}
          ${totalRow}
        </tbody>
      </table>
      <div class="printInfo">Dicetak pada: ${new Date().toLocaleString("id-ID")} | System: Sun Fireworks Management</div>
    </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
    // Fallback bila onload tidak terpicu
    setTimeout(() => {
      if (printWindow && !printWindow.closed) {
        printWindow.focus();
        printWindow.print();
      }
    }, 800);
  } else {
    alert("Pop-up diblokir! Silakan izinkan pop-up untuk website ini.");
  }
};
