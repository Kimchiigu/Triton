import { backend_user } from '@/declarations/backend_user';
import { useAuth } from '../components/utils/use-auth-client';

export default function Crud() {
  const { identity } = useAuth();

  const getUserName = async () => {
    if (!identity || !identity.getPrincipal()) {
      return 'Anonymous';
    }

    try {
      const userName = await backend_user.getName(identity.getPrincipal());
      return userName || 'Default User';
    } catch (error) {
      console.error('Error fetching user:', error);
      return 'Error User';
    }
  };

  const whoami = async () => {
    console.log((await backend_user.whoami()).toText());
  };

  const handleClick = async () => {
    console.log(await getUserName());
  };

  return (
    <div className="h-screen relative text-white">
      <button onClick={handleClick} className="text-black">
        Click me
      </button>
    </div>
  );
}
