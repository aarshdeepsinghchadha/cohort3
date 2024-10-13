import { useState } from "react";

function App() {
    return (
        <div style={{ background: "#dfe6e9", height: "100vh" }}>
            <ToogleMessage />
        </div>
    )
}


const ToogleMessage = () => {
    const [notificationCount, setNotificationCount] = useState(0);

    function increement() {
        setNotificationCount(notificationCount + 1);
    }

    return (
        <div>
            <button onClick={(increement)}>
                Toogle Message
            </button>
            {notificationCount}
        </div>
    );
};

export default App;