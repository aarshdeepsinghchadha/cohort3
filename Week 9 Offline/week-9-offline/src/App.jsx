import { PostComponent } from "./Post";
import { GreetingComponent } from "./Greeting";
import { useState } from "react";

function App() {

  const [posts, setPosts] = useState([]);

  const postComponents = posts.map(post => <PostComponent
    imageSrc={post.imageSrc}
    name={post.name}
    subtitle={post.subtitle}
    time={post.time}
    description={post.description}
  />)

  function addPost() {
    setPosts([
      ...posts,
      {
        imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/512px-LEGO_logo.svg.png",
        name: "Lego",
        subtitle: "23,777 followers",
        time: "12 mins",
        description: "Let's play with toys? Which one is your favorite?",
      },
    ]);
  }

  return (
    <div style={{ backgroundColor: "#ecf0f1", height: "100vh", position: "relative" }}>
      {/* Greeting Component that spans horizontally */}
      <GreetingComponent greeting="Hello Aarsh" />
      <div style={{ paddingLeft: 20 }}>
        <button onClick={addPost}>Add Post</button>
      </div>
      {/* Posts start below the Greeting Component */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <div>
          <div>
            {postComponents}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;