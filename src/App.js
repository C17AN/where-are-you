import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Components/Loading";
import Info from "./Components/Info";
import "./main.css";

let count = 0;

function App() {
  // 이스터에그를 위한 카운터 횟수 상태
  const [count, addCounter] = useState(0);
  // 로딩 상태 -> 이게 과연 필요한가?
  const [isLoading, setLoading] = useState(true);
  const [metroInfo, setMetroInfo] = useState([]);
  // 지하철 정보 최초 렌더링 시에만 fetch
  useEffect(() => {
    if (count === 5) {
      let today = new Date();
      console.log(today);
      alert(`서프라이즈!!`);
    }
    const intervalID = setInterval(() => {
      axios
        .get("/api/subway")
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, 5000);
    setLoading(false);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="container">
      <div
        onClick={() => {
          addCounter(count + 1);
          console.log(count);
        }}
        className="easter-egg"
      >
        {">__<!"}
      </div>
      <header className="main-header">
        <div>경의선아 어디있니!</div>
      </header>
      {isLoading ? (
        <div className="loader">
          <span className="loader_text">Loading...</span>
        </div>
      ) : (
        <Info data={[metroInfo]}></Info>
      )}
      <div className="version">Ver 1.0.0</div>
      <div className="caution">
        해당 정보는 서울시 열린데이터광장 공공데이터를 사용한 것으로, 실제와는
        약간의 차이가 있을 수도 있습니다.
      </div>
    </div>
  );
}

export default App;
