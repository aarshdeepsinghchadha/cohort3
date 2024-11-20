import { useRef, useState } from "react";
import { Button } from "./Button";

export function Otp() {
    const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
    const [disabled, setIsDisabled] = useState(true);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            refs[index + 1].current.focus();
        }
        setIsDisabled(newOtp.some(val => !val));
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index]) {
            if (index > 0) {
                refs[index - 1].current.focus();
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full max-w-md mx-auto space-y-6">
            <div className="flex space-x-2">
                {refs.map((ref, index) => (
                    <SubOtpBox
                        key={index}
                        reference={ref}
                        onDone={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        value={otp[index]}
                    />
                ))}
            </div>
            <Button disabled={disabled}>
                Sign Up
            </Button>
        </div>

    );
}

function SubOtpBox({ reference, onDone, onKeyDown, value }) {
    return (
        <div>
            <input
                ref={reference}
                type="text"
                value={value}
                onChange={onDone}
                onKeyDown={onKeyDown}
                maxLength={1}
                className="m-1 w-[40px] h-[50px] rounded-xl bg-blue-200 outline-none px-4 text-center text-white"
            />
        </div>
    );
}
