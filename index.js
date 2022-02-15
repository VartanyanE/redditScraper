const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const coding_subs = [
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

coding_subs.forEach((sub) => {
  axios
    .get(sub.address)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(`.SQnoC3ObvgnGjWt90zD9Z `, html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");

        coding.push({
          title,
          url: sub.base + url,
          subreddit: sub.name,
        });
      });
    })
    .catch((err) => console.log(err));
});

const coding = [];
app.get("/", (req, res) => {
  res.json("Welcome");
});

app.get("/coding", (req, res) => {
  res.json(coding);
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

app.listen(PORT, () => console.log(`${PORT} Dollaz `));
