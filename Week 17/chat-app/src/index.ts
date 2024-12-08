import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8080});
let userCount = 0;

wss.on("connection", (socket) => {
    userCount ++;
    console.log("user connected #" + userCount);
    
    socket.on("message", (message) => {
        console.log("message received " +  message.toString());
        setTimeout(() => {
            socket.send(message.toString() + ": sent from the server");
        }, 1000)
    })


})