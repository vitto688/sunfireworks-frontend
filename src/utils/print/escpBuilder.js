// ESC/P command builder for Epson LX-310 (and compatible 9-pin dot matrix printers).
//
// Why this exists: printing from the browser rasterizes the page into a bitmap and
// sends it to the printer as graphics, which a dot matrix downsamples/dithers into a
// fuzzy result. Sending native ESC/P text instead lets the printer render characters
// with its built-in ROM font -> crisp, solid output that matches the desktop app.
//
// These helpers return plain strings made of printable text + ESC/P control bytes.
// Concatenate them and hand the final string to qzClient.printRaw().

// --- Raw control bytes -------------------------------------------------------
export const ESC = "\x1B";
export const CR = "\x0D";
export const LF = "\x0A";
export const CRLF = "\x0D\x0A";
export const FF = "\x0C"; // form feed -> advance to top of next page

// --- Mode / typeface commands ------------------------------------------------
export const INIT = ESC + "@"; // reset printer to power-on defaults
export const LQ_ON = ESC + "x\x01"; // Letter Quality (denser dots, sharper)
export const DRAFT_ON = ESC + "x\x00"; // Draft (faster, lighter)
export const BOLD_ON = ESC + "E";
export const BOLD_OFF = ESC + "F";
export const DOUBLE_STRIKE_ON = ESC + "G"; // hit each dot twice -> darker
export const DOUBLE_STRIKE_OFF = ESC + "H";
export const DOUBLE_WIDTH_ON = ESC + "W\x01";
export const DOUBLE_WIDTH_OFF = ESC + "W\x00";

// Character pitch
export const PICA = ESC + "P"; // 10 cpi -> 80 cols on an 8" line
export const ELITE = ESC + "M"; // 12 cpi -> 96 cols
export const CONDENSED_ON = "\x0F"; // ~17 cpi -> 136 cols
export const CONDENSED_OFF = "\x12";

// Select Roman typeface (cleaner than the default Sans Serif on the LX-310)
export const TYPEFACE_ROMAN = ESC + "k\x00";

/**
 * Set the left margin in character columns (ESC l n).
 * Mirrors the ~1.8cm physical left margin used by the HTML layout.
 */
export const leftMargin = (cols) => ESC + "l" + String.fromCharCode(cols);

// Line spacing 1/6 inch = 6 LPI (the dot-matrix default). Set this BEFORE
// formLengthLines() so the lines->inches math holds.
export const LINE_SPACING_1_6 = ESC + "2";

/**
 * Set the form (page) length in lines: ESC C n  (n = 1..127).
 * At 6 LPI, lines = inches * 6. So a 5.5" half-form = 33 lines, 11" full = 66.
 * This aligns the printer's form feed (FF) with the physical paper perforation.
 */
export const formLengthLines = (lines) => ESC + "C" + String.fromCharCode(lines);

// --- Text layout helpers -----------------------------------------------------

/** Coerce to string and strip control chars that would corrupt the stream. */
const clean = (v) =>
  // eslint-disable-next-line no-control-regex
  (v === null || v === undefined ? "" : String(v)).replace(/[\x00-\x1F]/g, " ");

/** Truncate to width, padding/aligning within a fixed column. */
export const pad = (value, width, align = "left") => {
  let s = clean(value);
  if (s.length > width) return s.slice(0, width);
  const space = width - s.length;
  if (align === "right") return " ".repeat(space) + s;
  if (align === "center") {
    const left = Math.floor(space / 2);
    return " ".repeat(left) + s + " ".repeat(space - left);
  }
  return s + " ".repeat(space);
};

/** Center a string within a given line width. */
export const center = (value, lineWidth) => pad(value, lineWidth, "center");

/** A horizontal rule of `char` repeated to `width`. */
export const rule = (width, char = "-") => char.repeat(width);

/**
 * Render one table row from a column spec.
 * @param {Array<{text:any,width:number,align?:string}>} cols
 * @param {string} sep separator placed between columns (default single space)
 */
export const row = (cols, sep = " ") =>
  cols.map((c) => pad(c.text, c.width, c.align || "left")).join(sep);

/** Repeat blank lines (line feeds). */
export const blankLines = (n) => LF.repeat(n);
