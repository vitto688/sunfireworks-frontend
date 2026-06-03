import * as XLSXStyle from "xlsx-js-style";

/*
 * Helper styling bersama untuk SEMUA export Excel laporan.
 * Tujuan: tampilan tabel seragam & rapi (judul, header berwarna, border, baris TOTAL).
 *
 * Pemakaian: bangun `wsData` (array-of-arrays) dengan struktur umum laporan:
 *   [JUDUL]                         <- baris 0  (di-merge & center, bold besar)
 *   [SUN FIREWORKS]                 <- baris 1  (di-merge & center)
 *   [""]                            <- baris info/kosong
 *   ["Filter:", "..."]              <- baris info
 *   ["Total Data:", "..."]          <- baris info
 *   ["Tanggal Export:", "..."]      <- baris info
 *   [""]
 *   ["NO", "KODE", ...]             <- baris HEADER (dideteksi dari sel pertama === "NO")
 *   [1, "...", ...]                 <- data
 *   ["", ..., "TOTAL", x, y]        <- baris total (dideteksi dari sel berisi "TOTAL")
 *
 * Lalu panggil: writeStyledReport(wsData, { colWidths, sheetName, filename })
 */

const THIN_BORDER = {
  top: { style: "thin", color: { rgb: "B7BCC4" } },
  bottom: { style: "thin", color: { rgb: "B7BCC4" } },
  left: { style: "thin", color: { rgb: "B7BCC4" } },
  right: { style: "thin", color: { rgb: "B7BCC4" } },
};

const TITLE_STYLE = {
  font: { name: "Arial", sz: 14, bold: true, color: { rgb: "1F2937" } },
  alignment: { horizontal: "center", vertical: "center" },
};

const COMPANY_STYLE = {
  font: { name: "Arial", sz: 11, bold: true, color: { rgb: "6B7280" } },
  alignment: { horizontal: "center", vertical: "center" },
};

const INFO_STYLE = {
  font: { name: "Arial", sz: 10, color: { rgb: "374151" } },
  alignment: { horizontal: "left", vertical: "center" },
};

const HEADER_STYLE = {
  font: { name: "Arial", sz: 10, bold: true, color: { rgb: "FFFFFF" } },
  alignment: { horizontal: "center", vertical: "center", wrapText: true },
  fill: { fgColor: { rgb: "2563EB" } },
  border: THIN_BORDER,
};

const TOTAL_STYLE = {
  font: { name: "Arial", sz: 10, bold: true, color: { rgb: "1F2937" } },
  alignment: { horizontal: "center", vertical: "center" },
  fill: { fgColor: { rgb: "EEF2F7" } },
  border: THIN_BORDER,
};

const dataStyle = (align, striped) => ({
  font: { name: "Arial", sz: 9, color: { rgb: "1F2937" } },
  alignment: { horizontal: align, vertical: "center" },
  fill: striped ? { fgColor: { rgb: "F8FAFC" } } : undefined,
  border: THIN_BORDER,
});

const isTotalRow = (row) =>
  Array.isArray(row) && row.some((cell) => String(cell).toUpperCase() === "TOTAL");

/**
 * Buat worksheet berstyling dari wsData lalu unduh sebagai .xlsx.
 * @param {Array<Array>} wsData
 * @param {Object} opts
 * @param {Array<{wch:number}>} [opts.colWidths]
 * @param {string} [opts.sheetName]
 * @param {string} opts.filename
 * @returns {string} filename
 */
export const writeStyledReport = (wsData, opts = {}) => {
  const { colWidths = [], sheetName = "Laporan", filename } = opts;
  const xlsx = XLSXStyle;

  const ws = xlsx.utils.aoa_to_sheet(wsData);

  const numCols = Math.max(
    colWidths.length,
    ...wsData.map((r) => (Array.isArray(r) ? r.length : 0))
  );

  if (colWidths.length) ws["!cols"] = colWidths;

  // Deteksi baris header (sel pertama === "NO")
  const headerRowIndex = wsData.findIndex(
    (r) => Array.isArray(r) && String(r[0]).toUpperCase() === "NO"
  );

  // Merge judul (baris 0) & nama perusahaan (baris 1) melintang semua kolom
  const merges = [];
  if (numCols > 1) {
    merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: numCols - 1 } });
    if (wsData.length > 1) {
      merges.push({ s: { r: 1, c: 0 }, e: { r: 1, c: numCols - 1 } });
    }
  }
  ws["!merges"] = merges;

  // Tinggi baris untuk header & judul
  const rows = [];
  rows[0] = { hpt: 22 };
  if (headerRowIndex >= 0) rows[headerRowIndex] = { hpt: 22 };
  ws["!rows"] = rows;

  const maxRows = wsData.length;
  let dataIdx = 0;
  for (let r = 0; r < maxRows; r++) {
    const totalRow = r > headerRowIndex && headerRowIndex >= 0 && isTotalRow(wsData[r]);
    const striped =
      headerRowIndex >= 0 && r > headerRowIndex && !totalRow && dataIdx % 2 === 1;
    if (headerRowIndex >= 0 && r > headerRowIndex && !totalRow) dataIdx++;

    for (let c = 0; c < numCols; c++) {
      const addr = xlsx.utils.encode_cell({ r, c });
      const value = wsData[r] && wsData[r][c] != null ? wsData[r][c] : "";
      if (!ws[addr]) {
        ws[addr] = { v: value, t: typeof value === "number" ? "n" : "s" };
      }

      let style;
      if (r === 0) style = TITLE_STYLE;
      else if (r === 1) style = COMPANY_STYLE;
      else if (headerRowIndex >= 0 && r < headerRowIndex) style = INFO_STYLE;
      else if (r === headerRowIndex) style = HEADER_STYLE;
      else if (totalRow) style = TOTAL_STYLE;
      else {
        const align =
          c === 0 ? "center" : typeof value === "number" ? "right" : "left";
        style = dataStyle(align, striped);
      }
      ws[addr].s = style;
    }
  }

  ws["!ref"] = xlsx.utils.encode_range({
    s: { r: 0, c: 0 },
    e: { r: maxRows - 1, c: numCols - 1 },
  });

  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, sheetName);
  xlsx.writeFile(wb, filename, { cellStyles: true, bookType: "xlsx" });

  return filename;
};
