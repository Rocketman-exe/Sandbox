import React from "react";
import * as XLSX from "xlsx";

const jsonData = [
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "Los Angeles" },
  { name: "Bob", age: 35, city: "Chicago" }
];

const convertJsonToExcel = () => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Create a new worksheet
  const ws = XLSX.utils.json_to_sheet(jsonData);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Generate a binary string from the workbook
  const excelData = XLSX.write(wb, { type: "binary", bookType: "xlsx" });

  // Convert the binary string to a Blob
  const blob = new Blob([s2ab(excelData)], {
    type: "application/octet-stream"
  });

  // Create a download link and trigger the download
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "data.xlsx";
  link.click();

  // Cleanup
  URL.revokeObjectURL(url);
};

// Utility function to convert a string to an ArrayBuffer
const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  Array.from(s).forEach((char, i) => {
    view[i] = char.charCodeAt(0) & 0xff;
  });
  return buf;
};

const App = () => {
  return (
    <div>
      <button onClick={convertJsonToExcel}>Convert to Excel</button>
    </div>
  );
};

export default App;
