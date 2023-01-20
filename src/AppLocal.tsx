import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import { Yacht } from "./Game";
import { YachtBoard } from "./components/YachtBoard";
import React from "react";

const numPlayers = 2;

const YachtClient = Client({
  game: Yacht,
  board: YachtBoard,
  numPlayers: numPlayers,
  multiplayer: Local(),
  debug: false,
});

class App extends React.Component {
  render() {
    return (
      <div>
        {
            Array(numPlayers)
            .fill(null)
            .map((_, i) => (
                <YachtClient playerID={i.toString()} key={i} />
            ))
        }
      </div>
    );
  }
};

export default App;
