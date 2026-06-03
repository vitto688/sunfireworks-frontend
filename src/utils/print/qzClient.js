// Thin wrapper around QZ Tray for raw (ESC/P) printing from the browser.
//
// QZ Tray is a small local app that runs a WebSocket server on localhost. The browser
// cannot talk to a printer's port directly (security sandbox), so QZ Tray acts as the
// bridge: we hand it raw ESC/P bytes and it writes them straight to the printer.
//
// If QZ Tray is NOT installed/running, isAvailable() resolves false quickly and the
// caller falls back to the existing browser print path. Nothing breaks.

import qz from "qz-tray";

let securityConfigured = false;
let connectPromise = null;

// QZ Tray runs in "unsigned" mode here (no certificate). The user approves the
// connection once via QZ Tray's own dialog ("Remember this decision"). For a fully
// silent setup later, a signed certificate can be wired into these two promises.
const configureSecurity = () => {
  if (securityConfigured) return;
  qz.security.setCertificatePromise((resolve) => resolve(undefined));
  qz.security.setSignatureAlgorithm("SHA512");
  qz.security.setSignaturePromise(() => (resolve) => resolve(undefined));
  securityConfigured = true;
};

/**
 * Connect to QZ Tray, reusing an existing connection if present.
 * Rejects if QZ Tray is not reachable.
 */
const connect = () => {
  configureSecurity();
  if (qz.websocket.isActive()) return Promise.resolve();
  if (!connectPromise) {
    connectPromise = qz.websocket
      .connect({ retries: 0, delay: 0 })
      .catch((err) => {
        connectPromise = null; // allow a later retry
        throw err;
      });
  }
  return connectPromise;
};

/**
 * Returns true if QZ Tray is installed and reachable, false otherwise.
 * Uses a short timeout so the UI never hangs waiting on a missing helper.
 */
export const isAvailable = (timeoutMs = 1500) => {
  if (qz.websocket.isActive()) return Promise.resolve(true);
  const timeout = new Promise((resolve) => setTimeout(() => resolve(false), timeoutMs));
  const attempt = connect()
    .then(() => true)
    .catch(() => false);
  return Promise.race([attempt, timeout]);
};

// Force a specific OS printer queue by name. Leave null to auto-detect
// (match "LX-310"/"Epson LX", else OS default). On the test Mac the USB queue
// was named "EPSON LX-310" — set that here when re-enabling ESC/P on that machine.
export const PRINTER_NAME = null;

/**
 * Pick the target printer. Logs every printer QZ can see (so we can identify
 * the USB LX-310 queue), then picks PRINTER_NAME / an LX-310 match / the default.
 */
const resolvePrinter = async (preferredName) => {
  try {
    const all = await qz.printers.find();
    console.info("[QZ] Printer tersedia:", all);
  } catch (e) {
    console.info("[QZ] Gagal ambil daftar printer:", e);
  }

  let chosen = preferredName || PRINTER_NAME || null;
  if (!chosen) {
    try {
      const matches = await qz.printers.find(["LX-310", "LX310", "Epson LX"]);
      if (Array.isArray(matches) && matches.length) chosen = matches[0];
      else if (typeof matches === "string" && matches) chosen = matches;
    } catch {
      // find() throws when no match -> fall through to default
    }
  }
  if (!chosen) chosen = await qz.printers.getDefault();
  console.info("[QZ] Printer dipilih:", chosen);
  return chosen;
};

// Direct network printing for the dot-matrix (JetDirect / raw socket, port 9100).
// Sending ESC/P straight to the printer's socket BYPASSES the OS print driver,
// which often silently drops/mangles raw text on a network dot-matrix. Set `host`
// to the printer IP (the 192.168.x.x shown in QZ Tray's "print to ..." dialog).
// Set host to null to instead print via an OS-installed printer by name.
export const RAW_PRINTER = { host: null, port: 9100 };

/**
 * Send a raw ESC/P string to the printer via QZ Tray.
 * Prefers a direct network socket (opts.host / RAW_PRINTER.host); otherwise
 * falls back to an OS-installed printer by name.
 * @param {string} escpData the full ESC/P document (text + control bytes)
 * @param {{ printer?: string, host?: string, port?: number }} [opts]
 */
export const printRaw = async (escpData, opts = {}) => {
  await connect();

  const host = opts.host || RAW_PRINTER.host;
  let config;
  if (host) {
    // Raw TCP socket straight to the printer — no OS driver in the path.
    config = qz.configs.create(
      { host, port: opts.port || RAW_PRINTER.port },
      { encoding: "CP1252" }
    );
  } else {
    const printerName = await resolvePrinter(opts.printer);
    if (!printerName) throw new Error("Tidak ada printer yang ditemukan di QZ Tray.");
    config = qz.configs.create(printerName, { encoding: "CP1252" });
  }

  // Guard against a hung socket (e.g. raw port 9100 filtered/closed) so the
  // caller can surface an error and fall back instead of hanging forever.
  const printJob = qz.print(config, [
    { type: "raw", format: "plain", data: escpData },
  ]);
  const timeout = new Promise((_, reject) =>
    setTimeout(
      () =>
        reject(
          new Error(
            "Timeout: printer tidak merespons (cek IP/port — raw 9100 mungkin tertutup)."
          )
        ),
      8000
    )
  );
  await Promise.race([printJob, timeout]);
};

const qzClient = { isAvailable, printRaw };
export default qzClient;
