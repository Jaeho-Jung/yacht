import { Client } from "boardgame.io/react";
import { Yacht } from "./Game";
import { YachtBoard } from "./components/YachtBoard";

// TODO: Server
const App = Client({
  game: Yacht,
  numPlayers: 2,
  board: YachtBoard
});

export default App;
