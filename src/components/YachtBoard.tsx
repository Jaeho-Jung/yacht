import React from "react";
import { GameState } from "../types/GameState";
import { BoardProps } from "boardgame.io/react";
import { ScoreCalculator } from "../utils/ScoreCalculator";

interface YachtProps extends BoardProps<GameState> {}

/**
 * TODO
 * Score Board, Dice Board
 * Create React Component
 */

export const YachtBoard = ({G, ctx, moves}: YachtProps) => {
    return (
        <h1>
            Yacht
            <div>current Player: {ctx.currentPlayer}</div>
            <div>[{G.dice[0]} {G.dice[1]} {G.dice[2]} {G.dice[3]} {G.dice[4]}]</div>
            <div>Ones {G.players[0].scoring.ones}</div>
            <div>Twos {G.players[0].scoring.twos}</div>
            <div>Threes {G.players[0].scoring.threes}</div>
            <div>Fours {G.players[0].scoring.fours}</div>
            <div>Fives {G.players[0].scoring.fives}</div>
            <div>Fixes {G.players[0].scoring.sixes}</div>
            <div>Subtotal {ScoreCalculator.calculateUpperSectionTotal(G.players[0])}</div>
            <div>Bonus {ScoreCalculator.calculateUpperSectionBonus(G.players[0])}</div>
            <p></p>
            <div>Choice {G.players[0].scoring.choice}</div>
            <div>Four of a Kind {G.players[0].scoring.fourOfAKind}</div>
            <div>Full House {G.players[0].scoring.fullHouse}</div>
            <div>Small Straight {G.players[0].scoring.smallStraight}</div>
            <div>Large Straight {G.players[0].scoring.largeStraight}</div>
            <div>Yacht {G.players[0].scoring.yacht}</div>
            <div>Total {ScoreCalculator.calculateTotal(G.players[0])}</div>
        </h1>
    );
};