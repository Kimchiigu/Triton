interface PomodoroTimerBoxProps {
  mode: string;
}

export default function PomodoroTimerBox({ mode }: PomodoroTimerBoxProps) {
  const greenBoardUrl =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/rlp1modihlffo7klemvt';
  const blueBoardUrl =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/ajjmxhh6ex2l9lqh9bce';
  const redBoardUrl =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/xb1epxn5ocdaxuhuehs6';

  const getBoardUrl = () => {
    if (mode === 'Pomodoro') return redBoardUrl;
    if (mode === 'Short Break') return greenBoardUrl;
    if (mode === 'Long Break') return blueBoardUrl;
    return redBoardUrl;
  };

  return (
    <div className="flex items-center justify-center">
      <div className="z-10 font-pixel text-8xl text-white mt-36 mb-36">
        00 : 00
      </div>
      <img
        src={getBoardUrl()}
        alt="Board"
        className="w-4/6 absolute h-fit z-[-1] transition-opacity duration-500 ease-in-out opacity-0"
        onLoad={(e) => (e.currentTarget.style.opacity = '1')}
      />
    </div>
  );
}
