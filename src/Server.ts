import { Server } from "boardgame.io/server";
import { Yacht } from "./Game";

const server = Server({
    games: [Yacht],
});

server.run(8000);