import { useRef, useState } from "react";
import { Timer } from "../icons/Timer";
import { Heading } from "../components/Heading";
import { useNavigate } from "react-router-dom";

export function Otp() {
    const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
    const [disabled, setIsDisabled] = useState(true);

    const navigate = useNavigate();

    const handleBasicProject = () => {
        navigate("/basic-project");
    };

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const handleOtpChange = (index, value) => {
        if (/^\d*$/.test(value)) { // Allow only numeric values
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Automatically focus the next field if input is valid
            if (value && index < 5) {
                refs[index + 1].current.focus();
            }

            // Enable the Verify button only when all fields are filled
            setIsDisabled(newOtp.some((val) => !val));
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index]) {
            if (index > 0) {
                refs[index - 1].current.focus();
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-500 space-y-12">
            <div className="w-full max-w-3xl px-6">
                <Heading />
            </div>

            <div className="flex flex-col items-center w-full max-w-3xl space-y-8 py-16 px-12">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-6">
                        Check Your Email For A Code
                    </h1>
                    <p className="text-lg text-gray-300">
                        Please enter the verification code sent to your email ID{" "}
                        <span className="font-medium text-white">
                            ascnyc29@gmail.com
                        </span>
                    </p>
                </div>

                <div className="flex justify-center space-x-6">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            ref={refs[index]}
                            type="tel" // Better experience for numeric input on mobile
                            value={value}
                            maxLength="1"
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-16 h-16 text-xl font-medium text-center text-white bg-blue-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    ))}
                </div>

                <div className="flex items-center space-x-3 text-gray-400 text-base">
                    <Timer className="w-5 h-5 text-gray-400" />
                    <span>09:32</span>
                </div>

                <button
                    className={`w-[calc(6*4rem+5*1.5rem)] py-4 text-xl font-medium text-white rounded-lg ${disabled ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    disabled={disabled}
                    onClick={handleBasicProject}
                >
                    Verify
                </button>

                <div className="text-center text-gray-400 mt-6">
                    <p>
                        Can't find the email? Click{" "}
                        <a href="#" className="text-blue-400 underline">
                            here
                        </a>{" "}
                        to resend.
                    </p>
                </div>
            </div>
        </div>
    );
}
