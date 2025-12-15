import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
function EditorComponent() {
    const [code, setCode] = useState('// Start coding...');
    const [status, setStatus] = useState('disconnected');
    const wsRef = useRef(null);
    const { roomId } = useParams();

  
  useEffect(() => {
    // connect to WebSocket backend with roomId
    const ws = new WebSocket(`ws://localhost:8080?room=${roomId}`);
    wsRef.current = ws;

    ws.onopen = () => setStatus("connected");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "update") setCode(data.text);
    };

    ws.onclose = () => setStatus("disconnected");
    ws.onerror = () => setStatus("error");

    return () => ws.close();
  }, [roomId]);
    const handleEditorChange = (value) => {
       setCode(value);
       if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
           wsRef.current.send(JSON.stringify({ type: "update", text: value }));
       }
    };
    return (
        <div>
            <Editor
                height="70vh"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={handleEditorChange}
                options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
}

export default EditorComponent;