import { createContext, useContext, useState } from "react";

const CountContext = createContext();

function CountContextProvider({ children }) {
    const [count, setCount] = useState(0);

    return <CountContext.Provider value={{
        count: count,
        setCount: setCount
    }}>
        {children}
    </CountContext.Provider>
}


function Parent() {
    return (
        <div>
            <CountContextProvider>
                <Increase />
                <Decrease />
                <Value />
            </CountContextProvider>
        </div>
    )
}

function Increase() {
    const { setCount } = useContext(CountContext);

    return <div>
        <button onClick={() => setCount(count => count + 1)}>Increase</button>
    </div >
}

function Decrease() {
    const { setCount } = useContext(CountContext);

    function decrease() {
        setCount(count => count - 1);
    }


    return <div>
        <button onClick={decrease}>Decrease</button>
    </div>
}

function Value() {
    const { count } = useContext(CountContext);

    return <div>
        <p>Count : {count}</p>
    </div>
}

function CountContextExample() {
    return <Parent />
}

export default CountContextExample;