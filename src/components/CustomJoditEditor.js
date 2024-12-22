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



const CustomeJoditEditor = ({content, setContent}) => {
  const editor = useRef(null);


    return (
        <JoditEditor
        ref={editor}
        value={content}
        config={editorConfig}
        tabIndex={1} 
        onChange={(newContent) => setContent(newContent)}
      />
    )
}

export default CustomeJoditEditor;