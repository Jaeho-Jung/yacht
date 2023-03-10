import {
    NUM_DICE,
    MAX_ROLL
} from './constants';
import { Game, Move } from 'boardgame.io';
import { Player } from './types/Player';
import { GameState } from './types/GameState';
import { ScoringCategory } from './types/Scoring';
import { ScoreCalculator } from './utils/ScoreCalculator';

const createInitialScores = () => {
    return {
        ones: null,
        twos: null,
        threes: null,
        fours: null,
        fives: null,
        sixes: null,
        choice: null,
        fourOfAKind: null,
        fullHouse: null,
        smallStraight: null,
        largeStraight: null,
        yacht: null,
    };
};

const rollDice: Move<GameState> = ({G, random}) => {
    if (G.nRoll >= MAX_ROLL) return;// INVALID_MOVE;
    G.nRoll++;

    for (let d = 0; d < G.dice.length; d++) {
        if (!G.diceHeld[d]) G.dice[d] = random.Die(6);
    }
};

const toggleDice: Move<GameState> = ({G}, dieIdx: number) => {
    if (G.nRoll === 0 || G.nRoll >= MAX_ROLL) return;
    G.diceHeld[dieIdx] = !G.diceHeld[dieIdx];
};

const selectCategory: Move<GameState> = ({G, ctx, events}, category: ScoringCategory) => {
    if (G.players[parseInt(ctx.currentPlayer)].scoring[category] != null) return;

    const score = ScoreCalculator.calculators[category](G.dice);
    G.players[parseInt(ctx.currentPlayer)].scoring[category] = score;

    events.endTurn();
};

export const Yacht: Game<GameState> = {
    name: 'Yacht',
    setup: ({ctx}) => {
        const players: Player[] = [];
        for (let p = 0; p < ctx.numPlayers; p++) {
            players.push({
                id: p.toString(),
                name: "Player " + (p+1),
                scoring: createInitialScores()
            });
        }
    
        const dice = Array(NUM_DICE).fill(null);
        const diceHeld = Array(NUM_DICE).fill(false);
        const nRoll = 0;
    
        return ({
            nRoll,
            dice,
            diceHeld,
            players,
        });
    },
    turn: {
        onBegin: ({G}) => {
            G.dice = Array(NUM_DICE).fill(null);
            G.diceHeld = Array(NUM_DICE).fill(false);
            G.nRoll = 0;
            // G.dice = random.D6(NUM_DICE);
        },
    },
    moves: {
        rollDice,
        toggleDice,
        selectCategory,
    },
    endIf: ({G}) => {
        const gameOver = G.players.every((player) => {
            return Object.keys(player.scoring).every((category) => {
                const ScoringCategory = category as ScoringCategory;
                return player.scoring[ScoringCategory] != null;
            })
        });
        if (gameOver) {
            const scores = G.players.map((player) => ScoreCalculator.calculateTotal(player));
            const maxScore = Math.max(...scores) ?? 0;
            if (scores.filter((score) => score === maxScore).length > 1)
                return { draw: true };
            else {
                const winner = G.players[scores.indexOf(maxScore)];
                return { winner: winner.id };
            }
        }
    },
};
