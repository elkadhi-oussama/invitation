const SHEET_ID =
  PropertiesService.getScriptProperties().getProperty("SHEET_ID") ||
  "PASTE_YOUR_SHEET_ID_HERE";
const SHEET_NAME =
  PropertiesService.getScriptProperties().getProperty("SHEET_NAME") || "Sheet1";

function doGet(e) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Fallback to the first sheet if the named sheet is not found
    if (!sheet) {
      const sheets = ss.getSheets();
      if (!sheets || sheets.length === 0) {
        throw new Error("No sheets available in spreadsheet");
      }
      sheet = sheets[0];
    }

    const values = sheet.getDataRange().getValues();
    const headers = (values[0] || []).map((h) => String(h).trim());
    const rows = values.slice(1);

    const guests = rows
      .map((row) => {
        const entry = {};
        headers.forEach((header, index) => {
          entry[header] = row[index];
        });
        return entry;
      })
      .filter((row) => row && (row.Code || row.code || row.Name || row.name));

    return ContentService.createTextOutput(JSON.stringify(guests)).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (err) {
    console.error(err);
    return ContentService.createTextOutput(
      JSON.stringify({ error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
