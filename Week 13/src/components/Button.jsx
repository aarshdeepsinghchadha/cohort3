export const Button = ({
    disabled,
    children,
    onClick
}) => {
    return (
        <div onClick={onClick} className={` text-white pointer ${disabled ? "bg-blue-200" : "bg-green-400"}`}>
            {children}
        </div>
    );
}