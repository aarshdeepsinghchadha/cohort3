import { useState, useEffect } from "react";
import { Home } from "../icons/Home";
import { Open } from "../icons/Open";
import { Close } from "../icons/Close";
import { Webinar } from "../icons/Webinar";
import { Billing } from "../icons/Billing";
import { Users } from "../icons/Users";
import { Settings } from "../icons/Settings";

export function SidebarClass1() {
    const [isOpen, setIsOpen] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

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
        <div className={`${isDarkMode ? "dark" : ""} flex h-screen`}>
            <div
                className={`${isOpen ? "w-64" : "w-16"
                    } bg-gray-800 dark:bg-gray-900 text-white h-screen transition-all duration-300 flex flex-col`}
            >
                <div className="p-4 flex items-center justify-between">
                    <span className={`${isOpen ? "block" : "hidden"} font-bold text-lg`}>
                        Sidebar
                    </span>
                    {isOpen && (
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white"
                        >
                            <Close size={24} />
                        </button>
                    )}
                </div>

                <ul className={`mt-4 ${!isOpen ? "ml-3" : ""} mr-3 space-y-2 flex-1`}>
                    {!isOpen && (
                        <li className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                            <button
                                onClick={() => setIsOpen(true)}
                                className="text-white"
                            >
                                <Open size={24} />
                            </button>
                        </li>
                    )}
                    <li className="flex justify-between items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                        <span className={`${isOpen ? "block" : "hidden"}`}>Home</span>
                        <Home size={24} />
                    </li>
                    <li className="flex justify-between items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                        <span className={`${isOpen ? "block" : "hidden"}`}>Webinars</span>
                        <Webinar size={24} />
                    </li>
                    <li className="flex justify-between items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                        <span className={`${isOpen ? "block" : "hidden"}`}>Billing</span>
                        <Billing size={24} />
                    </li>
                    <li className="flex justify-between items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                        <span className={`${isOpen ? "block" : "hidden"}`}>
                            User Management
                        </span>
                        <Users size={24} />
                    </li>
                    <li className="flex justify-between items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                        <span className={`${isOpen ? "block" : "hidden"}`}>Settings</span>
                        <Settings size={24} />
                    </li>
                </ul>
            </div>

            <div className="flex-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-4">
                <div className="p-4">
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="bg-gray-700 dark:bg-gray-600 text-white p-2 rounded-md w-full text-center"
                    >
                        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    </button>
                </div>

                <h1 className="text-2xl font-bold">Main Content</h1>
                <p className="mt-4">Here is your main content!</p>
            </div>
        </div>
    );
}
