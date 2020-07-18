import React, { useState, useEffect } from "react";
import "./main.css";

const Info = (metroInfo) => {
  console.log(metroInfo);
  const [seoulLineData, setSeoulLineData] = useState([]);
  const [upperLineData, setUpperLineData] = useState([]);
  const [lowerLineData, setLowerLineData] = useState([]);
  const [seoulMessage, setSeoulMessage] = useState("");
  const [upperMessage, setUpperMessage] = useState("");
  const [lowerMessage, setLowerMessage] = useState("");
  // 지하철 정보를 불러온 결과가 업데이트되면 (90초마다)
  // useEffect 업데이트
  useEffect(() => {
    console.log("Info update");

    const dataArray = metroInfo.data;
    dataArray.forEach((data) => {
      if (data.bstatnNm === "서울") {
        setSeoulLineData(data);
      }
    });
    // 이건 급행 안섬 (문산행 == 상행)
    setUpperLineData(
      dataArray.filter(
        (data) => data.updnLine === "상행" && data.btrainSttus !== "급행"
      )
    );
    // 이건 급행 섬 (용문행 == 하행)
    setLowerLineData(
      dataArray.filter(
        (data) => data.updnLine === "하행" && data.bstatnNm !== "서울"
      )
    );
    return () => {};
  }, [metroInfo]);

  // useEffect 를 두개 사용한 이유 :
  // useState로 상태 변경한다고 해서 그게 곧바로 적용되는게 아님.
  // 따라서 위의 노선 상태가 렌더링 후 업데이트 "완료" 될시 다음 useEffect 동작을 수행하게 해야함.
  // 만약 아래 코드를 위 useEffect 에 그대로 넣을 시
  // 사용자는 "데이터가 없습니다!" 라는 메시지만 보게 됨.
  useEffect(() => {
    console.log("Line update");
    setSeoulMessage(
      seoulLineData.length === 0
        ? "데이터가 없습니다!"
        : `현재 위치 : ${seoulLineData.arvlMsg2}`
    );
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
  }, [seoulLineData, upperLineData, lowerLineData]);
  console.log("서울행", seoulLineData);
  console.log(seoulMessage);
  console.log("상행, 문산행", upperLineData);
  console.log(upperMessage);
  console.log("하행, 용문행", lowerLineData);
  console.log(lowerMessage);
  // 용문행은 급행 섬!
  // 문산, 서울역 X
  return (
    <section className="content-container">
      <div className="content-title"></div>
      <div className="metro-direction">서울역 방면</div>
      <div className="metro-position">{`${seoulMessage}`}</div>
      <div className="estimated-time-arrival">예상시간 : -</div>
      <div className="metro-direction">문산 방면 (행신 방향)</div>
      <div className="metro-position">{`${upperMessage}`}</div>
      <div className="estimated-time-arrival">예상시간 : -</div>
      <div className="metro-direction">용문 방면 (홍대입구 방향)</div>
      <div className="metro-position">{`${lowerMessage}`}</div>
      <div className="estimated-time-arrival">예상시간 : -</div>
      <hr />
    </section>
  );
};

export default Info;
