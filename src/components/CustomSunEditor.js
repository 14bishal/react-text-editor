import React, { useRef } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import '../styles.css'

const TOOL_BAR_CONFIG = [
  [
    "undo",
    "redo",
    "font",
    "fontSize",
    "bold",
    "underline",
    "italic",
    "strike",
    "subscript",
    "superscript",
    "fontColor",
    "hiliteColor",
    "align",
    "list",
    "lineHeight",
    "outdent",
    "indent",
    "table",
    "horizontalRule",
    "link",
    // "image",
    "removeFormat",
  ],
];

const CustomSunEditor = ({content, setContent}) => {
  const sunEditorRef = useRef();


  const getSunEditorInstance = (sunEditor) => {
    sunEditorRef.current = sunEditor;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const selection = window.getSelection();
      let anchorNode = selection.anchorNode;
  
      // Ensure anchorNode is an element (not a text node)
      if (anchorNode.nodeType === 3) {
        anchorNode = anchorNode.parentElement; // Get its parent element
      }
  
      if (anchorNode && anchorNode.closest("table")) {
        event.preventDefault(); // Stop auto table creation
        document.execCommand("insertHTML", false, "<br>");
      }
    }
  };

  const handleChange = (val) => {
    setContent(val);
  };

  return (
      <SunEditor
        defaultValue={content}
        onChange={handleChange}
        setOptions={{
          buttonList: TOOL_BAR_CONFIG,
          defaultTag: "div",
          minHeight: "680px",
          maxWidth:"1145px",
          showPathLabel: false,
          height: 'auto',
        }}
        setDefaultStyle="height: 700px; overflow: auto; border: 2px solid #CBD5E1 !important;"
        autoFocus
        getSunEditorInstance={getSunEditorInstance}
        onKeyDown={handleKeyDown}
      />
  );
};
export default CustomSunEditor;
