import "./App.scss";
import { useState, createContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ResponsiveAppBar from "./components/AppBar";
import { SiteContext } from "./utils/SiteContext";

function App() {
  const [site, setSite] = useState("");
  const [payload, setPayload] = useState([]);
  const [cnbc, setCnbc] = useState([]);

  const pullData = () => {
    if (site === "Reddit") {
      fetch("http://localhost:8000/finance/")
        .then((response) => response.json())
        .then((data) => setPayload(data));
    } else if (site === "CNBC") {
      fetch("http://localhost:8000/coding/")
        .then((response) => response.json())
        .then((data) => setCnbc(data));
    }
  };

  useEffect(() => {
    if (site === "Reddit") {
      fetch("http://localhost:8000/finance/")
        .then((response) => response.json())
        .then((data) => setPayload(data));
    } else if (site === "CNBC") {
      fetch("http://localhost:8000/coding/")
        .then((response) => response.json())
        .then((data) => setCnbc(data));
    }
  }, [site]);
  console.log(payload);
  console.log(cnbc);

  return (
    <SiteContext.Provider value={{ site, setSite }}>
      <div className="container">
        <div className="">
          <ResponsiveAppBar data={pullData} />

          <div className="main">
            {site === "Reddit"
              ? payload.map((item) => (
                  <Card className="main" variant="outlined">
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 10 }}
                        color="text.secondary"
                        gutterBottom
                      ></Typography>
                      <Typography variant="h7" component="div">
                        <a href={item.url} target="_blank">
                          {item.title} r/{item.subreddit}
                        </a>{" "}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              : " "}
          </div>

          <div className="main">
            {site === "CNBC"
              ? cnbc.map((item) => (
                  <Card variant="outlined">
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 10 }}
                        color="text.secondary"
                        gutterBottom
                      ></Typography>
                      <Typography variant="h7" component="div">
                        <a href={item.url} target="_blank">
                          {item.title}
                        </a>{" "}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              : " "}
          </div>
        </div>
      </div>
    </SiteContext.Provider>
  );
}

export default App;
