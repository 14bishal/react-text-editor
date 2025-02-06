import React, { useRef } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { COLOR_LIST, TOOL_BAR_CONFIG } from "../constant";


import '../styles.css'

const CustomSunEditor = ({content='', setContent=() => {}, handleDownload=() => {}}) => {
  const sunEditorRef = useRef();


  const getSunEditorInstance = (sunEditor) => {
    sunEditorRef.current = sunEditor;
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      sunEditor.setContents(savedContent); // Load saved content
    }
  };

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setContent(savedContent); // Set editor content from storage
    }
  }, []);

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

  const deleteContent = () => {
    if (sunEditorRef.current) {
      sunEditorRef.current.setContents(""); // Clear editor content
      localStorage.removeItem("editorContent"); // Remove from storage
      alert("Content Deleted! ❌");
      setContent(""); // Reset state
    }
  };

  // Save content to localStorage
  const saveContent = () => {
    if (sunEditorRef.current) {
      const editorContent = sunEditorRef.current.getContents(); // Get editor content
      localStorage.setItem("editorContent", editorContent);
      alert("Content Saved! ✅");
    }
  };

  return (
    <>
      <div className="button-container">
        <button
          onClick={handleDownload}
          className="button download"
        >
          Download as HTML
        </button>
        <button onClick={saveContent} disabled={!content} className="button save">Save</button>
        <button onClick={deleteContent} disabled={!content} className="button delete">Delete</button>
      </div>
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
          colorList: COLOR_LIST,
        }}
        setDefaultStyle="height: 700px; overflow: auto; border: 2px solid #CBD5E1 !important;"
        autoFocus
        getSunEditorInstance={getSunEditorInstance}
        onKeyDown={handleKeyDown}
      />
    
    </>
  );
};
export default CustomSunEditor;
