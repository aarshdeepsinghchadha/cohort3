import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function (socket) {
    console.log("User Connected");

    // Broadcast a message to all clients
    function broadcast(message: string) {
        wss.clients.forEach(client => {
            if (client.readyState === client.OPEN) {
                client.send(message);
            }
        });
    }

    socket.on("message", (e) => {
        const message = e.toString().trim();

        if (message === "ping") {
            socket.send("pong");
        } else {
            broadcast(message); // Send the message to all clients
        }
    });

    socket.on("close", () => {
        console.log("User Disconnected");
    });

    socket.on("error", (err) => {
        console.error("Socket error:", err);
    });
});
