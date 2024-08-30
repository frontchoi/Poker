import React from "react";
import "../css/cards.scss";
import { TCardShape } from "../types";

interface ICardsProps {
  shape: TCardShape;
  num: number;
}

const Cards: React.FC<ICardsProps> = ({ shape, num }) => {
  return <div className={`card diamond${num}`}></div>;
};

export default Cards;
