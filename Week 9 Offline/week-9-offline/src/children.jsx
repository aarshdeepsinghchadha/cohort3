import { useState } from "react";

function App() {
    return (
        <div style={{ gap: "20px" }}>
            <Card>
                <h2>This is a title inside the Card</h2>
                <p>This is a paragraph inside the Card component.</p>
            </Card>
            <Card>
                <h2>This is a title inside the Card 2</h2>
                <p>This is a paragraph inside the Card component 2.</p>
            </Card>
        </div>
    );
}

function Card({ children }) {
    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: "5px",
            padding: '20px',
            margin: '10px',
            boxShadow: '2px 2px 5px rgba(0,0,0,0)'
        }}>
            {children}
        </div>
    );
}

export default App;
