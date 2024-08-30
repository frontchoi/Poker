import React from "react";
import "../css/cards.scss";

interface CardsProps {
  num: number; // 예시로 number 타입으로 지정
}

const Cards: React.FC<CardsProps> = ({ num }) => {
  // return <div className={`card${num}`}>Cards{num}</div>;
  return <div className={`card`}>Cards{num}</div>;
};

export default Cards;
