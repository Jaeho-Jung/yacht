import React from 'react';
import { ScoringCategory } from '../../types/Scoring';

interface ScorecardSelectionCellProps {
  category: ScoringCategory;
  score: number;
  selectCategory: (category: ScoringCategory) => void;
}

const ScorecardSelectionCell: React.FC<ScorecardSelectionCellProps> = ({ category, score, selectCategory }) => {
  return (
    <td>
      <button
        onClick={() => selectCategory(category)}
      >{score}
      </button>
    </td>
  );
}

export default ScorecardSelectionCell;