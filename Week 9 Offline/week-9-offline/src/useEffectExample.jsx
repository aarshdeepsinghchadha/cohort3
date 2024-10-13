import { useState, useEffect } from "react";

function App() {
    const [count, setCount] = useState(1);

    useEffect(() => {
        // Set up an interval to increase the count every 5 seconds
        const intervalId = setInterval(() => {
            setCount((prevCount) => prevCount + 1); // Use the previous count to increment
        }, 5000); // 5000 ms = 5 seconds

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        console.log("count has been updated to " + count);
    }, [count])

    return (
        <div>
            <div style={{ position: "relative", display: "inline-block" }}>
                <img
                    src="https://cdn-icons-png.flaticon.com/128/1827/1827349.png"
                    width={40}
                    style={{ cursor: "pointer" }}
                />
                {/* Circle with count */}
                <div
                    style={{
                        background: "red",
                        borderRadius: "50%", // Makes the div a circle
                        width: 20,
                        height: 20,
                        display: "flex",
                        alignItems: "center", // Centers vertically
                        justifyContent: "center", // Centers horizontally
                        color: "white", // Makes the text more visible
                        fontSize: 12, // Adjust font size for the smaller circle
                        position: "absolute", // Absolute positioning
                        bottom: "-10px", // Moves the circle slightly below the image
                        right: "-10px", // Moves the circle to the right of the image
                    }}
                >
                    {count}
                </div>
            </div>
        </div>
    );
}

export default App;
