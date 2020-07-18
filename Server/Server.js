const express = require("express");
const axios = require("axios");
const http = require("http");
const app = express();

const port = 5000;
let metroInfo = [];

let currentTime = new Date().getHours();
const getSubwayAPI = () => {
  // 1 ~ 5시에는 서버 돌리지 않음으로
  // api 호출 수를 아낄 수 있음. (1일 1000회 제한)
  // -> 결국 갱신 주기를 줄일 수 있음!
  if (currentTime >= 1 && currentTime <= 5) {
    console.log("Server is Dead");
    return getSubwayAPI;
  }
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
// 20시간 풀로 돌렸을때 => 72000초
// 최대 요청건수 = 1000건
// 72초에 한번 요청하면 얼추 1000건 맞으니까 조금 여유있게 75초마다 갱신함
setInterval(getSubwayAPI(), 75000);
startKeepAlive();

app.get("/api/subway", (req, res) => {
  res.send(metroInfo);
});

app.listen(port, () => console.log(`server running at port ${port}`));

function startKeepAlive() {
  setInterval(function () {
    const options = {
      host: "hwajeon-station-tracker.herokuapp.com",
      port: 80,
      path: "/",
    };
    http
      .get(options, function (res) {
        res.on("data", function (chunk) {
          try {
            // optional logging... disable after it's working
            console.log("HEROKU RESPONSE: " + chunk);
          } catch (err) {
            console.log(err.message);
          }
        });
      })
      .on("error", function (err) {
        console.log("Error: " + err.message);
      });
  }, 20 * 60 * 1000); // load every 20 minutes
}
