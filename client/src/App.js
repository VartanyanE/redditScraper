import "./App.css";
import Button from "@mui/material/Button";

function App() {
  const data = () => {
    fetch("http://localhost:8000/finance/wallstreetbets")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div className="App">
      <Button variant="contained" onClick={data}>
        Text
      </Button>
    </div>
  );
}

export default App;
