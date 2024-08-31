import React from "react";
import { TUserPhoto, IUserProps } from "../types";
import Cards from "./Cards";

const Player: React.FC<IUserProps> = ({ photo }) => {
  return (
    <div className="card-box">
      <div className={`photo ${photo}`}></div>
      <div className="cards">
        <Cards shape="club" num={1} />
      </div>
    </div>
  );
};
export default Player;
