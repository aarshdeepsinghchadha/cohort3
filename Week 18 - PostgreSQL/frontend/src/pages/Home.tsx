import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar";

import createImg from "../assets/create.png";
import editImg from "../assets/edit.png";
import responsive1Img from "../assets/responsive1.png";
import responsive2Img from "../assets/responsive2.png";
import responsive3Img from "../assets/responsive3.png";
import homeImg from "../assets/main.png";

const Home: React.FC = () => {
  const location = useLocation();

  // Hide Navbar on sign-up and sign-in pages
  if (location.pathname === "/sign-in" || location.pathname === "/sign-up") {
    return <></>;
  }

  const images = [
    { src: createImg, alt: "Create" },
    { src: editImg, alt: "Edit" },
    { src: responsive1Img, alt: "Responsive 1" },
    { src: responsive2Img, alt: "Responsive 2" },
    { src: responsive3Img, alt: "Responsive 3" },
    { src: homeImg, alt: "Home" },
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-4 sm:px-8 md:px-12">
          {images.map((image, index) => (
            <div
              key={index}
              className="rounded-lg shadow-lg overflow-hidden transform hover:scale-105 hover:bg-gray-600 transition-transform duration-600"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-72 object-cover transition-transform duration-600 transform hover:scale-95"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
