export default function PomodoroTimerBox() {
  const boardUrl =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/rlp1modihlffo7klemvt';
  return (
    <div className="absolute top-1/2 right-32 -translate-y-1/2 w-3/5 h-3/5 flex items-center justify-center rounded-xl">
      <div className="z-10 font-pixel">test</div>
      <img src={boardUrl} alt="This is board" className="w-full absolute" />
    </div>
  );
}
