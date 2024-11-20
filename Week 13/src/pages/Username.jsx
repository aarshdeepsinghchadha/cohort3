import { useState } from "react";
import { Heading } from "../components/Heading";
import { Subtitle } from "../components/Subtitle";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export const Username = () => {
  const [inputValue, setInputValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsDisabled(value.trim() === "");
  };

  return (
    <div className="h-screen bg-blue-700 flex flex-col justify-center items-center px-4">
      <Heading />

      <div className="my-4">
        <Subtitle>Enter Username</Subtitle>
        <Subtitle>Please Enter your UserName.</Subtitle>
      </div>

      <div className="w-full max-w-md mx-auto space-y-6">
        <Input
          type="text"
          placeholder="Enter Username"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button disabled={isDisabled} onClick={() => alert("Button Clicked!")}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};
