import React, { useRef } from "react";

import { Analytics } from "@vercel/analytics/react";

import CustomSunEditor from "./components/CustomSunEditor";

import './styles.css';

const App = () => {
  const [content, setContent] = React.useState("");

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
                /* Center the table */
                /*  width: 80%; Adjust as needed */
            }
            table, th, td {
                border: 1px solid black;
            }
            th, td {
                padding: 8px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        ${content}
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
      <div className="button-container">
        <button
          onClick={handleDownload}
          className="primary-button"
          disabled={!content}
        >
          Download as HTML
        </button>
      </div>
      <CustomSunEditor setContent={setContent} content={content} />
      <Analytics />

    </div>
  );
};

export default App;