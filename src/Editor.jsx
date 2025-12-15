import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
function EditorComponent() {
    const [code, setCode] = useState('// Start coding...');
    const ref = useRef(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        ws.onopen = () => {
            console.log("Connected to WebSocket server");
        };

        ws.onmessage = (event) => {
            try {
            const data = JSON.parse(event.data);
            if (data.type === "update") {
                setCode(data.text);
            }
            } catch (err) {
            console.error("❌ Error parsing message:", err);
            }
        };

        ws.onclose = () => {
            console.log("Disconnected from WebSocket server");
        };
        ref.current = ws;
        return () => {
            ws.close();
        };
    }, []);
    const handleEditorChange = (value) => {
       setCode(value);
       if (ref.current && ref.current.readyState === WebSocket.OPEN) {
           ref.current.send(JSON.stringify({ type: "update", text: value }));
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