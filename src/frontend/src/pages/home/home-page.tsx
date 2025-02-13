import { backend_user } from '@/declarations/backend_user';
import { useAuth } from '../../hooks/use-auth-client';
import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import PomodoroTimer from './pomodoro-timer';

export default function HomePage() {
  const { identity } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('Stranger');

  const goBack = async () => {
    navigate('/login');
  };

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
      <div className="absolute inset-0 w-full h-full -z-10">
        <img
          src="https://res.cloudinary.com/dxcn5osfu/image/upload/f_auto,q_auto/v1/Triton/Website/cjfbhsmvgmeu7mndvmuu"
          alt="Triton Background"
          className="w-full h-full object-cover"
        />
      </div>
      <h1>Hello {username}</h1>
      <PomodoroTimer />
      <Button
        className="w-[100px] bg-green-600 hover:bg-green-700 rounded-xl text-white"
        onClick={goBack}
      >
        Go to Login
      </Button>
    </div>
  );
}
