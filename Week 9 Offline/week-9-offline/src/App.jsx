import { PostComponent } from "./Post";
import { GreetingComponent } from "./Greeting";

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
              subtitle="23,777 followers"
              time="12 mins"
              description="let's play with toys? which one is your fav?"
            />
            <br />
          </div>
          <div>
            <PostComponent
              imageSrc="https://cdn.logoworks.com/wp-content/uploads/2017/06/Untitled-2-640x360-1.png"
              name="Starbucks"
              subtitle="promoted"
              description="Come have a coffee with us?"
            />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;