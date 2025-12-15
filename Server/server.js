// server/server.js
import { WebSocketServer } from "ws";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

let currentText = ""; // Shared text among all clients

wss.on("connection", (ws) => {
  console.log("🟢 New client connected");

  // Send current text to the new client
  ws.send(JSON.stringify({ type: "update", text: currentText }));

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === "update") {
        currentText = data.text;

        // Broadcast to everyone except sender
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === 1) {
            client.send(JSON.stringify({ type: "update", text: currentText }));
          }
        });
      }
    } catch (err) {
      console.error("❌ Error parsing message:", err);
    }
  });

  ws.on("close", () => {
    console.log("🔴 Client disconnected");
  });
});

console.log(`✅ WebSocket server running on ws://localhost:${PORT}`);
