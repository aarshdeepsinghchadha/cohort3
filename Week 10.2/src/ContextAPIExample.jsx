import { createContext, useContext, useState } from "react";

// Create a context to hold the bulb's state and its setter function
const BulbContext = createContext();

// BulbProvider component to wrap around any components that need access to the bulb state
export function BulbProvider({ children }) {
    // Create state to manage whether the bulb is on or off
    const [bulbOn, setBulbOn] = useState(true);

    return (
        // Provide the bulbOn state and setBulbOn function to all child components
        <BulbContext.Provider value={{
            bulbOn: bulbOn,   // Passing bulbOn state
            setBulbOn: setBulbOn // Passing setBulbOn function
        }}>
            {children} {/* Render any children components that are wrapped inside BulbProvider */}
        </BulbContext.Provider>
    );
}

// Renamed the main function from App to ContextAPIExample
function ContextAPIExample() {
    return (
        <div>
            {/* Wrap the Light component inside BulbProvider to give it access to bulbOn and setBulbOn */}
            <BulbProvider>
                <Light />
            </BulbProvider>
        </div>
    );
}

function Light() {
    // Light component rendering both the LightBulb and LightSwitch components
    return (
        <div>
            <LightBulb />
            <LightSwitch />
        </div>
    );
}

function LightBulb() {
    // Use useContext to access the current value of bulbOn from BulbContext
    const { bulbOn } = useContext(BulbContext);

    return (
        <div>
            {/* Display the current state of the bulb (on/off) */}
            {bulbOn ? "Bulb On" : "Bulb Off"}
        </div>
    );
}

function LightSwitch() {
    // Use useContext to access the setBulbOn function from BulbContext
    const { setBulbOn } = useContext(BulbContext);

    // Function to toggle the bulb state (on/off) when the button is clicked
    function toggle() {
        setBulbOn(currentState => !currentState); // Toggle the state by inverting the current value
    }

    return (
        <div>
            {/* Button to toggle the bulb state */}
            <button onClick={toggle}>Toggle the bulb</button>
        </div>
    );
}

export default ContextAPIExample;
