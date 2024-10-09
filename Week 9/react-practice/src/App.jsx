// import { useState, useEffect } from "react";

// // conditional rendering
// function App() {
//   const [counterVisible, setCounterVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const randomVisibility = Math.random() > 0.5;
//       setCounterVisible(randomVisibility);
//     }, 5000);

//     // Cleanup the timer
//     return () => clearTimeout(timer);
//   }, []); // Empty array means this runs once after the initial render

//   return (
//     <div>
//       {counterVisible ? <Counter /> : <b>Counter Hidden</b>}
//     </div>
//   );
// }

// function Counter() {
//   const [count, setCount] = useState(0);

//   // This logic should only run when the component is mounted.
//   // Mount refers to when the component is first introduced and rendered to the DOM.
//   // Re-render refers to when the component updates and re-renders its content in the DOM.
//   // Unmount refers to when the component is removed from the DOM.


//   console.log("counter");
//   // useEffect(function () {
//   //   setInterval(function () {
//   //     setCount(count => count + 1);
//   //   }, 1000)
//   //   console.log("mounted");

//   // }, []);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCount((count) => count + 1);
//     }, 1000);
//     console.log("mounted");
//     return () => clearInterval(intervalId);
//   }, []); // dependency array, cleanup, fetch inside useEffect

//   // function increementCount() {
//   //   setCount(count + 1);
//   // }

//   // function decreaseCount() {
//   //   setCount(count - 1);
//   // }

//   // function resetCount() {
//   //   setCount(0);
//   // }

//   return <div>
//     <h1>{count}</h1>
//     {/* <button onClick={increementCount}>Increase Count</button>
//     <button onClick={decreaseCount}>Decrease Count</button>
//     <button onClick={resetCount}>Reset Count</button> */}
//   </div>
// }

// export default App




import { useState, useEffect } from "react";

function App() {

  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);


  function increase() {
    setCount(c => c + 1);
  }

  function decrease() {
    setCount2(c => c - 1);
  }

  return <div>
    <Counter count={count} count2={count2} />
    <button onClick={increase}>Increase Count</button>
    <button onClick={decrease}>Decrease Count</button>
  </div>
}


function Counter(props) {

  useEffect(() => {
    console.log("mount");

    return () => {
      console.log(("unmount"));

    }


  }, []);

  useEffect(() => {
    console.log("Count has changed!");

    return () => {
      console.log("cleanup inside secound effect");

    }
  }, [props.count, props.count2])

  return <div>
    Counter1 {props.count} <br />
    Counter2 {props.count2}
  </div>

}


export default App
