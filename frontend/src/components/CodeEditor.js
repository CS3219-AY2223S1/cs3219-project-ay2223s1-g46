import React, { useEffect} from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/keymap/sublime'
import CodeMirror from 'codemirror'
import io from 'socket.io-client'


export const CodeEditor = () => {
  
  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('ds'), {
      lineNumbers: true,
      keyMap: 'sublime',
      theme: 'material-ocean',
      mode: 'javascript',
    })

    const socket = io('http://localhost:8002/', {
      transports: ['websocket'],
    })

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

    return () => {
    }
  }, [])

  return (
    <>
      <textarea id="ds" />
    </>
  )
}
