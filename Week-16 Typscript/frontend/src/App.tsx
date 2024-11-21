import { Button } from "./components/ui/Button";

function App() {
  return (
    <div className="app-container flex flex-col items-center gap-4 p-6">
      <Button
        variant="secondary"
        size="md"
        text="Share"
        onClick={() => alert("Share clicked!")}
      />

      <Button
        variant="primary"
        size="md"
        text="Add Content"
        onClick={() => alert("Add Content clicked!")}
      />

      <Button
        variant="secondary"
        size="md"
        text="Add Content"
        onClick={() => alert("Secondary Add Content clicked!")}
      />
    </div>
  );
}

export default App;
