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

/**
 * Pick the target printer. Prefers a printer whose name looks like an Epson
 * LX-310, otherwise falls back to the OS default printer.
 */
const resolvePrinter = async (preferredName) => {
  if (preferredName) return preferredName;
  try {
    const matches = await qz.printers.find(["LX-310", "LX310", "Epson LX"]);
    if (Array.isArray(matches) && matches.length) return matches[0];
    if (typeof matches === "string" && matches) return matches;
  } catch {
    // find() throws when no match -> fall through to default
  }
  return qz.printers.getDefault();
};

/**
 * Send a raw ESC/P string to the printer via QZ Tray.
 * @param {string} escpData the full ESC/P document (text + control bytes)
 * @param {{ printer?: string }} [opts]
 */
export const printRaw = async (escpData, opts = {}) => {
  await connect();
  const printerName = await resolvePrinter(opts.printer);
  if (!printerName) throw new Error("Tidak ada printer yang ditemukan di QZ Tray.");

  const config = qz.configs.create(printerName, { encoding: "CP1252" });
  await qz.print(config, [
    { type: "raw", format: "plain", data: escpData },
  ]);
};

const qzClient = { isAvailable, printRaw };
export default qzClient;
