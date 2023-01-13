import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { ScoringCategoryDetails } from '../../types/Scoring';

interface ScorecardCategoryCellProps {
  scd: ScoringCategoryDetails
}

const ScorecardCategoryCell: React.FC<ScorecardCategoryCellProps> = ({ scd }) => {
  return (
    <td>
        <OverlayTrigger
            overlay={<Tooltip id={scd.category}>{scd.description}</Tooltip>}
        >
        <span>{scd.name}</span>
      </OverlayTrigger>
    </td>
  );
}

export default ScorecardCategoryCell;