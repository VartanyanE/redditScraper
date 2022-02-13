const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const coding_subs = [
  {
    name: "r/webdev",
    address: "https://www.reddit.com/r/webdev/",
    base: "https://www.reddit.com",
  },
  {
    name: "r/programming",
    address: "https://www.reddit.com/r/programming/",
    base: "https://www.reddit.com",
  },
  {
    name: "r/code",
    address: "https://www.reddit.com/r/code/",
    base: "https://www.reddit.com",
  },
  {
    name: "r/computer_science",
    address: "https://www.reddit.com/r/computerscience/",
    base: "https://www.reddit.com",
  },
  {
    name: "r/coding",
    address: "https://www.reddit.com/r/coding/",
    base: "https://www.reddit.com",
  },
  {
    name: "r/javascript",
    address: "https://www.reddit.com/r/javascript/",
    base: "https://www.reddit.com",
  },
  {
    name: "r/c#",
    address: "https://www.reddit.com/r/csharp/",
    base: "https://www.reddit.com",
  },
  {
    name: "r/python",
    address: "https://www.reddit.com/r/python/",
    base: "https://www.reddit.com",
  },
  {
    name: "r/node",
    address: "https://www.reddit.com/r/node/",
    base: "https://www.reddit.com",
  },
  {
    name: "r/java",
    address: "https://www.reddit.com/r/java/",
    base: "https://www.reddit.com",
  },

  //   {
  //     name: "telegraph",
  //     address: "https://www.telegraph.co.uk/climate-change",
  //     base: "https://www.telegraph.co.uk",
  //   },
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

        stories.push({
          title,
          url: sub.base + url,
          subreddit: sub.name,
        });
      });
    })
    .catch((err) => console.log(err));
});

const stories = [];
app.get("/", (req, res) => {
  res.json("Welcome");
});

app.get("/coding", (req, res) => {
  res.json(stories);
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
