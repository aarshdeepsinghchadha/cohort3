function App() {
  return (
    <div style={{ backgroundColor: "#ecf0f1", height: "100vh", position: "relative" }}>
      {/* Greeting Component that spans horizontally */}
      <GreetingComponent greeting="Hello Aarsh" />

      {/* Posts start below the Greeting Component */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <div>
          <div>
            <PostComponent
              imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/512px-LEGO_logo.svg.png"
              name="Lego"
              followers="23,777 followers"
              time="12 mins"
              description="let's play with toys? which one is your fav?"
            />
            <br />
          </div>
          <div>
            <PostComponent
              imageSrc="https://cdn.logoworks.com/wp-content/uploads/2017/06/Untitled-2-640x360-1.png"
              name="Starbucks"
              followers="100,500 followers"
              time="5 mins"
              description="Come have a coffee with us?"
            />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

// Greeting Component
function GreetingComponent({ greeting }) {
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

const postStyle = {
  width: 200,
  backgroundColor: "white",
  borderRadius: 10,
  borderColor: "gray",
  borderWidth: 1,
  padding: 20,
};

// Post Component with props
function PostComponent({ imageSrc, name, followers, time, description }) {
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
          <div style={{ paddingTop: 3 }}>{followers}</div>
          <div style={{ display: "flex" }}>
            <div style={{ paddingTop: 2 }}>{time}</div>
            <img
              src="https://cdn-icons-png.flaticon.com/128/2088/2088617.png"
              alt="Time Icon"
              style={{ width: 12, height: 12, marginLeft: 5 }}
            />
          </div>

        </div>
      </div>
      <div style={{ paddingTop: 10, fontSize: 15 }}>
        {description}
      </div>
    </div>
  );
}

export default App;
