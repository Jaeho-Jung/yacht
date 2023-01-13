import React from "react";
import { ScoreCalculator } from "../../utils/ScoreCalculator";
import { Player } from "../../types/Player";
import { ScoringCategory, ScoringCategoryDescriptions } from "../../types/Scoring";
import ScorecardPointsCell from "./ScoreBoardPointsCell";
import ScorecardSelectionCell from "./ScoreBoardSelectionCell";
import ScorecardCategoryCell from "./ScoreBoardCategoryCell";

interface ScoreBoardProps {
    currentPlayer: string;
    dice: number[];
    players: Player[];
    selectCategory: (category: ScoringCategory) => void;
    nRoll: number;
}

/**
 * TODO
 * Make ScoreBoard Prittier
 */

export const ScoreBoard = ({currentPlayer, dice, players, selectCategory, nRoll}: ScoreBoardProps) => {
    const headers: JSX.Element[] = players.map((p) => <th key={p.id}>{p.name}</th>);
    headers.unshift(<th key="header"></th>);
  
    const upperSection = ScoringCategoryDescriptions
                            .filter((scd) => scd.section === "Upper")
                            .map((scd) => {
                                const cells = players.map((p) => {
                                    let cell: JSX.Element;
                                    let score = p.scoring[scd.category];
                                    if (p.id !== currentPlayer || score !== null || nRoll === 0) {
                                        cell = <ScorecardPointsCell key={`p${p.id}-${scd.category}`} score={score} />;
                                    } else {
                                        score = ScoreCalculator.calculators[scd.category](dice);
                                        cell = <ScorecardSelectionCell key={`p${p.id}-${scd.category}`} category={scd.category} score={score} selectCategory={selectCategory} />;
                                    }
                                
                                    return cell;
                                });
                                cells.unshift(<ScorecardCategoryCell key={scd.category} scd={scd} />);
                                return <tr key={`row-${scd.category}`}>{cells}</tr>;
                            });
    const lowerSection = ScoringCategoryDescriptions
                            .filter((scd) => scd.section === "Lower")
                            .map((scd) => {
                                const cells = players.map((p) => {
                                    let cell: JSX.Element;
                                    let score = p.scoring[scd.category];
                                    if (p.id !== currentPlayer || score !== null || nRoll === 0) {
                                        cell = <ScorecardPointsCell key={`p${p.id}-${scd.category}`} score={score} />;
                                    } else {
                                        score = ScoreCalculator.calculators[scd.category](dice);
                                        cell = <ScorecardSelectionCell key={`p${p.id}-${scd.category}`} category={scd.category} score={score} selectCategory={selectCategory} />;
                                    }
                                
                                    return cell;
                                });
                                cells.unshift(<ScorecardCategoryCell key={scd.category} scd={scd} />);
                                return <tr key={`row-${scd.category}`}>{cells}</tr>;
                            });

    const upperSectionTotal = players.map((p) => <td key={`p${p.id}-subtotal`}>{ScoreCalculator.calculateUpperSectionTotal(p)+"/63"}</td>);
    upperSectionTotal.unshift(<td key="subtotal">SubTotal</td>);
    
    const bonus = players.map((p) => <td key={`p${p.id}-bonus`}>{"+"+ScoreCalculator.calculateUpperSectionBonus(p)}</td>);
    bonus.unshift(<td key="bonus">Bonus</td>);

    const totalScores = players.map((p) => <td key={`p${p.id}-total`}>{ScoreCalculator.calculateTotal(p)}</td>);
    totalScores.unshift(<td key="total">Total</td>);

    return (
        <div>
            <table id="scoreBoard">
                <thead>
                    <tr>{headers}</tr>
                </thead>
                <tbody>
                    {upperSection}
                    <tr>{upperSectionTotal}</tr>
                    <tr>{bonus}</tr>
                    <p/>
                    {lowerSection}    
                    <tr>{totalScores}</tr>
                </tbody>
            </table>
        </div>
    );
};