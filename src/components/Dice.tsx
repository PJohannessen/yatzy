import React from 'react';
import Dice1Icon from 'mdi-react/Dice1Icon';
import Dice2Icon from 'mdi-react/Dice2Icon';
import Dice3Icon from 'mdi-react/Dice3Icon';
import Dice4Icon from 'mdi-react/Dice4Icon';
import Dice5Icon from 'mdi-react/Dice5Icon';
import Dice6Icon from 'mdi-react/Dice6Icon';

interface DiceProps {
  value: number;
}

const Dice: React.FC<DiceProps> = ({ value }) => {
  let dice = null;
  if (value === 1) dice = <Dice1Icon size={48} />;
  if (value === 2) dice = <Dice2Icon size={48} />;
  if (value === 3) dice = <Dice3Icon size={48} />;
  if (value === 4) dice = <Dice4Icon size={48} />;
  if (value === 5) dice = <Dice5Icon size={48} />;
  if (value === 6) dice = <Dice6Icon size={48} />;

  return dice;
}

export default Dice;
