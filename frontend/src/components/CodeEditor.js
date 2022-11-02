import React, { useContext, useEffect } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/keymap/sublime'
import CodeMirror from 'codemirror'
import { SocketContext } from "../socket"

export const CodeEditor = () => {
  const socket = useContext(SocketContext)
  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('ds'), {
      lineNumbers: true,
      keyMap: 'sublime',
      theme: 'material-ocean',
      mode: 'javascript',
    })
    console.log((socket?.id))


    socket.on('code', (code) => {
      console.log(code.code)
      const currentCursor = (editor.getCursor())
      editor.setValue(code.code)
      editor.setCursor(currentCursor)
    })

    editor.on('change', (instance, changes) => {
      const { origin } = changes
      if (origin !== 'setValue') {
        console.log(instance.getValue())
        socket.emit('code', instance.getValue())
      }
    })
    
    editor.on('cursorActivity', (instance) => {
      console.log(instance.cursorCoords())
    })

    socket.on('question', (question) => {
			console.log("a")
		  })

    return () => {
      socket.off('code')
      socket.off('change')
      socket.off('cursorActivity')
    }
  }, [])

  return (
    <>
      <textarea id="ds" />
    </>
  )
}
