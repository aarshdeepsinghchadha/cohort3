import { useState } from "react";
import useDebounce from "./hooks/useDebounce";

function UseIsOnlineHookExample() {
    const [inputValue, setInputValue] = useState('');

    const debouncedValue = useDebounce(inputValue, 1000);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Debounced Input Example</h1>
            <input
                type="text"
                placeholder="Type something..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{ padding: '10px', width: '300px' }}
            />
            <p style={{ marginTop: '20px' }}>
                Debounced Value: <strong>{debouncedValue}</strong>
            </p>
        </div>
    );
}

export default UseIsOnlineHookExample;