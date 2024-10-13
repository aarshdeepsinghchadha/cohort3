export function GreetingComponent({ greeting }) {
    return (
        <div style={{
            width: "100%",
            // backgroundColor: "lightgray",
            color: "black",
            padding: 20,
            textAlign: "left",
            fontSize: 24,
            fontWeight: "bold"
        }}>
            {greeting}
        </div>
    );
}