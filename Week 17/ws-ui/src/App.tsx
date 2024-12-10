import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();

  function sendMessage() {
    if (!socket) return;
    const message = inputRef.current.value.trim();
    if (message) {
      socket.send(message);
      inputRef.current.value = ''; // Clear the input field
    }
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (ev) => {
      setMessages((prevMessages) => [...prevMessages, ev.data]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      ws.close(); // Clean up the WebSocket connection on component unmount
    };
  }, []);

  return (
    <div>
      <div style={{ height: '200px', overflowY: 'auto', border: '5px solid black', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input ref={inputRef} type="text" placeholder="Type a message" />
      <button type="submit" onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
