import BreakButtons from '../../components/ui/break-buttons';
import { Button } from '../../components/ui/button';
import PomodoroTimerBox from '../../components/ui/pomodoro-timer-box';

export default function PomodoroLayout() {
  return (
    <div className="absolute top-1/2 right-32 -translate-y-1/2 w-2/4 h-full flex items-center justify-center flex-col rounded-xl">
      <BreakButtons></BreakButtons>
      <PomodoroTimerBox></PomodoroTimerBox>
      <Button className="text-3xl p-8 font-pixel border-4 border-green-600 bg-green-500 hover:bg-green-600">
        Start
      </Button>
    </div>
  );
}
