//import { useRef, useState } from "react";

// function App() {
//   const inputRef = useRef();
//   const [value, setValue] = useState(1);



//   function focusOnInput() {
//     //document.getElementById("name").focus()
//     inputRef.current.focus();
//   }

//   return <div>
//     Sign up
//     <input ref={inputRef} id="name" type="text"></input>
//     <input type="text"></input>
//     <button onClick={focusOnInput}>Submit</button>
//   </div>
// }

// export default App;


// function App() {
//   const [currentClock, setCurrentClock] = useState(1);
//   const timer = useRef();

//   function startClock() {
//     let value = setInterval(() => {
//       setCurrentClock(x => x + 1);
//     }, 1000);
//     timer.current = value;
//   }

//   function stopClock() {
//     clearInterval(timer.current);
//   }

//   return <div>
//     {currentClock}
//     <br />
//     <button onClick={startClock}>Start</button>
//     <button onClick={stopClock}>Stop</button>
//   </div>
// }

// export default App;

// example for scroll to bottom
import { useState, useEffect, useRef } from "react";

const App = () => {
  const [messages, setMessages] = useState([
    "Hello!",
    "How are you?",
    "What's going on?"
  ]);
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  // Function to add new messages
  const addMessage = () => {
    setMessages([...messages, "New message added!"]);
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div key={index} style={styles.message}>
            {message}
          </div>
        ))}
        {/* This is the ref for scrolling */}
        <div ref={messagesEndRef} />
      </div>
      <button style={styles.button} onClick={addMessage}>
        Add Message
      </button>
    </div>
  );
};

// Simple inline styles for the chat UI
const styles = {
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    height: "300px",
    width: "300px",
    border: "1px solid black",
    margin: "0 auto",
  },
  messagesContainer: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    borderBottom: "1px solid gray",
  },
  message: {
    padding: "5px 0",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  }
};

export default App;
