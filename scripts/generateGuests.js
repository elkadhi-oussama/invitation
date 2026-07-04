import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import xlsx from "xlsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const inputPath = path.join(rootDir, "guests.xlsx");
const outputPath = path.join(rootDir, "src", "data", "guests.json");

const makeCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
};

if (!fs.existsSync(inputPath)) {
  console.error("guests.xlsx not found.");
  process.exit(1);
}

const workbook = xlsx.readFile(inputPath);
const [sheetName] = workbook.SheetNames;
const sheet = workbook.Sheets[sheetName];
const rows = xlsx.utils.sheet_to_json(sheet, { defval: "" });

const guests = rows.map((row, index) => {
  const name = row.Name || row.name || row["اسم"] || `Guest ${index + 1}`;
  const existingCode = row.Code || row.code || row["Code"];
  const code = existingCode ? String(existingCode) : makeCode();
  const invitationLink = `https://your-domain.vercel.app/invite/${code}`;

  return {
    id: index + 1,
    code,
    name,
    invitationLink,
  };
});

const sheetRows = rows.map((row, index) => {
  const guest = guests[index];
  return {
    ...row,
    Code: guest.code,
    "Invitation Link": guest.invitationLink,
  };
});

const updatedSheet = xlsx.utils.json_to_sheet(sheetRows);
const updatedWorkbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(updatedWorkbook, updatedSheet, sheetName);
xlsx.writeFile(updatedWorkbook, inputPath);

fs.writeFileSync(outputPath, JSON.stringify(guests, null, 2));
console.log(`Generated ${guests.length} invitations.`);
