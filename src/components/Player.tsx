import React from "react";
import { TUserPhoto, IUserProps } from "../types";

const Player: React.FC<IUserProps> = ({ photo }) => {
  return (
    <div className="card-box">
      <div className={`photo ${photo}`}></div>
      <div className="cards">adf</div>
    </div>
  );
};
export default Player;
