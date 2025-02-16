import { Button } from './button';

interface BreakButtonsProps {
  mode: string;
  setMode: (mode: string) => void;
}

export default function BreakButtons({ mode, setMode }: BreakButtonsProps) {
  const buttons = [
    { label: 'Pomodoro', value: 'Pomodoro' },
    { label: 'Short Break', value: 'Short Break' },
    { label: 'Long Break', value: 'Long Break' },
  ];

  return (
    <div className="flex flex-row justify-center items-center gap-12">
      {buttons.map(({ label, value }) => (
        <Button
          key={value}
          onClick={() => setMode(value)}
          className={`text-2xl p-6 font-pixel border-4 ${
            mode === value
              ? 'bg-blue-800 border-blue-800 hover:bg-blue-800 hover:border-blue-800'
              : 'border-blue-400 hover:bg-blue-500 hover:border-blue-500'
          }`}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
