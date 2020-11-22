import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import styled from 'styled-components';
import InfoCircleIcon from 'mdi-react/InfoCircleIcon';
import { ScoringCategoryDetails } from '../../types';

interface ScorecardCategoryCellProps {
  scd: ScoringCategoryDetails
}

const ScorecardCategoryCell: React.FC<ScorecardCategoryCellProps> = ({ scd }) => {
  return (
    <td>
      <StyledSpan>{scd.name}</StyledSpan>
      <OverlayTrigger
        overlay={<Tooltip id={scd.category}>{scd.description}</Tooltip>}
        popperConfig={{
          modifiers: {
            preventOverflow: {
              enabled: false
            }
          }
        }}
      >

        <InfoCircleIcon size={16} />
      </OverlayTrigger>
    </td>
  );
}

const StyledSpan = styled.span`
  padding-right: 0.5em;
`;

export default ScorecardCategoryCell;
