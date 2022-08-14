import "./App.css";
import Button from "@mui/material/Button";
import { useState } from "react";

function App() {
  const [payload, setPayload] = useState(0);
  const data = () => {
    fetch("http://localhost:8000/finance/wallstreetbets")
      .then((response) => response.json())
      .then((data) => setPayload(data));
  };
  console.log(payload);
  return (
    <div className="App">
      <Button variant="contained" onClick={data}>
        Text
      </Button>
      <br />
      {payload ? payload.map((item) => <li>{item.title}</li>) : " "}
    </div>
  );
}

export default App;
