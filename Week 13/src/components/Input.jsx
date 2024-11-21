export const Input = ({ type, placeholder, value, onChange }) => {
    return (
      <div className="w-full flex justify-center">
        <input
          type={type}
          placeholder={placeholder}
          value={value} 
          onChange={onChange}
          className="bg-blue-200 text-blue-700 text-lg rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-green-400 w-full max-w-md"
        />
      </div>
    );
  };
  