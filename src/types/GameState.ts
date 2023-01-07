import { Player } from "./Player";

export interface GameState {
    nRoll: number;
    dice: number[];
    diceHeld: boolean[];
    players: Player[];
}