import { useState } from 'react';
import BreakButtons from './break-buttons';
import { Button } from './button';
import PomodoroTimerBox from './pomodoro-timer-box';

export default function PomodoroLayout() {
  const [mode, setMode] = useState<string>('Pomodoro');

  return (
    <div className="absolute top-1/2 right-32 -translate-y-1/2 w-2/4 h-fit flex items-center justify-center flex-col rounded-xl bg-white/25 backdrop-blur-sm p-8">
      <h1 className="font-pixel text-9xl pb-10">Triton</h1>
      <BreakButtons mode={mode} setMode={setMode} />
      <PomodoroTimerBox mode={mode} />
      <Button className="text-2xl p-6 font-pixel border-4 border-green-600 bg-green-500 hover:bg-green-600">
        Start
      </Button>
    </div>
  );
}
