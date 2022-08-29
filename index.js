const PORT = process.env.PORT || 8000;
import express from "express";
import axios from "axios";
import cheerio from "cheerio";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(cors());
const codingRoutes = [
  {
    name: "cnbc",
    address: "https://www.cnbc.com",
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
  {
    name: "funny",
    address: "https://www.reddit.com/r/funny/",
    base: "https://www.reddit.com",
  },
  {
    name: "standupcomedy",
    address: "https://www.reddit.com/r/standupcomedy/",
    base: "https://www.reddit.com",
  },
  {
    name: "dankmemes",
    address: "https://www.reddit.com/r/dankmemes/",
    base: "https://www.reddit.com",
  },
  {
    name: "jokes",
    address: "https://www.reddit.com/r/jokes/",
    base: "https://www.reddit.com",
  },
  {
    name: "funnyandsad",
    address: "https://www.reddit.com/r/funnyandsad/",
    base: "https://www.reddit.com",
  },
  {
    name: "comedycemetery",
    address: "https://www.reddit.com/r/comedycemetery/",
    base: "https://www.reddit.com",
  },
  {
    name: "funnyvideos",
    address: "https://www.reddit.com/r/funnyvideos/",
    base: "https://www.reddit.com",
  },
];

const newsRoutes = [
  {
    name: "news",
    address: "https://www.reddit.com/r/news/",
    base: "https://www.reddit.com",
  },
  {
    name: "conspiracy",
    address: "https://www.reddit.com/r/conspiracy/",
    base: "https://www.reddit.com",
  },
  {
    name: "politics",
    address: "https://www.reddit.com/r/politics/",
    base: "https://www.reddit.com",
  },
  {
    name: "worldnews",
    address: "https://www.reddit.com/r/worldnews/",
    base: "https://www.reddit.com",
  },
  {
    name: "conservative",
    address: "https://www.reddit.com/r/conservative/",
    base: "https://www.reddit.com",
  },
  {
    name: "democrats",
    address: "https://www.reddit.com/r/democrats/",
    base: "https://www.reddit.com",
  },
];

const musicRoutes = [
  {
    name: "music",
    address: "https://www.reddit.com/r/music/",
    base: "https://www.reddit.com",
  },
  {
    name: "letstalkmusic",
    address: "https://www.reddit.com/r/letstalkmusic/",
    base: "https://www.reddit.com",
  },
  {
    name: "hiphopheads",
    address: "https://www.reddit.com/r/hiphopheads/",
    base: "https://www.reddit.com",
  },
  {
    name: "guitar",
    address: "https://www.reddit.com/r/guitar/",
    base: "https://www.reddit.com",
  },
  {
    name: "electronicmusic",
    address: "https://www.reddit.com/r/electronicmusic/",
    base: "https://www.reddit.com",
  },
  {
    name: "spotify",
    address: "https://www.reddit.com/r/spotify/",
    base: "https://www.reddit.com",
  },
];

const memeRoutes = [
  {
    name: "meme",
    address: "https://www.reddit.com/r/meme/",
    base: "https://www.reddit.com",
  },
  {
    name: "memesofthedank",
    address: "https://www.reddit.com/r/memes_of_the_dank/",
    base: "https://www.reddit.com",
  },
  {
    name: "dankmemes",
    address: "https://www.reddit.com/r/dankmemes/",
    base: "https://www.reddit.com",
  },
  {
    name: "memes",
    address: "https://www.reddit.com/r/memes/",
    base: "https://www.reddit.com",
  },
  {
    name: "historymemes",
    address: "https://www.reddit.com/r/historymemes/",
    base: "https://www.reddit.com",
  },
  {
    name: "memeeconomy",
    address: "https://www.reddit.com/r/memeeconomy/",
    base: "https://www.reddit.com",
  },
];

const financeRoutes = [
  {
    name: "personalfinance",
    address: "https://www.reddit.com/r/personalfinance/",
    base: "https://www.reddit.com",
  },
  {
    name: "stocks",
    address: "https://www.reddit.com/r/stocks/",
    base: "https://www.reddit.com",
  },
  {
    name: "business",
    address: "https://www.reddit.com/r/business/",
    base: "https://www.reddit.com",
  },
  {
    name: "wallstreetbets",
    address: "https://www.reddit.com/r/wallstreetbets/",
    base: "https://www.reddit.com",
  },

  {
    name: "investing",
    address: "https://www.reddit.com/r/investing/",
    base: "https://www.reddit.com",
  },
];

const codingArray = [];
const sportsArray = [];
const cryptoArray = [];
const comedyArray = [];
const newsArray = [];
const musicArray = [];
const memeArray = [];
const financeArray = [];

codingRoutes.forEach((sub) => {
  axios
    .get(sub.address)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(`.LatestNews-headline `, html).each(function () {
        const title = $(this).last().text();
        const url = $(this).attr("href");

        codingArray.push({
          title,
          url,
          // subreddit: sub.name,
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

newsRoutes.forEach((sub) => {
  axios
    .get(sub.address)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(`.SQnoC3ObvgnGjWt90zD9Z `, html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");

        newsArray.push({
          title,
          url: sub.base + url,
          subreddit: sub.name,
        });
      });
    })
    .catch((err) => console.log(err));
});

musicRoutes.forEach((sub) => {
  axios
    .get(sub.address)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(`.SQnoC3ObvgnGjWt90zD9Z `, html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");

        musicArray.push({
          title,
          url: sub.base + url,
          subreddit: sub.name,
        });
      });
    })
    .catch((err) => console.log(err));
});

memeRoutes.forEach((sub) => {
  axios
    .get(sub.address)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(`.SQnoC3ObvgnGjWt90zD9Z `, html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");

        memeArray.push({
          title,
          url: sub.base + url,
          subreddit: sub.name,
        });
      });
    })
    .catch((err) => console.log(err));
});

financeRoutes.forEach((sub) => {
  axios
    .get(sub.address)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(`.SQnoC3ObvgnGjWt90zD9Z `, html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");

        financeArray.push({
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

app.get("/news", (req, res) => {
  res.json(newsArray);
});

app.get("/music", (req, res) => {
  res.json(musicArray);
});

app.get("/meme", (req, res) => {
  res.json(memeArray);
});

app.get("/finance", (req, res) => {
  res.json(financeArray);
});

app.get("/coding/:codingId", async (req, res) => {
  const codingId = req.params.codingId;

  const codingAddress = codingRoutes.filter((code) => code.name === codingId)[0]
    .address;

  const codingBase = codingRoutes.filter((code) => code.name == codingId)[0]
    .base;

  axios.get(codingAddress).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const specificArticles = [];

    $(`.SQnoC3ObvgnGjWt90zD9Z `, html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");
      specificArticles.push({
        title,
        url: codingBase + url,
        source: codingId,
      });
    });
    res.json(specificArticles);
  });
});

app.get("/sports/:sportsId", async (req, res) => {
  const sportsId = req.params.sportsId;

  const sportsAddress = sportsRoutes.filter(
    (sport) => sport.name === sportsId
  )[0].address;

  const sportsBase = sportsRoutes.filter((sport) => sport.name == sportsId)[0]
    .base;

  axios.get(sportsAddress).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const sportsPosts = [];

    $(`.SQnoC3ObvgnGjWt90zD9Z `, html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");
      sportsPosts.push({
        title,
        url: sportsBase + url,
        source: sportsId,
      });
    });
    res.json(sportsPosts);
  });
});

app.get("/crypto/:cryptoId", async (req, res) => {
  const cryptoId = req.params.cryptoId;

  const cryptoAddress = cryptoRoutes.filter(
    (crypto) => crypto.name === cryptoId
  )[0].address;

  const cryptoBase = cryptoRoutes.filter((crypto) => crypto.name == cryptoId)[0]
    .base;

  axios.get(cryptoAddress).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const cryptoPosts = [];

    $(`.SQnoC3ObvgnGjWt90zD9Z `, html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");
      cryptoPosts.push({
        title,
        url: cryptoBase + url,
        source: cryptoId,
      });
    });
    res.json(cryptoPosts);
  });
});

app.get("/comedy/:comedyId", async (req, res) => {
  const comedyId = req.params.comedyId;

  const comedyAddress = comedyRoutes.filter(
    (comedy) => comedy.name === comedyId
  )[0].address;

  const comedyBase = comedyRoutes.filter((comedy) => comedy.name == comedyId)[0]
    .base;

  axios.get(comedyAddress).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const comedyPosts = [];

    $(`.SQnoC3ObvgnGjWt90zD9Z `, html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");
      comedyPosts.push({
        title,
        url: comedyBase + url,
        source: comedyId,
      });
    });
    res.json(comedyPosts);
  });
});

app.get("/news/:newsId", async (req, res) => {
  const newsId = req.params.newsId;

  const newsAddress = newsRoutes.filter((news) => news.name === newsId)[0]
    .address;

  const newsBase = newsRoutes.filter((news) => news.name == newsId)[0].base;

  axios.get(newsAddress).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const newsPosts = [];

    $(`.SQnoC3ObvgnGjWt90zD9Z `, html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");
      newsPosts.push({
        title,
        url: newsBase + url,
        source: newsId,
      });
    });
    res.json(newsPosts);
  });
});

app.get("/music/:musicId", async (req, res) => {
  const musicId = req.params.musicId;

  const musicAddress = musicRoutes.filter((music) => music.name === musicId)[0]
    .address;

  const musicBase = musicRoutes.filter((music) => music.name == musicId)[0]
    .base;

  axios.get(musicAddress).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const musicPosts = [];

    $(`.SQnoC3ObvgnGjWt90zD9Z `, html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");
      musicPosts.push({
        title,
        url: musicBase + url,
        source: musicId,
      });
    });
    res.json(musicPosts);
  });
});

app.get("/meme/:memeId", async (req, res) => {
  const memeId = req.params.memeId;

  const memeAddress = memeRoutes.filter((meme) => meme.name === memeId)[0]
    .address;

  const memeBase = memeRoutes.filter((meme) => meme.name == memeId)[0].base;

  axios.get(memeAddress).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const memePosts = [];

    $(`.SQnoC3ObvgnGjWt90zD9Z `, html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");
      memePosts.push({
        title,
        url: memeBase + url,
        source: memeId,
      });
    });
    res.json(memePosts);
  });
});

app.get("/finance/:financeId", async (req, res) => {
  const financeId = req.params.financeId;

  const financeAddress = financeRoutes.filter(
    (finance) => finance.name === financeId
  )[0].address;

  const financeBase = financeRoutes.filter(
    (finance) => finance.name == financeId
  )[0].base;

  axios.get(financeAddress).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const financePosts = [];

    $(`.SQnoC3ObvgnGjWt90zD9Z `, html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");
      financePosts.push({
        title,
        url: financeBase + url,
        source: financeId,
      });
    });
    res.json(financePosts);
  });
});

app.listen(PORT, () => console.log(`PORT ${PORT} Dollaz `));
