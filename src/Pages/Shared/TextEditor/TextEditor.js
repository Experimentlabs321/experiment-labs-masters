import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";
import "./style.css";

const TextEditor = ({ setValue, value }) => {
  const editor = useRef(null);
  const [editStart, setEditStart] = useState(!value ? true : false);
  return (
    <div>
      <JoditEditor
        value={editStart ? value : null}
        ref={editor}
        onChange={(content) => {
          setValue(content);
          setEditStart(false);
        }}
      />
    </div>
  );
};

export default TextEditor;
