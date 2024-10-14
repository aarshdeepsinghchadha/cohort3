// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// function App() {
//   return (
//     <div>
//       <BrowserRouter>
//         <NavBar />
//         <Routes>
//           <Route path="/neet/online-coaching-11" element={<Class11Program />} />
//           <Route path="/neet/online-coaching-12" element={<Class12Program />} />
//           <Route path="/" element={<Landing />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// function NavBar() {
//   const navigate = useNavigate();

//   return (
//     <nav className="navbar">
//       <button onClick={() => navigate("/")}>Home</button> |
//       <button onClick={() => navigate("/neet/online-coaching-11")}>Class 11</button> | 
//       <button onClick={() => navigate("/neet/online-coaching-12")}>Class 12</button>
//     </nav>
//   );
// }

// function Class11Program() {
//   return <div>NEET programs for Class 11th</div>;
// }

// function Class12Program() {
//   return <div>NEET programs for Class 12th</div>;
// }

// function Landing() {
//   return <div>Welcome to Allen</div>;
// }

// export default App;


import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import "./App.css"; // assuming you add this CSS to a separate file

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* Parent Route that contains shared layout */}
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Landing />} />
                        <Route path="neet/online-coaching-11" element={<Class11Program />} />
                        <Route path="neet/online-coaching-12" element={<Class12Program />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

function Layout() {
    return (
        <div className="layout">
            <NavBar />
            <div className="main-content">
                {/* Outlet renders the child routes */}
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

function NavBar() {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/neet/online-coaching-11" className="nav-link">Class 11</Link>
            <Link to="/neet/online-coaching-12" className="nav-link">Class 12</Link>
        </nav>
    );
}

function Footer() {
    return (
        <footer className="footer">
            Made by Aarshdeep!
        </footer>
    );
}

function Class11Program() {
    return <div className="content-box">NEET programs for Class 11th</div>;
}

function Class12Program() {
    return <div className="content-box">NEET programs for Class 12th</div>;
}

function Landing() {
    return <div className="content-box">Welcome to Allen</div>;
}

function ErrorPage() {
    return <div className="content-box error">404 - Page Not Found!</div>;
}

export default App;


