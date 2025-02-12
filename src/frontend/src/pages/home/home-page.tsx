import { backend_user } from '@/declarations/backend_user';
import { useAuth } from '../../hooks/use-auth-client';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const { identity } = useAuth();
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
    <div>
      <h1>Hello {username}</h1>
    </div>
  );
}
