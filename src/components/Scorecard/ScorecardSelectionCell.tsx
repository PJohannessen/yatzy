import React from 'react';
import { Button } from "react-bootstrap";
import { ScoringCategory } from '../../types/Scoring';

interface ScorecardSelectionCellProps {
  category: ScoringCategory;
  score: number;
  selectCategory: (category: ScoringCategory) => void;
}

const ScorecardSelectionCell: React.FC<ScorecardSelectionCellProps> = ({ category, score, selectCategory }) => {
  const variant = score > 0 ? "primary" : "danger";
  return (
    <td>
      <Button
        onClick={() => selectCategory(category)}
        size='sm'
        variant={variant}
      >{score}</Button>
    </td>
  );
}

export default ScorecardSelectionCell;
