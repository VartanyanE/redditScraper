import "./App.scss";
import { useState, createContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ResponsiveAppBar from "./components/AppBar";
import { SiteContext } from "./utils/SiteContext";
import axios from "axios";
import redditImage from "./assets/reddit-logo.png";
import cnbcImage from "./assets/cnbc.png";

function App() {
  const [site, setSite] = useState("");
  const [payload, setPayload] = useState([]);
  const [cnbc, setCnbc] = useState([]);
  const [crypto, setCrypto] = useState([-1]);
  const options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      "tiers[0]": "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "50",
      offset: "0",
    },
    headers: {
      "X-RapidAPI-Key": "3712cf1d6cmshb54d0c7fbc4a044p107200jsn8b9476230474",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  const pullData = () => {
    if (site === "Reddit") {
      fetch("https://financeeducation.herokuapp.com/finance/")
        .then((response) => response.json())
        .then((data) => setPayload(data));
    } else if (site === "CNBC") {
      fetch("https://financeeducation.herokuapp.com/coding/")
        .then((response) => response.json())
        .then((data) => setCnbc(data));
    } else if (site === "Crypto") {
      axios
        .request(options)
        .then(function (response) {
          setCrypto(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (site === "Reddit") {
      fetch("https://financeeducation.herokuapp.com/finance/")
        .then((response) => response.json())
        .then((data) => setPayload(data));
    } else if (site === "CNBC") {
      fetch("https://financeeducation.herokuapp.com/coding/")
        .then((response) => response.json())
        .then((data) => setCnbc(data));
    }
    axios
      .request(options)
      .then(function (response) {
        setCrypto(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [site]);
  console.log(payload);
  console.log(cnbc);
  console.log(crypto.data);

  return (
    <SiteContext.Provider value={{ site, setSite }}>
      <div className="container">
        <div className="">
          <ResponsiveAppBar data={pullData} />
          {crypto != -1 ? (
            <div>
              {crypto.data.coins[0].name}
              <br />
              {crypto.data.coins[0].price}
              <br />
              {crypto.data.coins[1].name}
              <br />
              {crypto.data.coins[1].price}
              <br />
              {crypto.data.coins[7].name}
              <br />
              {crypto.data.coins[7].price}
              <br />
              {crypto.data.coins[24].name}
              <br />
              {crypto.data.coins[24].price}
            </div>
          ) : (
            ""
          )}
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
                        <img
                          src={redditImage}
                          style={{ height: "30px", width: "30px" }}
                        />{" "}
                        <br />
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
                  <Card variant="outlined" className="cnbc">
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 10 }}
                        color="text.secondary"
                        gutterBottom
                      ></Typography>
                      <Typography variant="h7" component="div">
                        <img
                          src={cnbcImage}
                          style={{ height: "30px", width: "30px" }}
                        />{" "}
                        <br />
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
