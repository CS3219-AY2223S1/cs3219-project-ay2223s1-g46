import React from "react";
import { TextField } from '@mui/material/';
import { CodeEditor } from "./CodeEditor";
import "./css/EditorPage.css";

const EditorPage = () => {
    return (
    <div className = "Editor" >
        <CodeEditor className="code"/>
    </div>
    )
}

export default EditorPage;