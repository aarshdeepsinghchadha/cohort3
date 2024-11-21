import { ReactElement } from "react";
import { PlusIcon } from "../../icons/PlusIcon";

interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
}

const variantStyles = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "bg-purple-300 text-purple-600 hover:bg-purple-400",
};

const sizeStyles = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-md",
    lg: "py-3 px-6 text-lg",
};

export const Button = (props: ButtonProps) => {
    const { variant, size, text, startIcon, endIcon, onClick } = props;

    return (
        <button
            className={`btn ${variantStyles[variant]} ${sizeStyles[size]} rounded flex items-center gap-2`}
            onClick={onClick}
        >
            {startIcon && <span className="start-icon">{<PlusIcon />}</span>}
            <span>{text}</span>
            {endIcon && <span className="end-icon">{endIcon}</span>}
        </button>
    );
};
