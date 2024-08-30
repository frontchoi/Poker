import React from "react";
import { TUserPhoto, IUserProps } from "../types";

const Player: React.FC<IUserProps> = ({ photo }) => {
  return (
    <div className="player-box">
      <div className={`photo ${photo}`}></div>
    </div>
  );
};
export default Player;
