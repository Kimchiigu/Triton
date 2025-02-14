import { Button } from './button';

export default function BreakButtons() {
  return (
    <div className="flex flex-row justify-center items-center gap-12">
      <Button className="text-3xl p-8 font-pixel border-4 border-blue-400 hover:bg-blue-400">
        Pomodoro
      </Button>
      <Button className="text-3xl p-8 font-pixel border-4 border-blue-400 hover:bg-blue-400">
        Short Break
      </Button>
      <Button className="text-3xl p-8 font-pixel border-4 border-blue-400 hover:bg-blue-400">
        Long Break
      </Button>
    </div>
  );
}
