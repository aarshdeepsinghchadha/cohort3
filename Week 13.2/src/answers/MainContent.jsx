import React from "react";
import { Schedule } from "../icons/Schedule";
import { Plus } from "../icons/Plus";
import { Archieve } from "../icons/Archieve";
import { Calender } from "../icons/Calender";
import { RightArrow } from "../icons/RightArrow";
import { LeftArrow } from "../icons/LeftArrow";
import { Play } from "../icons/Play";

export function MainContent({ isDarkMode, isSmallScreen }) {
  return (
    <div className={`bg-gray-200 min-h-screen w-full relative ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black' }`}>
      {/* Top Banner */}
      <div className="relative h-36">
        <img
          src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 relative space-y-6 -mt-20">
        
        {/* User Info and Good Morning Section */}
        <div className={`${isSmallScreen ? "block" : "flex"} transition-all duration-300 gap-6 ${isSmallScreen ? "place-items-center" : "items-start"} p-6`}>
          {/* User Card */}
          <div
            className={`${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
            } shadow-lg rounded-lg p-8 w-64 z-10 h-96 relative`}
          >
            <div className="w-32 h-40 mb-2 mx-auto">
              <img
                src="https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg"
                alt="User"
                className="w-40 h-32 rounded-2xl object-cover border-4 border-white mt-4"
              />
            </div>
            <h2 className="text-xl font-bold text-center mb-4">Aarshdeep Chadha</h2>
            <p className="text-lg text-center mb-4">ascnyc29@gmail.com</p>
            <p className="text-lg text-center">Gujarat, India</p>
          </div>

          {/* Good Morning Section */}
          <div className={`flex-1 mt-24 ms-8 ${isSmallScreen ? "ml-20" : ""}`}>
            <h2 className="text-xl ">November 20, 2024</h2>
            <p className="text-4xl font-bold my-6">
              Good morning, Aarshdeep! 🌞
            </p>
          </div>
        </div>

        {/* Calendar and Actions Section */}
        <div className={`${isSmallScreen ? "block" : "flex"} transition-all duration-300 ${isSmallScreen ? "" : "absolute"} top-2/4 justify-between left-88 ${isSmallScreen ? "w-full" : "w-9/12" } h-auto`}>
          {/* Calendar */}
          <div
            className={`${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
            } shadow-lg rounded-lg p-6 flex-1 mr-5`}
          >
            <div className="flex items-center justify-between mb-6  bg-gray-100">
              <div className="flex items-center space-x-2 text-gray-700">
                <div className="flex text-xl font-semibold space-x-4 items-center">
                  <button className="text-xl p-2">
                    <Calender />
                  </button>
                  <span className="text-lg">Monday, 14 October 2024</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <LeftArrow />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <RightArrow />
                </button>
              </div>
            </div>

            <div class="flex flex-col space-y-4">

            <div className="flex items-center border-b border-gray-300 pb-4">
              <div className="eventLeft pr-5 border-r border-green-400">
                <span className="font-bold text-xl block">11:30 AM</span>
                <span className="text-gray-500 text-1xl">9:30 AM</span>
              </div>
              <div className="eventRight items-center pl-3">
                <div className="flex items-center">
                  <p className="text-xl font-medium text-gray-400">Live</p>
                  <button className="text-xl p-1 text-red-600">
                    <Play />
                  </button>
                </div>
                <p className="font-medium text-xl ml-0">UX Webinar</p>
              </div>
            </div>

            <div className="flex items-center border-b border-gray-300 pb-4">
              <div className="eventLeft pr-5 border-r border-green-400">
                <span className="font-bold text-xl block">11:30 AM</span>
                <span className="text-gray-500 text-1xl">9:30 AM</span>
              </div>
              <div className="eventRight items-center pl-3">
                <div className="flex items-center">
                  <p className="text-xl font-medium text-gray-400">Live</p>
                  <button className="text-xl p-1 text-red-600">
                    <Play />
                  </button>
                </div>
                <p className="font-medium text-xl ml-0">UX Webinar</p>
              </div>
            </div>

            <div className="flex items-center border-b border-gray-300 pb-4">
              <div className="eventLeft pr-5 border-r border-green-400">
                <span className="font-bold text-xl block">11:30 AM</span>
                <span className="text-gray-500 text-1xl">9:30 AM</span>
              </div>
              <div className="eventRight items-center pl-3">
                <div className="flex items-center">
                  <p className="text-xl font-medium text-gray-400">Live</p>
                  <button className="text-xl p-1 text-red-600">
                    <Play />
                  </button>
                </div>
                <p className="font-medium text-xl ml-0">UX Webinar</p>
              </div>
            </div>

            <div className="flex items-center pb-4">
              <div className="eventLeft pr-5 border-r border-green-400">
                <span className="font-bold text-xl block">11:30 AM</span>
                <span className="text-gray-500 text-1xl">9:30 AM</span>
              </div>
              <div className="eventRight items-center pl-3">
                <div className="flex items-center">
                  <p className="text-xl font-medium text-gray-400">Live</p>
                  <button className="text-xl p-1 text-red-600">
                    <Play />
                  </button>
                </div>
                <p className="font-medium text-xl ml-0">UX Webinar</p>
              </div>
            </div>

            </div>
           
          </div>

          {/* Actions */}
          <div
            className={`${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
            } shadow-lg rounded-lg p-6 h-80 ${isSmallScreen ? "w-full" : "9/12" } ${isSmallScreen ? "mt-10" : "" } transition-all duration-300`}
          >
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col items-center space-y-2">
                <button className="bg-blue-500 p-4 rounded-md flex justify-center items-center w-16 h-16">
                  <Schedule />
                </button>
                <span className="text-md font-medium text-bold">
                  Schedule a Webinar
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <button className="bg-blue-500 p-4 rounded-md flex justify-center items-center w-16 h-16">
                  <Plus />
                </button>
                <span className="text-md font-medium text-bold">
                  Join a Webinar
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <button className="bg-blue-500 p-4 rounded-md flex justify-center items-center w-16 h-16">
                  <Archieve />
                </button>
                <span className="text-md font-medium text-bold">
                  Open Recordings
                </span>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
}

