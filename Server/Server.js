const express = require("express");
const axios = require("axios");
const app = express();

const port = 5000;
let metroInfo = [];

const getSubwayAPI = () => {
  axios
    .get(
      `http://swopenAPI.seoul.go.kr/api/subway/79684b6576737061363475626f6853/json/realtimeStationArrival/0/5/${encodeURI(
        "화전"
      )}`
    )
    .then((res) => {
      metroInfo = res.data.realtimeArrivalList;
      console.log(metroInfo);
    })
    .catch(function (error) {
      console.log(error);
    });
  return getSubwayAPI;
};

setInterval(getSubwayAPI(), 90000);

app.get("/api/subway", (req, res) => {
  res.send(metroInfo);
});

app.listen(port, () => console.log(`server running at port ${port}`));
