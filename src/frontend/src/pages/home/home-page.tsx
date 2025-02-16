import { backend_user } from '@/declarations/backend_user';
import { useAuth } from '../../hooks/use-auth-client';
import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import PomodoroTimer from './pomodoro-timer';
import PomodoroLayout from '../../components/ui/pomodoro-layout';
import Canvas from '../../components/ui/canvas';
import UIButtons from '../../components/ui/ui-buttons';

export default function HomePage() {
  const { identity } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('Stranger');

  useEffect(() => {
    const fetchUsername = async () => {
      if (identity) {
        try {
          const name = await backend_user.getName(identity.getPrincipal());
          setUsername(name);
        } catch (error) {
          console.error('Error fetching username:', error);
          setUsername('Unknown User');
        }
      }
    };

    fetchUsername();
  }, [identity]);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="absolute inset-0 w-full h-full z-[-1]">
        <img
          src="https://res.cloudinary.com/dxcn5osfu/image/upload/f_auto,q_auto/v1/Triton/Website/cjfbhsmvgmeu7mndvmuu"
          alt="Triton Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute w-1/2 h-20 bg-white top-0"></div>
      <UIButtons></UIButtons>
      <Canvas />
      <PomodoroLayout />
    </div>
  );
}
