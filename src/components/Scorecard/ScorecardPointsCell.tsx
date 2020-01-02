import React from 'react';

interface ScorecardPointsCellProps {
  score: number | null;
}

const ScorecardPointsCell: React.FC<ScorecardPointsCellProps> = ({ score }) => {
  return (
    <td>
      {score != null ? score : null }
    </td>
  );
}

export default ScorecardPointsCell;
