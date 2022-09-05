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

const coindeskRoutes = [
  {
    name: "coindesk",
    address: "https://www.coindesk.com/",
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

const financeArray = [];

const coindeskArray = [];

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

coindeskRoutes.forEach((sub) => {
  axios
    .get(sub.address)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(`.card-titlestyles__CardTitleWrapper-sc-1ptmy9y-0 `, html).each(
        function () {
          const title = $(this).text();
          const url = $(this).attr("href");

          coindeskArray.push({
            title,
            url: `${"https://www.coindesk.com" + url}`,
          });
        }
      );
    })
    .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
  res.json("Welcome");
});

app.get("/coding", (req, res) => {
  res.json(codingArray);
});

app.get("/finance", (req, res) => {
  res.json(financeArray);
});

app.get("/coindesk", (req, res) => {
  res.json(coindeskArray);
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
