import React, { useState, useEffect } from "react";
import "./main.css";

const Info = (metroInfo) => {
  console.log(metroInfo);
  const [seoulLineData, setSeoulLineData] = useState([]);
  const [upperLineData, setUpperLineData] = useState([]);
  const [nextUpperLineData, setNextUpperLineData] = useState([]);
  const [lowerLineData, setLowerLineData] = useState([]);
  const [nextLowerLineData, setNextLowerLineData] = useState([]);
  const [seoulMessage, setSeoulMessage] = useState("");
  const [upperMessage, setUpperMessage] = useState("");
  const [lowerMessage, setLowerMessage] = useState("");
  // 지하철 정보를 불러온 결과가 업데이트되면 (90초마다)
  // useEffect 업데이트
  useEffect(() => {
    console.log("Info update");

    const dataArray = metroInfo.data;
    dataArray.forEach((data) => {
      if (data.bstatnNm === "서울" || data.bstatnNm === "서울 (막차)") {
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
        (data) =>
          data.updnLine === "하행" &&
          data.bstatnNm !== "서울" &&
          data.bstatnNm !== "서울 (막차)"
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
        ? "현재 운행중인 차량이 없습니다!"
        : // 정규표현식 - [2] -> 2 로 양옆 대괄호 제거함
          `현재 위치 : ${seoulLineData.arvlMsg2.replace(/[[\]]/g, "")}`
    );
    switch (upperLineData.length) {
      case 0:
        setUpperMessage("현재 운행중인 차량이 없습니다!");
        break;
      case 1:
        setUpperMessage([
          `현재 위치 : ${upperLineData[0].arvlMsg2.replace(/[[\]]/g, "")}`,
          `다음 차량정보가 없습니다.`,
        ]);
        break;
      case 2:
        setUpperMessage([
          `현재 위치 : ${upperLineData[0].arvlMsg2.replace(/[[\]]/g, "")}`,
          `다음 차량 : ${upperLineData[1].arvlMsg2.replace(/[[\]]/g, "")}`,
        ]);
        break;
      default:
        setUpperMessage([
          `현재 위치 : ${upperLineData[0].arvlMsg2.replace(/[[\]]/g, "")}`,
          `다음 차량 : ${upperLineData[1].arvlMsg2.replace(/[[\]]/g, "")}`,
        ]);
    }
    // switch 문 말고도 분명 더 좋은 방법이 있을 것
    // 한번 생각해보자!
    switch (lowerLineData.length) {
      case 0:
        setLowerMessage("현재 운행중인 차량이 없습니다!");
        break;
      case 1:
        setLowerMessage([
          `현재 위치 : ${lowerLineData[0].arvlMsg2.replace(/[[\]]/g, "")}`,
          `다음 차량정보가 없습니다.`,
        ]);
        break;
      case 2:
        setLowerMessage([
          `현재 위치 : ${lowerLineData[0].arvlMsg2.replace(/[[\]]/g, "")}`,
          `다음 차량 : ${lowerLineData[1].arvlMsg2.replace(/[[\]]/g, "")}`,
        ]);
        break;
      default:
        setLowerMessage([
          `현재 위치 : ${lowerLineData[0].arvlMsg2.replace(/[[\]]/g, "")}`,
          `다음 차량 : ${lowerLineData[1].arvlMsg2.replace(/[[\]]/g, "")}`,
        ]);
    }
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
      <div className="metro-direction">서울역 방면 (신촌 방향)</div>
      <div className="metro-position">{`${seoulMessage}`}</div>
      <div className="seoul-tip">{`🚨 이 열차는 서울역이 종점입니다!`}</div>
      <div className="metro-direction">문산 방면 (행신 방향)</div>
      <div className="metro-position">{`${upperMessage[0]}`}</div>
      <div className="next-train">{`${upperMessage[1]}`}</div>
      <div className="metro-direction">용문 방면 (홍대입구 방향)</div>
      <div className="metro-position">{`${lowerMessage[0]}`}</div>
      <div className="next-train">{`${lowerMessage[1]}`}</div>
    </section>
  );
};

export default Info;
