import { useState, useEffect } from "react";

function App() {
  return <div>
    <b>Hi There </b>
    <Counter></Counter>
  </div>
}

function Counter() {
  const [count, setCount] = useState(0);

  // this logic should only run when we want to mount
  // mount means when we introduce a code to dom
  // re-render means when it re-render the codes to the dom
  // unmount means when the code is removed from dom

  console.log("counter");
  useEffect(function () {
    setInterval(function () {
      setCount(count => count + 1);
    }, 1000)
    console.log("mounted");

  }, []);

  function increementCount() {
    setCount(count + 1);
  }

  function decreaseCount() {
    setCount(count - 1);
  }

  function resetCount() {
    setCount(0);
  }

  return <div>
    <h1>{count}</h1>
    <button onClick={increementCount}>Increase Count</button>
    <button onClick={decreaseCount}>Decrease Count</button>
    <button onClick={resetCount}>Reset Count</button>
  </div>
}

export default App
