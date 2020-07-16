const express = require("express");
const axios = require("axios");
const app = express();

const port = 5000;

axios
  .get(
    "http://swopenAPI.seoul.go.kr/api/subway/79684b6576737061363475626f6853/json/realtimeStationArrival/0/5/화전"
  )
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch(function (error) {
    console.log(error);
  });

app.get("/api/subway", (req, res) => {
  console.log("hello!");
  res.send("hello!");
});

app.listen(port, () => console.log(`server running at port ${port}`));
