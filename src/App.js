import React, { useState, useEffect } from "react";
import axios from "axios";
import Info from "./Components/Info";
import "./main.css";

function App() {
  // 이스터에그를 위한 카운터 횟수 상태
  const [count, addCounter] = useState(0);
  // 로딩 상태 -> 이게 과연 필요한가?
  const [metroInfo, setMetroInfo] = useState([]);
  const [isWorking, checkIsWorking] = useState(true);
  const [updateTime, setUpdateTime] = useState(new Date().toLocaleTimeString());
  // 지하철 정보 최초 렌더링 시에만 fetch

  // setLoading 과 axios 동작순서 보장하기 위해 async 사용
  const axiosAsync = async () => {
    await axios
      .get("/api/subway")
      .then((res) => {
        console.log(res.data);
        if (res.data === null) {
          checkIsWorking(false);
        }
        setMetroInfo(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setUpdateTime(new Date().toLocaleTimeString());
  };

  // 그러나, 위의 async 함수는 언제나 프로미스를 반환함.
  // -> 지하철 정보를 불러오는 함수가 스스로를 반환할 수 있도록
  // async 함수를 감싸는 함수를 새로 하나 만들어서 스스로를 반환하게 함.
  const getSubwayAPI = () => {
    axiosAsync();
    return getSubwayAPI;
  };

  useEffect(() => {
    if (count === 5) {
      let today = new Date();
      console.log(today);
      alert(`소학 파이팅! >__<!`);
    }
    // 인터벌 내에 함수 1회 즉시 호출, 이후 75초 주기
    const intervalID = setInterval(getSubwayAPI(), 30000);
    // 클린업 함수 -> 언마운트 혹은 업데이트 직전에 수행할 작업
    return () => clearInterval(intervalID);
  }, [count]);

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
        <div>🚝 경의선아 어디있니!</div>
      </header>
      <Info data={metroInfo}></Info>
      <div className="version">Ver 1.0.0</div>
      <div className="updateTime">최종 업데이트 시간 : {updateTime}</div>
      <div className="caution">
        해당 정보는 서울시 열린데이터광장 공공데이터를 활용한 것으로, 실제와는
        약간의 차이가 있을 수도 있습니다.
      </div>
    </div>
  );
}

export default App;
