import React from "react";
import { useEffect, useState } from "react";

const App = () => {
    return (
        <div>
            <ErrorBoundary>
                <Card1 />
            </ErrorBoundary>
            <ErrorBoundary>
                <Card2 />
            </ErrorBoundary>
        </div>
    );
};

// Card component that can throw an error
function Card1() {
    // Uncomment to simulate an error
    // throw new Error("Error While rendering");

    return (
        <div style={{ background: "red", borderRadius: 20, padding: 20 }}>
            Card 1
        </div>
    );
}

// Another Card component
function Card2() {
    return (
        <div style={{ background: "red", borderRadius: 20, padding: 20, margin: 20 }}>
            Card 2
        </div>
    );
}

// ErrorBoundary component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasErrors: false };
    }

    static getDerivedStateFromError(error) {
        return { hasErrors: true };
    }

    componentDidCatch(error, info) {
        console.error("Error Caught:", error, info);
    }

    render() {
        if (this.state.hasErrors) {
            return <div style={{ background: "red", borderRadius: 20, padding: 20 }}>
                Something went wrong
            </div>
        }

        return this.props.children;
    }
}

export default App;
