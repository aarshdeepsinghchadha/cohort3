import { useState, useEffect } from "react";

function App() {

  const [currentTab, setCurrentTab] = useState(1);
  const [tabData, setTabData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${currentTab}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTabData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Optional cleanup if needed
    return () => {
      setTabData({}); // Reset data if necessary
    };
  }, [currentTab]);


  return <div>
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: 20,
      width: "60%",
      margin: "0 auto"
    }}>
      <button onClick={() => { setCurrentTab(1) }}
        style={{ color: currentTab == 1 ? "red" : "black" }}>
        Todo #1
      </button>
      <button onClick={() => { setCurrentTab(2) }}
        style={{ color: currentTab == 2 ? "red" : "black" }}>
        Todo #2
      </button>
      <button onClick={() => { setCurrentTab(3) }}
        style={{ color: currentTab == 3 ? "red" : "black" }}>
        Todo #3
      </button>
      <button onClick={() => { setCurrentTab(4) }}
        style={{ color: currentTab == 4 ? "red" : "black" }}>
        Todo #4
      </button>
    </div>
    <div style={{
      paddingLeft: 20,
      paddingTop: 20,
      fontSize: 20,
      background: "gray",
      textAlign: "center"
    }}>
      {loading ? "Loading.." : tabData.title}
    </div>

  </div>
}

export default App;
