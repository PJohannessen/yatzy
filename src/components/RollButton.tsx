import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

interface RollButtonProps {
  disabled: boolean;
  onClick: () => void;
  totalRolls: number;
}

const RollButton: React.FC<RollButtonProps> = ({ disabled, onClick, totalRolls }) => {
  const variant = "success";
  let text;
  if (totalRolls === 0) {
    text = "Roll";
  } else if (totalRolls > 0 && totalRolls < 3) {
    text = "Roll or Score";
  } else {
    text = "Score";
  }
  return (
    <StyledButton disabled={disabled} onClick={onClick} variant={variant}>
      {text}
    </StyledButton>
  );
}

const StyledButton = styled(Button)`
  min-width: 10em;
`;

export default RollButton;
