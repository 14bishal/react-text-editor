import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const editorConfig = {
  // buttons: [
  //   "bold",       // Bold text
  //   "italic",     // Italic text
  //   "underline",  // Underline text
  //   // "strikethrough", // Strikethrough
  //   "|",          // Separator
  //   "ul",         // Unordered list
  //   "ol",         // Ordered list
  //   // "|",          // Separator
  //   "table",      // Insert table
  //   "link",       // Insert link
  //   // "image",      // Insert image
  // ],
  toolbarSticky: true, // Disable sticky toolbar
  theme: 'default', 
  height: 500,
  allowResizeX: true,
  allowResizeY: true,
  defaultActionOnPaste: 'insert_as_html',
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false, 
  addNewLine: false, // to hode the break icon which is visible at the bottom-right side
};

const App = () => {
  const editor = useRef(null);
  const [content, setContent] = React.useState("");

  const handleDownload = () => {
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
  
    // const blob = new Blob([fullHTML], { type: "text/html" });
    // const link = document.createElement("a");
    // link.href = URL.createObjectURL(blob);
    // link.download = "content.html";
    // link.click();
    // URL.revokeObjectURL(link.href);

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
    <div style={{ padding: "20px" }}>
      <h1>React Text Editor</h1>
      <JoditEditor
        ref={editor}
        value={content}
        config={editorConfig}
        tabIndex={1} 
        onChange={(newContent) => setContent(newContent)}
      />
      <button
        onClick={handleDownload}
        style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}
      >
        Download as HTML
      </button>
    </div>
  );
};

export default App;