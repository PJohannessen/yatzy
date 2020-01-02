import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

interface DiceButtonProps {
  disabled: boolean;
  isHeld: boolean;
  onClick: () => void;
}

const DiceButton: React.FC<DiceButtonProps> = ({ disabled, isHeld, onClick }) => {
  const variant = isHeld ? "secondary": "primary";
  const text = isHeld ? "Unhold" : "Hold";
  return (
    <StyledButton block={false} disabled={disabled} onClick={onClick} variant={variant}>
      {text}
    </StyledButton>
  );
}

const StyledButton = styled(Button)`
  min-width: 5em;
`;

export default DiceButton;
