import { useState } from 'react';

export default function PomodoroTimerBox() {
  const greenBoardUrl =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/rlp1modihlffo7klemvt';
  const blueBoardUrl =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/ajjmxhh6ex2l9lqh9bce';
  const redBoardUrl =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/xb1epxn5ocdaxuhuehs6';

  const [mode, setMode] = useState('Pomodoro');

  const getBoardUrl = () => {
    if (mode === 'Pomodoro') return redBoardUrl;
    if (mode === 'Short Break') return greenBoardUrl;
    if (mode === 'Long Break') return blueBoardUrl;
  };

  return (
    <div className="h-1/2 flex items-center justify-center">
      <div className="z-10 font-pixel text-9xl text-white absolute">
        00 : 00
      </div>
      <img src={getBoardUrl()} alt="Board" className="w-full absolute z-[-1]" />
    </div>
  );
}
