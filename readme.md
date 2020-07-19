### 🚄 [공공데이터를 활용한 화전역 실시간 전철정보 알림앱]

### 🤖 사용 기술 : React, Axios, Express, Node.js, Heroku

### 🏨 배포 주소 : [https://hwajeon-station-tracker.herokuapp.com/](https://hwajeon-station-tracker.herokuapp.com/)

### 💻 서비스 화면 : 

---

<img src = "/result.jpg" width = "400"/>

---

### 📫 활용 API : [서울시 공공데이터 포털](https://data.seoul.go.kr/dataList/OA-12764/F/1/datasetView.do)

---

### 🚨 특이사항   

- 공공데이터 자체가 부정확한 경우가 <u><b>꽤 많음</b></u>. **(다만 3 ~ 4전역 내외 열차 정보는 거의 정확한 편)**      
- 열차의 진입 정보가 8전역 이상일 경우에는 수신이 누락된 이전시간 열차정보가 있을 수도 있음! **(보통 이 경우에는 다음 갱신주기에 갱신됨)**   
- 서버의 데이터 갱신 주기는 <b>75</b>초이며, 이로 인해 화면에서 "전역 도착, 화전 접근" 등 메시지가 보일 경우에는 이미 열차가 들어오거나 근소한 차이로 떠난 상태일 수도 있음!   
- 서버는 1시 ~ 5시 사이에는 동작하지 않음. **(API 호출횟수 및 헤로쿠 Dyno hour 절약 의도)**   
- 이스터에그가 하나 숨어 있으니, 꼭 발견하는 걸 추천 >__<!!!
