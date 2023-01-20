import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Yacht } from "./Game";
import { YachtBoard } from "./components/YachtBoard";
import React from "react";

const numPlayers = 2;

const YachtClient = Client({
  game: Yacht,
  board: YachtBoard,
  numPlayers: numPlayers,
  multiplayer: SocketIO({ server: "localhost:8000" }),
  debug: false,
});

class App extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          {
            Array(numPlayers)
            .fill(null)
            .map((_, i) => {
              const id = i.toString();
              return (
                <button onClick={() => this.setState({ playerID: id })} key={i}>
                  Player {i+1}
                </button>
              );
            })
          }
        </div>
      );
    }
    return (
      <div>
        <YachtClient playerID={this.state.playerID} />
      </div>
    );
  }
};

export default App;
