import { useState } from "react";
import { usePrev } from "./hooks/usePrev";

function usePrevExample() {

    const [count, setCount] = useState(0);

    const prevCount = usePrev(count);

    return (
        <div>
            <h1>Current Count : {count}</h1>
            <h2>Previous Count : {prevCount !== undefined ? prevCount : 'None'}</h2>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    )
}

export default usePrevExample;