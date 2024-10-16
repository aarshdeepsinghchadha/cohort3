import { atom, RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

// Define an atom to hold the bulb's state (on/off)
const bulb = atom({
    key: 'bulbState',  // Unique key for this atom
    default: false     // Default value of the atom (bulb off)
});

function LightBulb() {
    return (
        <RecoilRoot>
            {/* Components to display bulb state and toggle it */}
            <BulbState />
            <ToggleBulbState />
        </RecoilRoot>
    );
}

function BulbState() {
    // Get the current state of the bulb
    const bulbState = useRecoilValue(bulb);
    return (
        <div>
            {/* Conditionally render "Bulb On" or "Bulb Off" */}
            {bulbState ? "Bulb On" : "Bulb Off"}
        </div>
    );
}

function ToggleBulbState() {
    // Get the setter function to update the bulb state
    const setBulbState = useSetRecoilState(bulb);

    return (
        <div>
            {/* Toggle the bulb state on button click */}
            <button onClick={() => setBulbState(bulbState => !bulbState)}>
                Toggle the Bulb!
            </button>
        </div>
    );
}

function RecoilBulbExample() {
    // Return the LightBulb component in JSX
    return <LightBulb />;
}

export default RecoilBulbExample;
