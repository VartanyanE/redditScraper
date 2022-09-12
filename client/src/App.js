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
import bitcoinImage from "./assets/bitcoin.png";
import ethereumImage from "./assets/ethereum.png";
import cardanoImage from "./assets/cardano.png";
import ethereumclassicImage from "./assets/ethereumclassic.png";
import coindeskImage from "./assets/coindesk.png";
import background from "./assets/background.mp4";

function App() {
  const [site, setSite] = useState("");
  const [payload, setPayload] = useState([]);
  const [cnbc, setCnbc] = useState([]);
  const [coindesk, setCoindesk] = useState([]);

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
    } else if (site === "Coindesk") {
      fetch("https://financeeducation.herokuapp.com/coindesk/")
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
    } else if (site === "Coindesk") {
      fetch("https://financeeducation.herokuapp.com/coindesk/")
        .then((response) => response.json())
        .then((data) => setCoindesk(data));
    }
    axios
      .request(options)
      .then(function (response) {
        setCrypto(response.data.data.coins);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [site]);
  console.log(payload);
  console.log(cnbc);
  console.log(crypto);

  return (
    <SiteContext.Provider value={{ site, setSite }}>
      <div className="container">
        <ResponsiveAppBar data={pullData} />
        <video autoPlay muted playsInline loop id="myVideo">
          <source src={background} type="video/mp4" />
        </video>
        {site === "Crypto"
          ? crypto.map((item) => (
              <div className="crypto">
                {item.rank} {item.name}-{" "}
                <strong style={{ color: "green" }}>${item.price}</strong>
              </div>
            ))
          : ""}
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
        <div className="main">
          {site === "Coindesk"
            ? coindesk.map((item) => (
                <Card variant="outlined" className="coindesk">
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 10 }}
                      color="text.secondary"
                      gutterBottom
                    ></Typography>
                    <Typography variant="h7" component="div">
                      <img
                        src={coindeskImage}
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
    </SiteContext.Provider>
  );
}

export default App;
