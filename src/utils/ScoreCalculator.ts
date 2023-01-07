import { 
    SCORE, 
    SMALL_STRAIGHT_SEQUENCES,
    LARGE_STRAIGHT_SEQUENCES
} from '../constants';
import { Player } from "../types/Player";
import { ScoringCategory, ScoringCategoryDescriptions } from "../types/Scoring";

interface IScoreCalculator {
    calculateUpperSectionTotal: (player: Player) => number;
    calculateUpperSectionBonus: (player: Player) => number;
    calculateLowerSectionTotal: (player: Player) => number;
    calculateTotal: (player: Player) => number;
    calculators: Record<ScoringCategory, (dice: number[]) => number>;
}

const calculateBonus = (score: number) => {
    return score >= 63 ? 35 : 0;
}

export const ScoreCalculator: IScoreCalculator = {
    calculateUpperSectionTotal: (player: Player) => {
        const upperTotal = ScoringCategoryDescriptions
        .filter((scd) => scd.section === "Upper")
        .map((scd) => player.scoring[scd.category] ?? 0)
        .reduce((total, cur) => (total ?? 0) + (cur ?? 0)) ?? 0;
        return upperTotal;
    },
    calculateUpperSectionBonus: (player: Player) => {
        const upperTotal = ScoreCalculator.calculateUpperSectionTotal(player);
        const upperBonus = calculateBonus(upperTotal);
        return upperBonus;
    },
    calculateLowerSectionTotal: (player: Player) => {
        const lowerTotal = ScoringCategoryDescriptions
        .filter((scd) => scd.section === "Lower")
        .map((scd) => player.scoring[scd.category] ?? 0)
        .reduce((total, cur) => (total ?? 0) + (cur ?? 0)) ?? 0;
        return lowerTotal;
    },
    calculateTotal: (player: Player) => {
        const upperTotal = ScoreCalculator.calculateUpperSectionTotal(player);
        const upperBonus = calculateBonus(upperTotal);
        const lowerTotal = ScoreCalculator.calculateLowerSectionTotal(player);
        const total = upperTotal + upperBonus + lowerTotal;
        return total;
    },
    calculators: {
        "ones": (dice: number[]) => {
            const score = dice.reduce((total, d) => d === 1 ? total + d : total, 0);
            return score;
        },
        "twos": (dice: number[]) => {
            const score = dice.reduce((total, d) => d === 2 ? total + d : total, 0);
            return score;
        },
        "threes": (dice: number[]) => {
            const score = dice.reduce((total, d) => d === 3 ? total + d : total, 0);
            return score;
        },
        "fours": (dice: number[]) => {
            const score = dice.reduce((total, d) => d === 4 ? total + d : total, 0);
            return score;
        },
        "fives": (dice: number[]) => {
            const score = dice.reduce((total, d) => d === 5 ? total + d : total, 0);
            return score;
        },
        "sixes": (dice: number[]) => {
            const score = dice.reduce((total, d) => d === 6 ? total + d : total, 0);
            return score;
        },
        "choice": (dice: number[]) => {
            const score = dice.reduce((total, cur) => total + cur);
            return score;
        },
        "fourOfAKind": (dice: number[]) => {
            let count:number[] = Array(6).fill(0);
            dice.forEach((d) => count[d-1]++);

            const score = count.find((n) => n >= 4) !== undefined
                        ? dice.reduce((total, cur) => total + cur)
                        : 0;
            return score;
        },
        "fullHouse": (dice: number[]) => {
            let count:number[] = Array(6).fill(0);
            dice.forEach((d) => count[d-1]++);

            const pair = count.find((n) => n === 2);
            const triple = count.find((n) => n === 3);

            const score = pair !== undefined && triple !== undefined
                        ? dice.reduce((total, cur) => total + cur)
                        : 0;
            return score;
        },
        "smallStraight": (dice: number[]) => {
            let count:number[] = Array(6).fill(0);
            dice.forEach((d) => count[d-1]++);

            let sStraight = false;
            for (const seq of SMALL_STRAIGHT_SEQUENCES) {
                sStraight = seq.every((s) => count[s-1] > 0);
                if (sStraight) break;
            }

            const score = sStraight === true
                        ? SCORE.SMALL_STRAIGHT
                        : 0;
            return score;
        },
        "largeStraight": (dice: number[]) => {
            let count:number[] = Array(6).fill(0);
            dice.forEach((d) => count[d-1]++);

            let lStraight = false;
            for (const seq of LARGE_STRAIGHT_SEQUENCES) {
                lStraight = seq.every((s) => count[s-1] > 0);
                if (lStraight) break;
            }

            const score = lStraight === true
                        ? SCORE.LARGE_STRAIGHT
                        : 0;
            return score;
        },
        "yacht": (dice: number[]) => {
            const score = dice.every((d) => d === dice[0])
                        ? SCORE.YACHT 
                        : 0;

            return score;
        },
    },
};