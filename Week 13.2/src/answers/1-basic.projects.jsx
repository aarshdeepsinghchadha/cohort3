import { useState, useEffect } from "react";
import { Home } from "../icons/Home";
import { Open } from "../icons/Open";
import { Webinar } from "../icons/Webinar";
import { Billing } from "../icons/Billing";
import { Users } from "../icons/Users";
import { Settings } from "../icons/Settings";
import { MainContent } from "./MainContent";
import DarkModeToggle from "../components/DarkModeToggle";
import { DarkMode } from "../icons/DarkMode";
import { LightMode } from "../icons/LightMode";

export function BasicProject() {
    const [isOpen, setIsOpen] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleToggle = () => {
        setIsDarkMode((prev) => !prev);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 640) {
                setIsOpen(false);
                setIsSmallScreen(true);
            } else {
                setIsSmallScreen(false);
                setIsOpen(true);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <div className={`${isDarkMode ? "dark" : ""} flex `}>
            <div
                className={`${isOpen ? "w-64" : "w-16"
                    } bg-white dark:bg-gray-900 text-black dark:text-white  transition-all duration-300 flex flex-col `}>
                <div className="p-4 flex items-center justify-between">
                    <div className={`${isOpen ? "block" : "hidden"} font-bold text-lg flex space-x-2  bg-blue-900 text-white p-1 pr-4 pl-4 rounded-md dark:bg-white dark:text-blue-900`}>
                        <div className="mt-0"><Webinar /> </div>
                        <div><button>Webinar</button></div>
                    </div>
                    {isOpen && (
                        <button
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center w-6 h-6 rounded-full text-black dark:text-white"
                            title="Click me to close"
                        >
                            <img
                                src="https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg"
                                alt="Close"
                                className="w-6 h-6 rounded-full"
                            />
                        </button>
                    )}

                </div>

                <ul className={`mt-4 ${!isOpen ? "ml-3" : ""} mr-3 space-y-2 flex-1`}>

                    <li className={`flex justify-between items-center space-x-2 ${isOpen ? "p-2" : "p"}  rounded-md cursor-pointer shadow-md`} >
                        <span className={`${isOpen ? "block" : "hidden"}`}>{isDarkMode ? <DarkMode /> : <LightMode />}</span>
                        <DarkModeToggle
                            isDarkMode={isDarkMode}
                            onToggle={handleToggle}
                            size="small"
                        />
                    </li>


                    {!isOpen && (
                        <li className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer shadow-md">
                            <button
                                onClick={() => setIsOpen(true)}
                                className=""
                            >
                                <Open size={24} />
                            </button>
                        </li>
                    )}
                    <li className="flex justify-between items-center p-2 hover:bg-gray-200 rounded-md cursor-pointer shadow-md">
                        <span className={`${isOpen ? "block" : "hidden"}`}>Home</span>
                        <Home size={24} />
                    </li>
                    <li className="flex justify-between items-center p-2 hover:bg-gray-200 rounded-md cursor-pointer shadow-md">
                        <span className={`${isOpen ? "block" : "hidden"}`}>Webinars</span>
                        <Webinar size={24} />
                    </li>
                    <li className="flex justify-between items-center p-2 hover:bg-gray-200 rounded-md cursor-pointer shadow-md">
                        <span className={`${isOpen ? "block" : "hidden"}`}>Billing</span>
                        <Billing size={24} />
                    </li>
                    <li className="flex justify-between items-center p-2 hover:bg-gray-200 rounded-md cursor-pointer shadow-md">
                        <span className={`${isOpen ? "block" : "hidden"}`}>
                            User Management
                        </span>
                        <Users size={24} />
                    </li>
                    <li className="flex justify-between items-center p-2 hover:bg-gray-200 rounded-md cursor-pointer shadow-md">
                        <span className={`${isOpen ? "block" : "hidden"}`}>Settings</span>
                        <Settings size={24} />
                    </li>
                </ul>
            </div>


            <div className="flex-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
                <MainContent isDarkMode={isDarkMode} isSmallScreen={isSmallScreen} />
            </div>
        </div>
    );
}
