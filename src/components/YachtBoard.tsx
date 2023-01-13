import React from "react";
import { GameState } from "../types/GameState";
import { BoardProps } from "boardgame.io/react";
import { ScoreBoard } from "./ScoreBoard/ScoreBoard";
import { DiceBoard } from "./DiceBoard/DiceBoard";

interface YachtProps extends BoardProps<GameState> {}

export const YachtBoard = ({G, ctx, moves}: YachtProps) => {
    return (
        <div>
            <ScoreBoard currentPlayer={ctx.currentPlayer.toString()} dice={G.dice} players={G.players} selectCategory={moves.selectCategory} nRoll={G.nRoll} />
            <DiceBoard dice={G.dice} diceHeld={G.diceHeld} toggleDice={moves.toggleDice} rollDice={moves.rollDice}/>
        </div>
    );
};