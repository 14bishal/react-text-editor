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
    "image",
    "removeFormat",
  ],
];

const CustomSunEditor = ({content, setContent}) => {
  const sunEditorRef = useRef();


  const getSunEditorInstance = (sunEditor) => {
    sunEditorRef.current = sunEditor;
  };

  const handleChange = (val) => {
    setContent(val);
  };

  return (
    <div>
      <SunEditor
        defaultValue={content}
        onChange={handleChange}
        setOptions={{
          buttonList: TOOL_BAR_CONFIG,
          defaultTag: "div",
          minHeight: "550px",
          showPathLabel: false,
          height: 'auto',
        }}
        setDefaultStyle="height: 300px; overflow: auto;"
        autoFocus
        getSunEditorInstance={getSunEditorInstance}
      />
    </div>
  );
};
export default CustomSunEditor;
