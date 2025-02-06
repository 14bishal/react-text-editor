import React, { useRef } from "react";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"

import CustomSunEditor from "./components/CustomSunEditor";

import './styles.css';

const App = () => {
  const [content, setContent] = React.useState('');

  const handleDownload = () => {
    if (!content.trim()) {
      alert("Editor content is empty. Add some content to download.");
      return;
    }

    const fullHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            table {
                border-collapse: collapse;
                margin: 0 auto;
                table-layout: fixed;
                overflow-wrap: anywhere;
            }
            table, th, td {
                border: 1px solid black;
            }
            th, td {
                padding: 4px;
            }
        </style>
    </head>
    <body>
      <div style="padding: 20px 30px; margin-top: 50px;">
        ${content}
      </div>
    </body>
    </html>`;

    // const newWindow = window.open("", "_blank");
    //  newWindow.document.write(fullHTML);
    //  newWindow.document.close();

    //Create a Blob with the full HTML content
    const blob = new Blob([fullHTML], { type: "text/html" });

    // Create a download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "content.html"; // Set the file name

    // Programmatically trigger the download
    document.body.appendChild(link); // Append the link to the document
    link.click(); // Trigger click to start download
    document.body.removeChild(link); // Clean up the DOM

    URL.revokeObjectURL(link.href); // Release memory
};

  return (
    <div className="parent-container">
      <h1>Build Your HTML file</h1>
      <CustomSunEditor setContent={setContent} content={content} handleDownload={handleDownload} />
      <Analytics />
      <SpeedInsights />

    </div>
  );
};

export default App;