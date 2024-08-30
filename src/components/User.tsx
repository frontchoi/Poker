import React from "react";
import { TUserPhoto, IUserProps } from "../types";

const User: React.FC<IUserProps> = ({ photo }) => {
  return (
    <div className="user-box">
      <div className={`photo ${photo}`}></div>
    </div>
  );
};

export default User;
