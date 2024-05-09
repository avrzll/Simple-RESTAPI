const express = require("express");
const axios = require("axios")
const cheerio = require("cheerio")

const app = express();
app.use(express.json());

app.get("/", (req, res) => { 
  try {
    res.status(200).send({
      status: true,
      msg: "Selamat datang di REST API YOGSSTORE",
      creator: "https://www.instagram.com/avrzll_",
      services: [
        { name: "Cek ID Games", url: "/cekidgame" },
        { name: "Cek Nama Dompet Digital", url: "/cekdompetdigital" }
      ]
    })
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
    res.status(500).send({
      status: false,
      msg: `Terjadi kesalahan ${error.message}`
    });
  }
})

app.get("/cekidgame", (req, res) => {
  try {
    res.send({
      status: true,
      msg: "Gunakan API seperlunya.",
      creator: "https://www.instagram.com/avrzll_",
      games: [
        {
          name: "Free Fire",
          endpoint: "/free-fire/?id=1685084111",
          method: "GET"
        },
        {
          name: "Mobile Legends",
          endpoint: "Cooming Soon",
          method: "Cooming Soon"
        },
        {
          name: "PUBG Mobile",
          endpoint: "Cooming Soon",
          method: "Cooming Soon"
        }
      ]
    });
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
    res.status(500).send({
      status: false,
      msg: `Terjadi kesalahan ${error.message}`
    });
  }
  });

  app.get("/cekdompetdigital", (req, res) => {
    try {
      res.send({
        status: true,
        msg: "Cooming Soon",
        creator: "https://www.instagram.com/avrzll_"
      });
    } catch (error) {
      console.error("Terjadi kesalahan:", error.message);
      res.status(500).send({
        status: false,
        msg: `Terjadi kesalahan ${error.message}`
      });
    }
    });

app.get("/cekidgame/free-fire", async (req, res) => {
  try {
    const { id } = req.query;

    const { data } = await axios.post(
      "https://duniatopupgames.com/games/order/get-detail/66",
      {
        user_id: id,
        zone_id: "1",
        method: "balance",
        wa: "085174422041",
        voucher: ""
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }
    );

    const idResult = data.msg;

    if (data.status) {
      const $ = cheerio.load(idResult);
      const username = $("table > tbody > tr:nth-child(3) > td:nth-child(3)").text();
      res.status(200).send({
        status: true,
        msg: "Username ditemukan!",
        result: username,
        creator: "https://www.instagram.com/avrzll_"
      });
    } else {
      res.status(200).send({
        status: false,
        msg: "Username tidak ditemukan!",
        creator: "https://www.instagram.com/avrzll_"
      });
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
    res.status(500).send({
      status: false,
      msg: `Terjadi kesalahan ${error.message}`
    });
  }
});

  
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});