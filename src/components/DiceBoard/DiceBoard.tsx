import { Button } from "react-bootstrap";
import DiceButton from "./DiceButton";

interface DiceBoardProps {
    dice: number[];
    diceHeld: boolean[];
    toggleDice: (dieIdx: number) => void;
    rollDice: () => void;
}

export const DiceBoard = ({dice, diceHeld, toggleDice, rollDice}: DiceBoardProps) => {
    const diceButtons: JSX.Element[] = dice.map((d, i) => <td key={`diceButton-${i}`}><DiceButton dieIdx={i} dieValue={d} isHeld={diceHeld[i]} toggleDice={toggleDice}/></td>)
    const rollButton: JSX.Element = <Button
                                        onClick={() => rollDice()}
                                        size="lg"
                                    >
                                        Roll
                                    </Button>
    return (
        <table>
            <tbody>
                <tr>{diceButtons}</tr>
                <tr><td key="rollButton">{rollButton}</td></tr>
            </tbody>
        </table>
    );
}