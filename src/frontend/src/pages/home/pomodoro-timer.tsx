import { useState, useEffect, useRef } from 'react';
import { backend_pomodoro } from '@/declarations/backend_pomodoro';

export default function PomodoroTimer() {
  const defaultWorkTime = 25 * 60; // 25 minutes
  const defaultBreakTime = 5 * 60; // 5 minutes

  const [timeLeft, setTimeLeft] = useState<number>(defaultWorkTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(
      'https://res.cloudinary.com/dxcn5osfu/video/upload/f_auto:video,q_auto/v1/Triton/Website/audgkccyzuelxtf1r0cc',
    );
    audioRef.current.loop = true;
    audioRef.current.volume = 0;
  }, []);

  const fadeInMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.play();
    let volume = 0;
    fadeInterval.current = setInterval(() => {
      if (audioRef.current && volume < 1) {
        volume += 0.05;
        audioRef.current.volume = volume;
      } else {
        clearInterval(fadeInterval.current!);
      }
    }, 200);
  };

  const fadeOutMusic = () => {
    if (!audioRef.current) return;
    let volume = 1;
    fadeInterval.current = setInterval(() => {
      if (audioRef.current && volume > 0) {
        volume -= 0.05;
        audioRef.current.volume = volume;
      } else {
        clearInterval(fadeInterval.current!);
        audioRef.current?.pause();
        audioRef.current!.currentTime = 0;
      }
    }, 200);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      backend_pomodoro.startPomodoro();
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      new Audio(
        'https://res.cloudinary.com/dxcn5osfu/video/upload/f_auto:video,q_auto/v1/Triton/Website/jkbs34pcjj5eoxninsj9',
      ).play();

      fadeOutMusic();
      backend_pomodoro.startBreak();

      setTimeout(() => {
        setIsBreak((prev) => !prev);
        setTimeLeft(isBreak ? defaultWorkTime : defaultBreakTime);
        setIsRunning(true);
        if (!isBreak) fadeInMusic();
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-[50%] text-center">
      <h1 className="text-4xl font-bold mb-4">
        {isBreak ? 'Break Time ☕' : 'Focus Mode 🎯'}
      </h1>

      {/* Timer Display */}
      <div className="text-7xl font-mono mb-4">{formatTime(timeLeft)}</div>

      {/* Progress Bar */}
      <div className="w-64 h-3 bg-gray-700 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-green-500 transition-all"
          style={{
            width: `${(timeLeft / (isBreak ? defaultBreakTime : defaultWorkTime)) * 100}%`,
          }}
        ></div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          onClick={() => {
            setIsRunning((prev) => !prev);
            if (!isRunning) {
              fadeInMusic();
            } else {
              fadeOutMusic();
            }
          }}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          onClick={() => {
            setIsRunning(false);
            setIsBreak(false);
            setTimeLeft(defaultWorkTime);
            fadeOutMusic();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
