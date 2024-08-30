import React from "react";
import Cards from "../components/Cards";

function game() {
  return (
    <div>
      {[...Array(13)].map((_, i) => (
        <Cards num={i} shape="club" />
      ))}
    </div>
  );
}

export default game;
