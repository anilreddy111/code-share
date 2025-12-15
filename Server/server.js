// server/server.js
import { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

let currentText = ""; // Shared text among all clients

// --- WebSocket Setup ---

// Store room data { roomId: currentText }
const rooms = {};

wss.on("connection", (ws, req) => {
  // Parse roomId from query string
  const url = new URL(req.url, `http://${req.headers.host}`);
  const roomId = url.searchParams.get("room") || "default";

  // Ensure room exists
  if (!rooms[roomId]) rooms[roomId] = "";

  console.log(`👥 New client joined room: ${roomId}`);

  // Send current room content to this new user
  ws.send(JSON.stringify({ type: "update", text: rooms[roomId] }));

  // Handle messages
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.type === "update") {
      rooms[roomId] = data.text; // update room content

      // Broadcast to all in same room
      wss.clients.forEach((client) => {
        if (
          client !== ws &&
          client.readyState === 1 &&
          client.roomId === roomId
        ) {
          client.send(JSON.stringify({ type: "update", text: rooms[roomId] }));
        }
      });
    }
  });

  // Attach roomId to connection
  ws.roomId = roomId;

  ws.on("close", () => {
    console.log(`🔴 Client left room ${roomId}`);
  });
});
console.log(`✅ WebSocket server running on ws://localhost:${PORT}`);
