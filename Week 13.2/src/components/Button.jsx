export const Button = ({ disabled, children, onClick, variant = "primary" }) => {
    const baseStyles =
      "rounded-lg py-3 px-4 w-full text-xl font-medium cursor-pointer";
    const variants = {
      primary: disabled
        ? "bg-blue-300 text-gray-200"
        : "bg-blue-600 text-white hover:bg-green-600",
      secondary: disabled
        ? "bg-gray-300 text-gray-500"
        : "bg-gray-500 text-white hover:bg-gray-600",
      danger: disabled
        ? "bg-red-200 text-gray-400"
        : "bg-red-500 text-white hover:bg-red-600",
    };
  
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variants[variant]}`}
      >
        {children}
      </button>
    );
  };
  