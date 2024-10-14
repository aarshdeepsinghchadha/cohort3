import { useRef, useState } from "react";

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


function App() {
    const [currentClock, setCurrentClock] = useState(1);
    const timer = useRef();

    function startClock() {
        let value = setInterval(() => {
            setCurrentClock(x => x + 1);
        }, 1000);
        timer.current = value;
    }

    function stopClock() {
        clearInterval(timer.current);
    }

    return <div>
        {currentClock}
        <br />
        <button onClick={startClock}>Start</button>
        <button onClick={stopClock}>Stop</button>
    </div>
}

export default App;