// Builds the Surat Jalan document as native ESC/P text for the Epson LX-310.
// Mirrors the columns/content of the HTML version in ../printSuratJalanUtils.js,
// but laid out in fixed character columns so the printer renders crisp ROM-font text.

import { formatNumberWithDot } from "../numberUtils";
import {
  INIT,
  LQ_ON,
  TYPEFACE_ROMAN,
  PICA,
  BOLD_ON,
  BOLD_OFF,
  DOUBLE_STRIKE_ON,
  DOUBLE_STRIKE_OFF,
  DOUBLE_WIDTH_ON,
  DOUBLE_WIDTH_OFF,
  leftMargin,
  LINE_SPACING_1_6,
  formLengthLines,
  pad,
  rule,
  row,
  LF,
  FF,
} from "./escpBuilder";

// Half-form (form pendek) 9.5" x 5.5" continuous paper.
// 5.5 inch x 6 LPI = 33 lines per page. FF jumps to the next 5.5" form top,
// keeping content aligned with the paper perforation.
const HALF_PAGE_LINES = 33;

// Column layout at 10 cpi. Sum (incl. single-space separators) defines the table width.
const COLS = [
  { key: "kode", head: "KODE PRODUK", width: 12, align: "left" },
  { key: "barcode", head: "BARCODE", width: 7, align: "left" },
  { key: "nama", head: "NAMA PRODUK", width: 24, align: "left" },
  { key: "packing", head: "PACKING", width: 7, align: "left" },
  { key: "carton", head: "CARTON", width: 8, align: "right" },
  { key: "pack", head: "PACK", width: 8, align: "right" },
];

const TABLE_WIDTH =
  COLS.reduce((sum, c) => sum + c.width, 0) + (COLS.length - 1); // +separators

const LEFT_MARGIN_COLS = 4; // small indent so text isn't flush against the edge

const fmtDate = (data) => {
  const raw = data.created_at || data.transaction_date;
  if (!raw) return "-";
  const d = new Date(raw);
  return isNaN(d.getTime()) ? "-" : d.toLocaleDateString("id-ID");
};

// One line of the two-column document info block.
const infoLine = (lLabel, lValue, rLabel, rValue) => {
  const leftBlock = pad(lLabel, 13) + ": " + (lValue ?? "-");
  const rightBlock = rLabel ? pad(rLabel, 13) + ": " + (rValue ?? "-") : "";
  return pad(leftBlock, 37) + rightBlock;
};

const tableHeader = () =>
  row(COLS.map((c) => ({ text: c.head, width: c.width, align: c.align })));

const dataRow = (item) =>
  row([
    { text: item.product_code || "-", width: COLS[0].width },
    { text: "-", width: COLS[1].width },
    { text: item.product_name || "-", width: COLS[2].width },
    { text: item.packing || "-", width: COLS[3].width },
    { text: formatNumberWithDot(item.carton_quantity || 0), width: COLS[4].width, align: "right" },
    { text: formatNumberWithDot(item.pack_quantity || 0), width: COLS[5].width, align: "right" },
  ]);

const totalRow = (cartonTotal, packTotal) =>
  row([
    { text: "TOTAL", width: COLS[0].width + 1 + COLS[1].width + 1 + COLS[2].width + 1 + COLS[3].width, align: "right" },
    { text: formatNumberWithDot(cartonTotal), width: COLS[4].width, align: "right" },
    { text: formatNumberWithDot(packTotal), width: COLS[5].width, align: "right" },
  ]);

const buildPage = (data, pageItems) => {
  let out = "";

  // Top margin: keep the title off the perforation / faint top-of-form area.
  out += LF + LF;

  // Title — double-width + bold + double-strike so it prints big and dark.
  // Double-width chars take 2 columns each, so center accordingly.
  const titleText = "SURAT JALAN";
  const titlePad = Math.max(0, Math.floor((TABLE_WIDTH - titleText.length * 2) / 2));
  out +=
    " ".repeat(titlePad) +
    DOUBLE_WIDTH_ON + BOLD_ON + DOUBLE_STRIKE_ON +
    titleText +
    DOUBLE_STRIKE_OFF + BOLD_OFF + DOUBLE_WIDTH_OFF +
    LF;
  out += rule(TABLE_WIDTH) + LF + LF;

  // Document info (two columns)
  out += infoLine("Tanggal", fmtDate(data), "No. Kendaraan", data.vehicle_number || "-") + LF;
  out += infoLine("No. SJ", data.document_number || data.sj_number || data.id, "Kepada YTH", data.customer_name || "-") + LF;
  out += infoLine("No. SPK", data.spk_document_number || data.spk?.document_number || "-", "UP.", data.customer_upline || "-") + LF;
  out += infoLine("Kendaraan", data.vehicle_type || "-", "Alamat", data.customer_address || "-") + LF + LF;

  // Table
  out += rule(TABLE_WIDTH) + LF;
  out += BOLD_ON + tableHeader() + BOLD_OFF + LF;
  out += rule(TABLE_WIDTH) + LF;

  let cartonTotal = 0;
  let packTotal = 0;
  pageItems.forEach((item) => {
    cartonTotal += item.carton_quantity || 0;
    packTotal += item.pack_quantity || 0;
    out += dataRow(item) + LF;
  });

  out += rule(TABLE_WIDTH) + LF;
  out += BOLD_ON + totalRow(cartonTotal, packTotal) + BOLD_OFF + LF;
  out += rule(TABLE_WIDTH) + LF + LF;

  // Footer / signature (kept compact so a page fits within the 5.5" half-form)
  out += pad("Hormat kami,", TABLE_WIDTH, "right") + LF + LF + LF;
  out += pad("(__________________)", TABLE_WIDTH, "right") + LF;

  return out;
};

/**
 * Build the full ESC/P document string for a Surat Jalan.
 * @param {object} data the same data object passed to printSuratJalan()
 * @param {number} itemsPerPage rows per page (matches the HTML paginator)
 * @returns {string} ESC/P bytes ready for qzClient.printRaw()
 */
export const buildSuratJalanEscp = (data, itemsPerPage = 5) => {
  const items = data.items || [];
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  // Set 6 LPI then a 5.5" form length so each page = one physical half-form.
  let doc =
    INIT +
    LQ_ON +
    TYPEFACE_ROMAN +
    PICA +
    LINE_SPACING_1_6 +
    formLengthLines(HALF_PAGE_LINES) +
    leftMargin(LEFT_MARGIN_COLS);

  for (let page = 0; page < totalPages; page++) {
    const pageItems = items.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
    doc += buildPage(data, pageItems);
    if (page < totalPages - 1) doc += FF; // next page top-of-form
  }

  doc += FF; // eject final page
  return doc;
};

export default buildSuratJalanEscp;
