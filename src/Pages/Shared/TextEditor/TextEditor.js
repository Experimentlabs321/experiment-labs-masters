import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";
import "./style.css";

const TextEditor = ({ setValue, value, onBlur }) => {
  const editor = useRef(null);
  const [editStart, setEditStart] = useState(!value ? true : false);
  return (
    <div className="textEditor">
      <JoditEditor
        value={editStart ? value : null}
        ref={editor}
        onBlur={onBlur}
        onChange={(content) => {
          setValue(content);
          setEditStart(false);
        }}
      />
    </div>
  );
};

export default TextEditor;
