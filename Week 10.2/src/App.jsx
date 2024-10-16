import { useState } from "react"


function App() {
  return <div>
    <LightBulb />
  </div>
}

function LightBulb() {
  const [bulbOn, setBulbOn] = useState(true);
  return <div>

    <BulbState bulbOn={bulbOn} />
    <ToogleBulbState setBulbOn={setBulbOn} />
  </div>
}

function BulbState({ bulbOn }) {


  return <div>
    {bulbOn ? "Bulb On" : "Bulb Off"}
  </div>
}

function ToogleBulbState({ setBulbOn }) {

  function toogle() {
    setBulbOn(currentState => !currentState)
  }

  return <div>
    <button onClick={toogle}>Toogle the bulb</button>
  </div>
}


export default App
