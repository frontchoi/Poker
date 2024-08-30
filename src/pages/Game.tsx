import React from "react";
import Cards from "../components/Cards";

function game() {
  return (
    <div>
      {[...Array(52)].map((_, i) => (
        <Cards num={i} />
      ))}
    </div>
  );
}

export default game;
