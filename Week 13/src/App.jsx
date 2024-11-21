import "./App.css";
import { Otp } from "./components/Otp.jsx";
import {Username} from "./pages/Username.jsx";

function App() {
  return (
    <div className="h-screen bg-blue-700">
      {/* <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> */}
      {/* <Username /> */}
      <Otp/>
    </div>
  );
}

export default App;
