import React from "react";
import { TCardShape } from "../types";

interface ICardsProps {
  shape: TCardShape;
  num: number;
}

const Cards: React.FC<ICardsProps> = ({ shape, num }) => {
  return <div className={`card ${shape + num}`}></div>;
};

export default Cards;
