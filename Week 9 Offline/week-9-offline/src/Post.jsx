const postStyle = {
    width: 200,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    padding: 20,
};


export function PostComponent({ imageSrc, name, subtitle, time, description }) {
    return (
        <div style={postStyle}>
            <div style={{ display: "flex" }}>
                <img
                    src={imageSrc}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 40,
                    }}
                    alt={`${name} logo`}
                />
                <div style={{ fontSize: 10, marginLeft: 10 }}>
                    <b>{name}</b>
                    <div style={{ paddingTop: 3 }}>{subtitle}</div>

                    {/* conditional rendering below  */}
                    {time && <div style={{ display: "flex" }}>
                        <div style={{ paddingTop: 3 }}>{time}</div>
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/2088/2088617.png"
                            alt="Time Icon"
                            style={{ width: 12, height: 12, marginLeft: 5, paddingTop: 3 }}
                        />
                    </div>}

                </div>
            </div>
            <div style={{ paddingTop: 10, fontSize: 15 }}>
                {description}
            </div>
        </div>
    );
}