import React, { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";

const Info = (metroInfo) => {
  console.log(metroInfo);
  const [upperLineData, setUpperLineData] = useState([]);
  const [lowerLineData, setLowerLineData] = useState([]);
  const [upperMessage, setUpperMessage] = useState("");
  const [lowerMessage, setLowerMessage] = useState("");
  const dataArray = metroInfo.data;
  useEffect(() => {
    setUpperLineData(dataArray.filter((data) => data.updnLine === "상행"));
    setLowerLineData(dataArray.filter((data) => data.updnLine === "하행"));
    return () => {};
  }, []);

  useEffect(() => {
    setUpperMessage(
      upperLineData.length === 0
        ? "데이터가 없습니다!"
        : `현재 위치 : ${upperLineData[0].arvlMsg2}`
    );
    setLowerMessage(
      lowerLineData.length === 0
        ? "데이터가 없습니다!"
        : `현재 위치 : ${lowerLineData[0].arvlMsg2}`
    );
    return () => {};
  }, [upperLineData, lowerLineData]);
  console.log(upperLineData);
  console.log(upperMessage);
  console.log(lowerLineData);
  console.log(lowerMessage);
  // 용문행은 급행 섬!
  // 문산, 서울역 X
  return (
    <section className="content-container">
      <div className="content-title"></div>
      <div className="metro-direction">서울역 방면</div>
      <div className="metro-position">{}</div>
      <div className="estimated-time-arrival">예상시간 : 7분</div>
      <div className="metro-direction">문산 방면 (홍대입구 방향)</div>
      <div className="metro-position">{`${upperMessage}`}</div>
      <div className="estimated-time-arrival">예상시간 : -</div>
      <div className="metro-direction">용문 방면 (행신 방향)</div>
      <div className="metro-position">{`${lowerMessage}`}</div>
      <div className="estimated-time-arrival">예상시간 : -</div>
      <hr />
    </section>
  );
};

export default Info;
