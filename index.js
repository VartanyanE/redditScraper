const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const codingRoutes = [
  {
    name: "webdev",
    address: "https://www.reddit.com/r/webdev/",
    base: "https://www.reddit.com",
  },
  {
    name: "programming",
    address: "https://www.reddit.com/r/programming/",
    base: "https://www.reddit.com",
  },
  {
    name: "code",
    address: "https://www.reddit.com/r/code/",
    base: "https://www.reddit.com",
  },
  {
    name: "computer_science",
    address: "https://www.reddit.com/r/computerscience/",
    base: "https://www.reddit.com",
  },
  {
    name: "coding",
    address: "https://www.reddit.com/r/coding/",
    base: "https://www.reddit.com",
  },
  {
    name: "javascript",
    address: "https://www.reddit.com/r/javascript/",
    base: "https://www.reddit.com",
  },
  {
    name: "c#",
    address: "https://www.reddit.com/r/csharp/",
    base: "https://www.reddit.com",
  },
  {
    name: "python",
    address: "https://www.reddit.com/r/python/",
    base: "https://www.reddit.com",
  },
  {
    name: "node",
    address: "https://www.reddit.com/r/node/",
    base: "https://www.reddit.com",
  },
  {
    name: "java",
    address: "https://www.reddit.com/r/java/",
    base: "https://www.reddit.com",
  },
  {
    name: "technology",
    address: "https://www.reddit.com/r/technology/",
    base: "https://www.reddit.com",
  },
  {
    name: "html",
    address: "https://www.reddit.com/r/html/",
    base: "https://www.reddit.com",
  },
  {
    name: "css",
    address: "https://www.reddit.com/r/css/",
    base: "https://www.reddit.com",
  },
  {
    name: "daily_programmer",
    address: "https://www.reddit.com/r/dailyprogrammer/",
    base: "https://www.reddit.com",
  },
];

const sportsRoutes = [
  {
    name: "nfl",
    address: "https://www.reddit.com/r/nfl/",
    base: "https://www.reddit.com",
  },
  {
    name: "nba",
    address: "https://www.reddit.com/r/nba/",
    base: "https://www.reddit.com",
  },
  {
    name: "soccer",
    address: "https://www.reddit.com/r/soccer/",
    base: "https://www.reddit.com",
  },
  {
    name: "hockey",
    address: "https://www.reddit.com/r/hockey/",
    base: "https://www.reddit.com",
  },
  {
    name: "baseball",
    address: "https://www.reddit.com/r/baseball/",
    base: "https://www.reddit.com",
  },
  {
    name: "golf",
    address: "https://www.reddit.com/r/golf/",
    base: "https://www.reddit.com",
  },
  {
    name: "sports",
    address: "https://www.reddit.com/r/sports/",
    base: "https://www.reddit.com",
  },
  {
    name: "premierLeague",
    address: "https://www.reddit.com/r/premierleague/",
    base: "https://www.reddit.com",
  },
  {
    name: "formula1",
    address: "https://www.reddit.com/r/formula1/",
    base: "https://www.reddit.com",
  },
];

const cryptoRoutes = [
  {
    name: "crypto",
    address: "https://www.reddit.com/r/crypto/",
    base: "https://www.reddit.com",
  },
  {
    name: "crypto_currency_news",
    address: "https://www.reddit.com/r/crypto_currency_news/",
    base: "https://www.reddit.com",
  },
  {
    name: "cryptocurrencies",
    address: "https://www.reddit.com/r/cryptocurrencies/",
    base: "https://www.reddit.com",
  },
  {
    name: "shibarmy",
    address: "https://www.reddit.com/r/shibarmy/",
    base: "https://www.reddit.com",
  },
  {
    name: "cryptomoonshots",
    address: "https://www.reddit.com/r/cryptomoonshots/",
    base: "https://www.reddit.com",
  },
  {
    name: "bitcoin",
    address: "https://www.reddit.com/r/bitcoin/",
    base: "https://www.reddit.com",
  },
  {
    name: "dogecoin",
    address: "https://www.reddit.com/r/dogecoin/",
    base: "https://www.reddit.com",
  },
  {
    name: "ethereum",
    address: "https://www.reddit.com/r/ethereum/",
    base: "https://www.reddit.com",
  },
];

const comedyRoutes = [
  {
    name: "comedyheaven",
    address: "https://www.reddit.com/r/comedyheaven/",
    base: "https://www.reddit.com",
  },
  // {
  //   name: "crypto_currency_news",
  //   address: "https://www.reddit.com/r/crypto_currency_news/",
  //   base: "https://www.reddit.com",
  // },
  // {
  //   name: "cryptocurrencies",
  //   address: "https://www.reddit.com/r/cryptocurrencies/",
  //   base: "https://www.reddit.com",
  // },
  // {
  //   name: "shibarmy",
  //   address: "https://www.reddit.com/r/shibarmy/",
  //   base: "https://www.reddit.com",
  // },
  // {
  //   name: "cryptomoonshots",
  //   address: "https://www.reddit.com/r/cryptomoonshots/",
  //   base: "https://www.reddit.com",
  // },
  // {
  //   name: "bitcoin",
  //   address: "https://www.reddit.com/r/bitcoin/",
  //   base: "https://www.reddit.com",
  // },
  // {
  //   name: "dogecoin",
  //   address: "https://www.reddit.com/r/dogecoin/",
  //   base: "https://www.reddit.com",
  // },
  // {
  //   name: "ethereum",
  //   address: "https://www.reddit.com/r/ethereum/",
  //   base: "https://www.reddit.com",
  // },
];

const codingArray = [];
const sportsArray = [];
const cryptoArray = [];
const comedyArray = [];

codingRoutes.forEach((sub) => {
  axios
    .get(sub.address)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(`.SQnoC3ObvgnGjWt90zD9Z `, html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");

        codingArray.push({
          title,
          url: sub.base + url,
          subreddit: sub.name,
        });
      });
    })
    .catch((err) => console.log(err));
});

sportsRoutes.forEach((sub) => {
  axios
    .get(sub.address)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(`.SQnoC3ObvgnGjWt90zD9Z `, html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");

        sportsArray.push({
          title,
          url: sub.base + url,
          subreddit: sub.name,
        });
      });
    })
    .catch((err) => console.log(err));
});

cryptoRoutes.forEach((sub) => {
  axios
    .get(sub.address)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(`.SQnoC3ObvgnGjWt90zD9Z `, html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");

        cryptoArray.push({
          title,
          url: sub.base + url,
          subreddit: sub.name,
        });
      });
    })
    .catch((err) => console.log(err));
});

comedyRoutes.forEach((sub) => {
  axios
    .get(sub.address)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(`.SQnoC3ObvgnGjWt90zD9Z `, html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");

        comedyArray.push({
          title,
          url: sub.base + url,
          subreddit: sub.name,
        });
      });
    })
    .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
  res.json("Welcome");
});

app.get("/coding", (req, res) => {
  res.json(codingArray);
});

app.get("/sports", (req, res) => {
  res.json(sportsArray);
});

app.get("/crypto", (req, res) => {
  res.json(cryptoArray);
});

app.get("/comedy", (req, res) => {
  res.json(comedyArray);
});

// app.get("/news/:newspaperId", async (req, res) => {
//   const newspaperId = req.params.newspaperId;

//   const newspaperAddress = newspapers.filter(
//     (newspaper) => newspaper.name === newspaperId
//   )[0].address;

//   const newspaperBase = newspapers.filter(
//     (newspaper) => newspaper.name == newspaperId
//   )[0].base;

//   axios.get(newspaperAddress).then((response) => {
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const specificArticles = [];

//     $(`a:contains("climate")`, html).each(function () {
//       const title = $(this).text();
//       const url = $(this).attr("href");
//       specificArticles.push({
//         title,
//         url: newspaperBase + url,
//         source: newspaperId,
//       });
//     });
//     res.json(specificArticles);
//   });
// });

app.listen(PORT, () => console.log(`PORT ${PORT} Dollaz `));
