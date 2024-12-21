import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar";

const Home: React.FC = () => {
  const location = useLocation();

  // Hide Navbar on sign-up and sign-in pages
  if (location.pathname === "/sign-in" || location.pathname === "/sign-up") {
    return <></>;
  }

  return <Navbar />;
};

export default Home;
