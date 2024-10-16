import { useState } from "react";

// Main component renamed to RollUpStateExample
function RollUpStateExample() {
    return (
        <div>
            {/* Render the LightBulb component, which handles the bulb's state */}
            <LightBulb />
        </div>
    );
}

function LightBulb() {
    // Create state to manage whether the bulb is on or off
    const [bulbOn, setBulbOn] = useState(true);

    return (
        <div>
            {/* Pass the current state of the bulb to BulbState */}
            <BulbState bulbOn={bulbOn} />
            {/* Pass the setBulbOn function to ToogleBulbState to allow toggling */}
            <ToogleBulbState setBulbOn={setBulbOn} />
        </div>
    );
}

function BulbState({ bulbOn }) {
    return (
        <div>
            {/* Display the current state of the bulb (on/off) */}
            {bulbOn ? "Bulb On" : "Bulb Off"}
        </div>
    );
}

function ToogleBulbState({ setBulbOn }) {
    // Function to toggle the bulb state (on/off)
    function toggle() {
        setBulbOn(currentState => !currentState); // Invert the current state
    }

    return (
        <div>
            {/* Button to toggle the bulb state */}
            <button onClick={toggle}>Toggle the bulb</button>
        </div>
    );
}

export default RollUpStateExample;
