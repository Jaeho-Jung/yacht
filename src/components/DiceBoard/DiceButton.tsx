import React from 'react';

interface DiceButtonProps {
  dieIdx: number;
  dieValue: number;
  isHeld: boolean;
  toggleDice: (dieIdx: number) => void;
}

const DiceButton: React.FC<DiceButtonProps> = ({ dieIdx, dieValue, isHeld, toggleDice }) => {
  const dieColor = isHeld ? 'r' : 'b';
  dieValue = dieValue ?? 0;
  const dieImage = `img/Dice-${dieColor}-${dieValue}.png`;
  return (  
    <img src={dieImage} alt={`Dice-${dieColor}-${dieValue}`} onClick={() => toggleDice(dieIdx)} draggable='false'/>
  );
}

export default DiceButton;