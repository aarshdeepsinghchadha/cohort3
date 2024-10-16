import { atom, RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

// Define an atom to hold the state of the count
const count = atom({
    key: 'countState', // A unique key to identify this atom
    default: 0,        // Default value of the atom (initial state)
});

function Parent() {
    return (
        <div>
            {/* RecoilRoot is the root of the Recoil state management */}
            <RecoilRoot>
                {/* Render components to manage and display the count */}
                <Increase />  {/* Component to increase the count */}
                <Decrease />  {/* Component to decrease the count */}
                <Value />     {/* Component to display the current count value */}
            </RecoilRoot>
        </div>
    );
}

function Increase() {
    // Hook to get the setter function to update the count state
    const setCount = useSetRecoilState(count);

    return (
        <div>
            {/* Button to increase the count by 1 */}
            <button onClick={() => setCount(count => count + 1)}>Increase</button>
        </div>
    );
}

function Decrease() {
    // Hook to get the setter function to update the count state
    const setCount = useSetRecoilState(count);

    // Function to decrease the count by 1
    function decrease() {
        setCount(count => count - 1);
    }

    return (
        <div>
            {/* Button to decrease the count */}
            <button onClick={decrease}>Decrease</button>
        </div>
    );
}

function Value() {
    // Hook to get the current value of the count state
    const countValue = useRecoilValue(count);

    return (
        <div>
            {/* Display the current count value */}
            <p>Count : {countValue}</p>
        </div>
    );
}

function RecoilExample() {
    // Main component that renders the parent component
    return <Parent />;
}

export default RecoilExample;
