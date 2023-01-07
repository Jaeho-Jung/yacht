import { Client } from "boardgame.io/react";
import { Yacht } from "./Game";
import { YachtBoard } from "./components/YachtBoard";

// TODO: multiplay
const App = Client({
  game: Yacht,
  numPlayers: 1,
  board: YachtBoard
});

export default App;
