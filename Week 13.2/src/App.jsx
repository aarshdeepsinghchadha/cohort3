import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { BasicProject } from './answers/1-basic.projects';
import { Otp } from './components/Otp';
import { Username } from './answers/Username';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Username />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/basic-project" element={<BasicProject />} />
      </Routes>
    </Router>
  );
}

export default App;
