import { useState } from "react";
import { Heading } from "../components/Heading";
import { Subtitle } from "../components/Subtitle";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";

export const Username = () => {
  const [inputValue, setInputValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/otp");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsDisabled(!emailRegex.test(value));
  };

  return (
    <div className="h-screen bg-blue-700 flex flex-col justify-center items-center px-4">
      <Heading />

      <div className="my-4 mt-20">
        <Subtitle>Please Enter your Email Address.</Subtitle>
      </div>

      <div className="w-full max-w-md mx-auto space-y-6">
        <Input
          type="text"
          placeholder="Enter Email Address"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button disabled={isDisabled} onClick={handleSignUp}>
          Sign Up
        </Button>
        
      </div>
    </div>
  );
};
