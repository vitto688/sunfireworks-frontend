import { formatNumberWithDot, formatDate } from "./numberUtils";
import { writeStyledReport } from "./excelReportStyle";

// Function to generate Excel file from SPK data
export const exportSPKToExcel = (data, filters = {}) => {
  // Calculate totals
  const totalCarton =
    data.items?.reduce((sum, item) => sum + (item.carton_quantity || 0), 0) ||
    0;
  const totalPack =
    data.items?.reduce((sum, item) => sum + (item.pack_quantity || 0), 0) || 0;

  // Create filter info string
  const createFilterInfo = () => {
    let filterText = [];
    if (filters.start_date && filters.end_date) {
      filterText.push(
        `Periode: ${formatDate(filters.start_date)} - ${formatDate(
          filters.end_date
        )}`
      );
    }
    if (filters.customer && filters.customer !== 0) {
      filterText.push(`Customer: ${filters.customer}`);
    }
    if (filters.warehouse && filters.warehouse !== 0) {
      filterText.push(`Gudang: ${filters.warehouse}`);
    }
    if (filters.search) {
      filterText.push(`Pencarian: ${filters.search}`);
    }
    return filterText.length > 0 ? filterText.join(" | ") : "Semua Data";
  };

  // Create CSV content (Excel-compatible)
  const csvContent = [];

  // Header information
  csvContent.push(["SURAT PERINTAH KERJA (SPK)"]);
  csvContent.push(["SUN FIREWORKS"]);
  csvContent.push([""]);
  csvContent.push([
    "No. SPK:",
    data.document_number || data.spk_number || data.id,
  ]);
  csvContent.push(["Tanggal:", formatDate(data.created_at)]);
  csvContent.push(["Customer:", data.customer_name || "-"]);
  csvContent.push(["UP:", data.customer_upline || "-"]);
  csvContent.push(["Alamat:", data.customer_address || "-"]);
  csvContent.push([""]);
  csvContent.push(["Filter:", createFilterInfo()]);
  csvContent.push(["Total Item:", `${data.items?.length || 0} item`]);
  csvContent.push(["Tanggal Export:", formatDate(new Date())]);
  csvContent.push([""]);

  // Table headers
  csvContent.push([
    "NO",
    "KODE PRODUK",
    "BARCODE",
    "NAMA PRODUK",
    "KP",
    "PACKING",
    "CARTON",
    "PACK",
  ]);

  // Table data
  if (data.items?.length > 0) {
    data.items.forEach((item, index) => {
      csvContent.push([
        index + 1,
        item.product_code || "-",
        "-",
        item.product_name || "-",
        item.supplier_name || "-",
        item.packing || "-",
        item.carton_quantity || 0,
        item.pack_quantity || 0,
      ]);
    });

    // Total row
    csvContent.push(["", "", "", "", "", "TOTAL", totalCarton, totalPack]);
  } else {
    csvContent.push([
      "",
      "",
      "",
      "Tidak ada item SPK yang ditemukan",
      "",
      "",
      "",
      "",
    ]);
  }

  // Notes section
  csvContent.push([""]);
  csvContent.push(["CATATAN:"]);
  csvContent.push([data.notes || "-"]);

  // Convert to CSV string
  const csvString = csvContent
    .map((row) =>
      row
        .map((cell) => {
          const cellString = String(cell || "");
          if (
            cellString.includes(",") ||
            cellString.includes('"') ||
            cellString.includes("\n")
          ) {
            return `"${cellString.replace(/"/g, '""')}"`;
          }
          return cellString;
        })
        .join(",")
    )
    .join("\n");

  // Add BOM for proper UTF-8 encoding in Excel
  const BOM = "\uFEFF";
  const finalCsvContent = BOM + csvString;

  // Create and download file
  const blob = new Blob([finalCsvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);

  // Generate filename with current date
  const currentDate = new Date().toISOString().split("T")[0];
  const spkNumber = data.document_number || data.spk_number || data.id;
  const filename = `SPK_${spkNumber}_${currentDate}.csv`;
  link.setAttribute("download", filename);

  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up
  URL.revokeObjectURL(url);

  return filename;
};

// Enhanced Excel export using XLSX library
export const exportSPKToExcelAdvanced = (data, filters = {}, XLSX = null) => {
  try {
    // Check if XLSX library is available
    if (!XLSX && typeof window.XLSX === "undefined") {
      console.warn("XLSX library not found. Falling back to CSV export.");
      return exportSPKToExcel(data, filters);
    }

    // Use provided XLSX or fallback to window.XLSX
    const xlsxLib = XLSX || window.XLSX;

    // Calculate totals
    const totalCarton =
      data.items?.reduce((sum, item) => sum + (item.carton_quantity || 0), 0) ||
      0;
    const totalPack =
      data.items?.reduce((sum, item) => sum + (item.pack_quantity || 0), 0) ||
      0;

    // Create filter info string
    const createFilterInfo = () => {
      let filterText = [];
      if (filters.start_date && filters.end_date) {
        filterText.push(
          `Periode: ${formatDate(filters.start_date)} - ${formatDate(
            filters.end_date
          )}`
        );
      }
      if (filters.customer && filters.customer !== 0) {
        filterText.push(`Customer: ${filters.customer}`);
      }
      if (filters.warehouse && filters.warehouse !== 0) {
        filterText.push(`Gudang: ${filters.warehouse}`);
      }
      if (filters.search) {
        filterText.push(`Pencarian: ${filters.search}`);
      }
      return filterText.length > 0 ? filterText.join(" | ") : "Semua Data";
    };

    // Create workbook and worksheet
    const wb = xlsxLib.utils.book_new();
    const wsData = [];

    // Header information
    wsData.push(["SURAT PERINTAH KERJA (SPK)"]);
    wsData.push(["SUN FIREWORKS"]);
    wsData.push([""]);
    wsData.push([
      "No. SPK:",
      data.document_number || data.spk_number || data.id,
    ]);
    wsData.push(["Tanggal:", formatDate(data.created_at)]);
    wsData.push(["Customer:", data.customer_name || "-"]);
    wsData.push(["UP:", data.customer_upline || "-"]);
    wsData.push(["Alamat:", data.customer_address || "-"]);
    wsData.push([""]);
    wsData.push(["Filter:", createFilterInfo()]);
    wsData.push(["Total Item:", `${data.items?.length || 0} item`]);
    wsData.push(["Tanggal Export:", formatDate(new Date())]);
    wsData.push([""]);

    // Table headers
    wsData.push([
      "NO",
      "KODE PRODUK",
      "BARCODE",
      "NAMA PRODUK",
      "KP",
      "PACKING",
      "CARTON",
      "PACK",
    ]);

    // Table data
    if (data.items?.length > 0) {
      data.items.forEach((item, index) => {
        wsData.push([
          index + 1,
          item.product_code || "-",
          "-",
          item.product_name || "-",
          item.supplier_name || "-",
          item.packing || "-",
          item.carton_quantity || 0,
          item.pack_quantity || 0,
        ]);
      });

      // Total row
      wsData.push(["", "", "", "", "", "TOTAL", totalCarton, totalPack]);
    } else {
      wsData.push([
        "",
        "",
        "",
        "Tidak ada item SPK yang ditemukan",
        "",
        "",
        "",
        "",
      ]);
    }

    // Notes section
    wsData.push([""]);
    wsData.push(["CATATAN:"]);
    wsData.push([data.notes || "-"]);

    // Create worksheet
    const ws = xlsxLib.utils.aoa_to_sheet(wsData);

    // Set column widths
    const colWidths = [
      { wch: 5 }, // NO
      { wch: 15 }, // KODE PRODUK
      { wch: 12 }, // BARCODE
      { wch: 30 }, // NAMA PRODUK
      { wch: 8 }, // KP
      { wch: 12 }, // PACKING
      { wch: 8 }, // CARTON
      { wch: 8 }, // PACK
    ];
    ws["!cols"] = colWidths;

    // Add worksheet to workbook
    xlsxLib.utils.book_append_sheet(wb, ws, "SPK");

    // Generate filename with current date
    const currentDate = new Date().toISOString().split("T")[0];
    const spkNumber = data.document_number || data.spk_number || data.id;
    const filename = `SPK_${spkNumber}_${currentDate}.xlsx`;

    // Tulis & unduh file dengan styling tabel seragam
    return writeStyledReport(wsData, {
      colWidths,
      sheetName: "SPK",
      filename,
    });
  } catch (error) {
    console.error("Error creating Excel file:", error);
    // Fallback to CSV export
    return exportSPKToExcel(data, filters);
  }
};

export const printSPK = (data, itemsPerPage = 6) => {
  // Calculate pagination
  const items = data.items || [];
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Generate pages HTML
  const generatePagesHTML = () => {
    let pagesHTML = "";

    for (let page = 0; page < totalPages; page++) {
      const startIndex = page * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, items.length);
      const pageItems = items.slice(startIndex, endIndex);

      // Generate rows for current page
      const rowsHTML = pageItems
        .map((item) => {
          return `
          <tr>
            <td class="col-kode">${item.product_code || "-"}</td>
            <td class="col-barcode">-</td>
            <td class="col-nama">${item.product_name || "-"}</td>
            <td class="col-kp">${item.supplier_name || "-"}</td>
            <td class="col-packing">${item.packing || "-"}</td>
            <td class="col-carton">${formatNumberWithDot(
              item.carton_quantity || 0
            )}</td>
            <td class="col-pack">${formatNumberWithDot(
              item.pack_quantity || 0
            )}</td>
          </tr>
        `;
        })
        .join("");

      // Calculate total for current page only
      const pageCartonTotal = pageItems.reduce(
        (sum, item) => sum + (item.carton_quantity || 0),
        0
      );
      const pagePackTotal = pageItems.reduce(
        (sum, item) => sum + (item.pack_quantity || 0),
        0
      );

      // Add page break only every 2 pages (for A4 paper with 2 sections)
      // page-break after every 2nd section (when page is odd-numbered: 1, 3, 5, etc.)
      // DISABLED: Remove page break to allow continuous printing
      const pageBreakClass = ""; // No page break class
      const isFirstPage = page === 0;
      // Check if this is the first section on a new paper (after page break)
      const isFirstOnNewPaper = false; // Disabled since no page breaks
      // Determine section height: first page = 5.5in, all other pages = 5.5in
      const sectionHeightClass = isFirstPage ? "first-page" : "other-page";
      // Add extra padding for odd pages (3, 5, 7...) that are not the first page
      const isOddPage = (page + 1) % 2 === 1;
      const oddPageNotFirstClass =
        isOddPage && !isFirstPage ? "odd-page-not-first" : "";

      pagesHTML += `
        <div class="page-container ${pageBreakClass} ${
        !isFirstPage ? "next-page" : ""
      } ${
        isFirstOnNewPaper ? "first-on-paper" : ""
      } ${sectionHeightClass} ${oddPageNotFirstClass}">
          <div class="header">
            <h1>SURAT PERINTAH KERJA (SPK)</h1>
          </div>

          <div class="documentInfo">
            <div class="leftInfo">
              <div class="infoRow">
                <span class="label">Tanggal </span>
                <span class="value">: ${new Date(
                  data.created_at
                ).toLocaleDateString("id-ID")}</span>
              </div>
              <div class="infoRow">
                <span class="label">No SPK </span>
                <span class="value">: ${
                  data.document_number || data.spk_number || data.id
                }</span>
              </div>
            </div>
            <div class="rightInfo">
              <div class="infoRow">
                <span class="label">Kepada </span>
                <span class="value">: ${data.customer_name || "-"}</span>
              </div>
              <div class="infoRow">
                <span class="label">UP. </span>
                <span class="value">: ${data.customer_upline || "-"}</span>
              </div>
              <div class="infoRow">
                <span class="label">Alamat </span>
                <span class="value">: ${data.customer_address || "-"}</span>
              </div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th rowspan="2" class="col-kode-head">KODE PRODUK</th>
                <th rowspan="2" class="col-barcode-head">BARCODE</th>
                <th rowspan="2" class="col-nama-head">NAMA PRODUK</th>
                <th rowspan="2" class="col-kp-head">KP</th>
                <th rowspan="2" class="col-packing-head">PACKING</th>
                <th colspan="2">JUMLAH</th>
              </tr>
              <tr class="subheader">
                <th class="col-carton-head">CARTON</th>
                <th class="col-pack-head">PACK</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHTML}
              <tr class="total-row">
                <td colspan="5" class="total-label">TOTAL</td>
                <td class="col-carton">${formatNumberWithDot(
                  pageCartonTotal
                )}</td>
                <td class="col-pack">${formatNumberWithDot(pagePackTotal)}</td>
              </tr>
            </tbody>
          </table>

          <div class="footer">
            <div class="notesSection">
              <div class="notesLabel">
                <p>CATATAN :</p>
              </div>
              <div class="notesContent">
                ${data.notes || "-"}
              </div>
            </div>
            
            <div class="signatureSection">
              <div class="signatureLeft">
                <p>Yang membuat,</p>
              </div>
              <div class="signatureRight">
                <p>${data.user_username || "-"}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return pagesHTML;
  };

  // Create complete HTML document
  const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>SPK - ${
          data.document_number || data.spk_number || data.id
        }</title>
        <style>
          @page {
            margin: 0; /* Custom margin - set to zero for manual control */
            padding: 0;
            size: letter; /* Letter size for documents (8.5" x 11") */
            /* Print settings */
            marks: none;
            orphans: 1;
            widows: 1;
            @top-left { content: ""; }
            @top-center { content: ""; }
            @top-right { content: ""; }
            @bottom-left { content: ""; }
            @bottom-center { content: ""; }
            @bottom-right { content: ""; }
          }
          
          /* Epson LX-310 optimized settings */
          @media print {
            @page {
              size: letter !important; /* Letter size (8.5" x 11") */
              margin: 0 !important; /* Custom margin control */
              padding: 0 !important;
            }
            
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .page-break {
              page-break-after: always;
              break-after: always;
            }
            
            .page-container {
              box-sizing: border-box !important;
            }
            
            .page-container.first-page {
              height: 5.5in !important; /* First page is 5.5 inches */
            }
            
            .page-container.other-page {
              height: 5.5in !important; /* All other pages are 5.5 inches */
            }
            
            .page-container.odd-page-not-first {
              padding-top: 40px !important; /* Add extra padding for odd pages (not first page) */
            }
            
            .page-container.next-page {
              margin-top: 0 !important; /* No gap between sections */
            }
            
            .page-container.first-on-paper {
              margin-top: 0 !important; /* Reset margin for first section on new paper */
              padding-top: 0 !important; /* Add top padding instead for spacing from paper edge */
            }
            
            body {
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              position: relative !important;
              top: 0 !important;
              vertical-align: top !important;
              display: block !important;
            }
            
            table {
              vertical-align: top !important;
              position: relative !important;
              margin-top: 0 !important;
            }
            
            tbody tr {
              min-height: 25px !important;
              height: auto !important;
            }
            
            tbody td {
              min-height: 20px !important;
              height: auto !important;
              padding: 6px 4px !important;
              line-height: 1.4 !important;
              vertical-align: top !important;
              font-size: 12px !important; /* Increased by 1 point */
              font-weight: 100 !important; /* Reduced by another 100 points */
            }
            
            th {
              min-height: 25px !important;
              height: 25px !important;
              padding: 4px 2px !important;
              vertical-align: middle !important;
              font-size: 11px !important; /* Increased by 1 point */
              font-weight: 200 !important; /* Reduced by another 100 points */
              text-align: center !important;
            }
            
            .col-kode {
              font-size: 13px !important; /* Increased by 1 point */
              padding: 6px 2px !important;
              word-break: break-all !important;
              white-space: normal !important;
              line-height: 1.2 !important;
            }

            .col-kode-head {
              font-size: 11px !important; /* Increased by 1 point */
              padding: 6px 2px !important;
              word-break: break-all !important;
              white-space: normal !important;
              line-height: 1.2 !important;
            }
            
            .col-barcode {
              font-size: 11px !important; /* Increased by 1 point */
              padding: 6px 2px !important;
              word-break: break-all !important;
              white-space: normal !important;
              line-height: 1.2 !important;
            }

            .col-barcode-head {
              font-size: 11px !important; /* Increased by 1 point */
              padding: 6px 2px !important;
              word-break: break-all !important;
              white-space: normal !important;
              line-height: 1.2 !important;
            }
          }
          
          body {
            font-family: Arial, sans-serif;
            margin: 0; /* No margin for compact form */
            padding: 0;
            width: 100%; /* Full width */
            font-size: 11px;
            line-height: 1.2; /* Tighter line spacing for 10cpi */
            color: black;
            font-weight: 100;
            /* 10cpi character spacing */
            letter-spacing: 0.2px;
            /* Force content to start from top center */
            display: block;
            position: relative;
            top: 0;
            vertical-align: top;
            text-align: left; /* Reset text alignment for content */
          }
          
          .page-container {
            position: relative;
            width: 100%; /* Full width */
            padding: 0.3in 0.4in; /* Padding for content */
            box-sizing: border-box;
            overflow: hidden; /* Prevent content overflow */
          }
          
          .page-container.first-page {
            height: 5.5in; /* First page is 5.5 inches tall */
          }
          
          .page-container.other-page {
            height: 5.5in; /* All other pages are 5.5 inches tall */
          }
          
          .page-container.odd-page-not-first {
            padding-top: 40px !important; /* Add extra padding for odd pages (not first page) */
          }
          
          .page-container.next-page {
            margin-top: 0; /* No gap between sections */
            padding-top: 0.3in; /* Add top padding for sections after first */
          }
          
          .page-container.first-on-paper {
            margin-top: 0; /* Reset margin for first section on new paper */
            padding-top: 0.5in; /* Add top padding instead for spacing from paper edge */
          }
          
          .page-break {
            page-break-after: always;
            break-after: always;
          }
          
          .header {
            text-align: center;
            margin-bottom: 10px; /* Reduced for compact layout */
            border-bottom: 0.1px solid black; /* Solid border for header */
            padding-bottom: 4px;
            padding-top: 20px;
          }
          .header h1 {
            font-size: 13px; /* Reduced for compact layout */
            font-weight: 400; /* Reduced by another 100 points */
            margin: 0;
            letter-spacing: 1.0px; /* Character spacing */
            text-transform: uppercase;
          }
          
          .page-number {
            font-size: 9px; /* Smaller font */
            margin: 3px 0 0 0;
            font-weight: 200;
            color: #333;
          }
          .documentInfo {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px; /* Reduced spacing for compact layout */
            letter-spacing: 0.5px; /* Character spacing */
            gap: 15px; /* Reduced gap */
          }
          .leftInfo, .rightInfo {
            flex: 1;
          }
          .infoRow {
            display: flex;
            gap: 3px; /* Reduced gap */
            align-items: center;
            margin-bottom: 3px; /* Tighter spacing for compact layout */
          }
          .infoRow .label {
            font-weight: 200; /* Reduced by another 100 points */
            min-width: 70px; /* Reduced for compact */
            font-size: 9px; /* Smaller for compact layout */
          }
          .infoRow .value {
            font-weight: 100; /* Reduced by another 100 points */
            font-size: 9px; /* Smaller for compact layout */
          }
          .infoRowBigger {
            display: flex;
            gap: 12px; /* Reduced gap */
            align-items: center;
            margin-bottom: 6px; /* Tighter spacing */
          }
          .infoRowBigger .label {
            font-weight: 200; /* Reduced by another 100 points */
            min-width: 85px; /* Slightly reduced */
            font-size: 12px; /* Increased by 1 point */
          }
          .infoRowBigger .value {
            font-weight: 100; /* Reduced by another 100 points */
            font-size: 12px; /* Increased by 1 point */
          }
          table {
            width: 100%;
            border-collapse: collapse; /* Changed to collapse for cleaner borders */
            border-spacing: 0; /* No spacing between cells */
            margin: 0 auto 10px auto; /* Center table with reduced margin */
            border: 0.1px solid black; /* Solid border for table */
            font-size: 9px; /* Reduced for compact layout */
            table-layout: fixed;
            min-height: auto;
            vertical-align: top;
            position: relative;
          }
          th, td {
            border: 0.1px solid black; /* Solid border for cells */
            padding: 2px 1px; /* Reduced padding for compact layout */
            text-align: center;
            vertical-align: top; /* Keep top alignment */
            font-size: 9px; /* Smaller font for compact */
            line-height: 1.1; /* Tighter line height */
            word-break: keep-all;
            white-space: nowrap;
            height: auto; /* Allow natural height */
            min-height: 14px; /* Reduced minimum row height */
            box-sizing: border-box; /* Include padding in width calculation */
          }
          th {
            background: white !important;
            font-weight: 200; /* Reduced by another 100 points */
            font-size: 9px; /* Smaller for compact */
            height: 18px; /* Reduced height for headers */
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            line-height: 1.0; /* Tighter line height for headers */
            text-align: center; /* Center align all headers */
            vertical-align: middle; /* Center vertically in header cells */
            padding: 2px 1px; /* Reduced padding for headers */
          }
          /* Column widths optimized for SPK documents */
          .col-kode { 
            width: 120px; 
            font-size: 9px;
            padding: 2px 1px;
            word-break: break-all;
            white-space: normal;
            line-height: 1.1;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
          }
          .col-kode-head { 
            width: 120px; 
            font-size: 9px;
            padding: 2px 1px;
            word-break: break-all;
            white-space: normal;
            line-height: 1.1;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
          }
          .col-barcode { 
            width: 65px; 
            font-size: 9px;
            padding: 2px 1px;
            word-break: break-all;
            white-space: normal;
            line-height: 1.1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-barcode-head { 
            width: 65px; 
            font-size: 9px;
            padding: 2px 1px;
            word-break: break-all;
            white-space: normal;
            line-height: 1.1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-nama { 
            width: 300px; 
            font-size: 9px;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
          }
          .col-nama-head { 
            width: 300px; 
            font-size: 9px;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
          }
          .col-kp { 
            width: 60px; 
            font-size: 9px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-kp-head { 
            width: 60px; 
            font-size: 9px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-packing { 
            width: 60px; 
            font-size: 9px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-packing-head { 
            width: 60px; 
            font-size: 9px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-carton { 
            width: 10px; 
            font-weight: 200;
            font-size: 9px;
          }
          .col-carton-head { 
            width: 10px; 
            font-weight: 200;
            font-size: 9px;
          }
          .col-pack { 
            width: 10px; 
            font-weight: 200;
            font-size: 9px;
          }
          .col-pack-head { 
            width: 10px; 
            font-weight: 200;
            font-size: 9px;
          }
          
          /* Data row specific styling to prevent overlapping */
          tbody tr {
            height: auto;
            min-height: 16px; /* Reduced minimum row height for compact */
          }
          
          tbody td {
            height: auto;
            min-height: 14px; /* Reduced minimum cell height */
            vertical-align: top; /* Align content to top */
          }
          .subheader th {
            background: white !important;
            font-size: 9px; /* Smaller for compact */
            height: 16px; /* Reduced height for better spacing */
            font-weight: 200; /* Reduced by another 100 points */
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            padding: 2px 1px; /* Consistent with main headers */
            line-height: 1.0;
            text-align: center; /* Center align subheaders */
            vertical-align: middle; /* Center vertically */
          }
          .total-row {
            background: white !important;
            font-weight: 200; /* Reduced by another 100 points */
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            border-top: 0.2px solid black; /* Solid border for total row */
          }
          .total-row .total-label {
            text-align: right !important;
            font-size: 9px; /* Smaller for compact */
            font-weight: 200; /* Reduced by another 100 points */
            padding-right: 8px; /* Reduced padding */
          }
          .total-row td {
            font-weight: 200; /* Reduced by another 100 points */
            font-size: 9px; /* Smaller for compact */
          }
          .footer {
            padding: 8px;
            display: flex;
            justify-content: space-between;
            margin-top: 40px; /* Reduced by 10px (from 50px to 40px) */
          }
          .notesSection {
            margin-bottom: 20px;
          }
          .notesLabel {
            font-size: 9px; /* Smaller for compact */
            font-weight: 100; /* Reduced by another 100 points */
            margin-bottom: 5px;
          }
          .notesContent {
            font-size: 9px; /* Smaller for compact */
            line-height: 1.3;
            font-weight: 100; /* Reduced by another 100 points */
          }
          .signatureSection {
            display: flex;
            flex-direction: column;
            align-items: centers;
          }
          .signatureLeft, .signatureRight {
            text-align: center;
          }
          .signatureLeft p, .signatureRight p {
            margin: 0;
            font-size: 9px; /* Smaller for compact */
            font-weight: 100; /* Reduced by another 100 points */
          }
          .signatureRight {
            margin-top: 25px;
          }
        </style>
      </head>
      <body>
        ${generatePagesHTML()}
      </body>
      </html>
    `;

  // Create blob URL for the HTML content
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  // Create preview window first
  const previewWindow = window.open(
    "",
    "_blank",
    "width=1000,height=800,scrollbars=yes,resizable=yes"
  );

  if (previewWindow) {
    // Add preview HTML with print button
    const previewHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Preview - SPK</title>
        <style>
          body {
            margin: 0;
            padding: 10px 20px 20px 20px;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
          }
          .preview-container {
            max-width: 1000px;
            margin: 20px auto 0 auto;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            top: 0;
          }
          .preview-header {
            background: #2563eb;
            color: white;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .preview-title {
            font-size: 12px;
            font-weight: 600;
            margin: 0;
          }
          .preview-actions {
            display: flex;
            gap: 10px;
          }
          .btn {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.2s;
          }
          .btn-print {
            background: #16a34a;
            color: white;
          }
          .btn-print:hover {
            background: #15803d;
          }
          .btn-close {
            background: #dc2626;
            color: white;
          }
          .btn-close:hover {
            background: #b91c1c;
          }
          .preview-content {
            padding: 20px;
            background: white;
          }
          .document-frame {
            border: 1px solid #d1d5db;
            border-radius: 4px;
            overflow: hidden;
            background: white;
          }
          iframe {
            width: 100%;
            height: 800px;
            border: none;
            display: block;
          }
          .preview-info {
            background: #f8fafc;
            padding: 15px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 12px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="preview-container">
          <div class="preview-header">
            <h1 class="preview-title">Preview - Surat Perintah Kerja (SPK)</h1>
            <div class="preview-actions">
              <button class="btn btn-print" onclick="printDocument()">
                <span>🖨️</span> Print Document
              </button>
              <button class="btn btn-close" onclick="window.close()">
                <span>✕</span> Close
              </button>
            </div>
          </div>
          <div class="preview-info">
            <strong>Petunjuk:</strong> Ini adalah preview dokumen yang akan dicetak. Klik "Print Document" untuk melanjutkan ke proses print, atau "Close" untuk membatalkan.
          </div>
          <div class="preview-content">
            <div class="document-frame">
              <iframe src="${url}" title="Document Preview"></iframe>
            </div>
          </div>
        </div>

        <script>
          function printDocument() {
            // Open print window with the document
            const printWindow = window.open("${url}", "_blank");
            
            if (printWindow) {
              // Wait for content to load then focus and setup print
              printWindow.onload = () => {
                printWindow.focus();
                setTimeout(() => {
                  printWindow.print();
                  printWindow.close();
                }, 250);
              };

              // Fallback if onload doesn't trigger
              setTimeout(() => {
                if (printWindow && !printWindow.closed) {
                  printWindow.focus();
                  printWindow.print();
                  printWindow.close();
                }
              }, 1000);
              
              // Close preview window after initiating print
              setTimeout(() => {
                window.close();
              }, 500);
            } else {
              alert('Pop-up diblokir! Silakan izinkan pop-up untuk website ini.');
            }
          }

          // Clean up URL when preview window is closed
          window.addEventListener('beforeunload', () => {
            URL.revokeObjectURL("${url}");
          });
        </script>
      </body>
      </html>
    `;

    previewWindow.document.write(previewHtml);
    previewWindow.document.close();
    previewWindow.focus();
  } else {
    // Fallback: if preview window blocked, directly open print window
    const printWindow = window.open(url, "_blank");

    if (printWindow) {
      // Wait for content to load then focus and setup print
      printWindow.onload = () => {
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
          URL.revokeObjectURL(url); // Clean up
        }, 250);
      };

      // Fallback if onload doesn't trigger
      setTimeout(() => {
        if (printWindow && !printWindow.closed) {
          printWindow.focus();
          printWindow.print();
          printWindow.close();
          URL.revokeObjectURL(url);
        }
      }, 1000);
    } else {
      // Fallback to regular print
      URL.revokeObjectURL(url);
      window.print();
    }
  }
};
