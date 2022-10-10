import "./App.scss";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ResponsiveAppBar from "./components/AppBar";
import { SiteContext } from "./utils/SiteContext";
import axios from "axios";
import redditImage from "./assets/reddit-logo.png";
import cnbcImage from "./assets/cnbc.png";
import backgroundImage from "./assets/background.png";
import coindeskImage from "./assets/coindesk.png";
import yahooImage from "./assets/yahoo.png";
import MoveStuffAround from "./components/Ticker";

function App() {
  const [site, setSite] = useState("");
  const [payload, setPayload] = useState([]);
  const [cnbc, setCnbc] = useState([]);
  const [coindesk, setCoindesk] = useState([]);
  const [background, setBackground] = useState(true);

  const [crypto, setCrypto] = useState([-1]);
  const [yahooData, setYahooData] = useState([-1]);

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

  const yahoo = {
    method: "GET",
    url: "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news",
    headers: {
      "X-RapidAPI-Key": "a55981e29amsh474209918c2f0eap1b8fb4jsn84b08394e42a",
      "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
    },
  };

  const pullData = () => {
    setBackground(false);

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
      // setBackground(false);

      axios
        .request(options)
        .then(function (response) {
          setCrypto(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else if (site === "Yahoo") {
      // setBackground(false);

      axios
        .request(yahoo)
        .then(function (response) {
          setYahooData(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else if (site === "Credit Score") {
      window.location.href = "https://www.creditkarma.com/";
    } else if (site === "Robinhood") {
      window.location.href = "https://www.robinhood.com/";
    } else if (site === "Chase") {
      window.location.href = "https://www.chase.com/";
    } else if (site === "American Express") {
      window.location.href = "https://www.americanexpress.com/";
    } else if (site === "Coinbase") {
      window.location.href = "https://www.coinbase.com/";
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
    } else if (site === "Credit Score") {
      window.location.href = "https://www.creditkarma.com/";
    } else if (site === "Robinhood") {
      window.location.href = "https://www.robinhood.com/";
    } else if (site === "Chase") {
      window.location.href = "https://www.chase.com/";
    } else if (site === "American Express") {
      window.location.href = "https://www.americanexpress.com/";
    } else if (site === "Coinbase") {
      window.location.href = "https://www.coinbase.com/";
    }
    axios
      .request(options)
      .then(function (response) {
        setCrypto(response.data.data.coins);
      })
      .catch(function (error) {
        console.error(error);
      });

    axios
      .request(yahoo)
      .then(function (response) {
        setYahooData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [site]);
  console.log(payload);
  console.log(cnbc);
  console.log(yahooData);

  return (
    <SiteContext.Provider value={{ site, setSite }}>
      <div className="container">
        <ResponsiveAppBar data={pullData} />

        {background ? (
          <div
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: 900,
            }}
          >
            {" "}
            g
          </div>
        ) : (
          ""
        )}

        {site === "Crypto"
          ? crypto.map((item) => (
              <div className="crypto">
                {item.rank} {item.name} ({item.symbol})-{" "}
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

        <div className="main">
          {site === "Yahoo"
            ? yahooData.map((item) => (
                <Card variant="outlined" className="yahoo">
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 10 }}
                      color="text.secondary"
                      gutterBottom
                    ></Typography>
                    <Typography variant="h7" component="div">
                      <img
                        src={yahooImage}
                        style={{ height: "30px", width: "30px" }}
                      />{" "}
                      <br />
                      <a href={item.link} target="_blank">
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
