import React, { useRef, useEffect } from "react";
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

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     const selection = window.getSelection();
  //     let anchorNode = selection.anchorNode;
  
  //     // Ensure anchorNode is an element (not a text node)
  //     if (anchorNode.nodeType === 3) {
  //       anchorNode = anchorNode.parentElement; // Get its parent element
  //     }
  
  //     if (anchorNode && anchorNode.closest("table")) {
  //       event.preventDefault(); // Stop auto table creation
  
  //       // Insert a break line inside the table instead of creating a new table
  //       const range = selection.getRangeAt(0);
  //       const br = document.createElement("br");
  //       range.insertNode(br);
  //       range.setStartAfter(br);
  //       range.setEndAfter(br);
  //       selection.removeAllRanges();
  //       selection.addRange(range);
  //     }
  //   }
  // };

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

  const handlePaste = (e) => {
    e.preventDefault();

    const clipboardData = e.clipboardData || window.clipboardData;
    let pastedData = clipboardData.getData("text/html");

    pastedData = pastedData.replace(/margin-left:\s?-?\d+px;/g, "margin-left:0px;");
    pastedData = pastedData.replace(/margin-right:\s?-?\d+px;/g, "margin-right:0px;");

    const editor = getSunEditorInstance();
    if(editor) {
      editor.insertHTML(pastedData);
    }
  }

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
        // autoFocus
        placeholder="Enter...."
        getSunEditorInstance={(editor) => {
          getSunEditorInstance(editor);
          editor.core.context.element.wysiwyg.addEventListener("paste", handlePaste);
        }}
        // onKeyDown={handleKeyDown}
      />
    
    </>
  );
};
export default CustomSunEditor;
