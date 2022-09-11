import React from "react"
import { CodeEditor } from "../components/CodeEditor"
import "../components/css/EditorPage.css"

const EditorPage = () => {
  return (
    <div className="Editor">
      <CodeEditor className="code" />
    </div>
  )
}

export default EditorPage
