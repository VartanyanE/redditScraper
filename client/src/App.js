import "./App.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import image from "./assets/reddit-logo.png";
import Cnbc from "./assets/cnbc.png";

function App() {
  const [payload, setPayload] = useState(0);
  const [cnbc, setCnbc] = useState(0);
  const redditData = () => {
    fetch("http://localhost:8000/finance/")
      .then((response) => response.json())
      .then((data) => setPayload(data));
  };

  const cnbcData = () => {
    fetch("http://localhost:8000/coding/")
      .then((response) => response.json())
      .then((data) => setCnbc(data));
  };
  console.log(cnbc);
  console.log(payload);

  return (
    <div className="container">
      <div className="card">
        <div className="reddit-image">
          <img className="reddit" src={image} onClick={redditData} />
        </div>
        <div className="cnbc-image">
          <img className="cnbc" src={Cnbc} onClick={cnbcData} />
        </div>
        <br />

        {payload
          ? payload.map((item) => (
              <>
                <Card variant="outlined" sx={{ maxWidth: 275 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 10 }}
                      color="text.secondary"
                      gutterBottom
                    ></Typography>
                    <Typography variant="h7" component="div">
                      <a href={item.url}>{item.title}</a>{" "}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      r/{item.subreddit}{" "}
                    </Typography>
                    <Typography variant="body2"></Typography>
                  </CardContent>
                </Card>
              </>
            ))
          : " "}

        {cnbc
          ? cnbc.map((item) => (
              <>
                <Card variant="outlined" sx={{ maxWidth: 275 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 10 }}
                      color="text.secondary"
                      gutterBottom
                    ></Typography>
                    <Typography variant="h7" component="div">
                      <a href={item.url}>{item.title}</a>{" "}
                    </Typography>
                    <Typography
                      sx={{ mb: 1.5 }}
                      color="text.secondary"
                    ></Typography>
                    <Typography variant="body2"></Typography>
                  </CardContent>
                </Card>
              </>
            ))
          : " "}
      </div>
    </div>
  );
}

export default App;
