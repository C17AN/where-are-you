import React, { useState, useEffect } from "react";
import "./main.css";

const Info = () => {
  return (
    <section className="content-container">
      <div className="content-title"></div>
      <div className="metro-direction">서울역 방면</div>
      <div className="metro-position">현재위치 : 2전역 도착</div>
      <div className="estimated-time-arrival">예상시간 : 7분</div>
      <div className="metro-direction">문산 방면 (홍대입구 방향)</div>
      <div className="metro-position">현재위치 : 전역 출발</div>
      <div className="estimated-time-arrival">예상시간 : 4분</div>
      <div className="metro-direction">용문 방면 (행신 방향)</div>
      <div className="metro-position">현재위치 : 3전역 도착</div>
      <div className="estimated-time-arrival">예상시간 : 14분</div>
      <hr />
    </section>
  );
};

export default Info;
