import React from "react";
import Cards from "../components/Cards";
import Player from "../components/Player";
import User from "../components/User";
import "../css/game.scss";

function Game() {
  return (
    <div className="game-wrap">
      {/* {[...Array(5)].map((_, i) => (
          <User />
        ))} */}
      <div className="user-wrap">
        <User photo="black" />
        <User photo="orange" />
      </div>
      <div className="user-wrap">
        <User photo="red" />
        <User photo="yellow" />
      </div>
      <div className="player-wrap">
        <Player photo="green" />
      </div>
    </div>
  );
}

export default Game;
