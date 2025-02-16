import { useAuth } from '../../hooks/use-auth-client';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const goBack = async () => {
    await navigate('/');
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="absolute inset-0 w-full h-full -z-10">
        <img
          src="https://res.cloudinary.com/dxcn5osfu/image/upload/f_auto,q_auto/v1/Triton/Website/cjfbhsmvgmeu7mndvmuu"
          alt="Triton Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-2/5 h-2/6 bg-white backdrop-blur-lg p-10 rounded-2xl shadow-xl flex flex-col gap-4 items-center justify-center">
        <div className="text-orange-custom font-bold text-5xl font-pixel">
          Hello Stranger!
        </div>
        <div className="font-pixel text-2xl">You are not authenticated</div>
        <div className="flex flex-row gap-8 w-full pt-4 justify-center">
          <Button
            variant={'default'}
            onClick={login}
            className="w-full font-pixel text-xl p-6"
            color="white"
          >
            Log in
          </Button>
          <Button
            variant={'outline'}
            onClick={goBack}
            className="w-full font-pixel text-xl p-6 border-4 border-primary text-primary hover:text-primary"
          >
            Back to Landing Page
          </Button>
        </div>
      </div>
    </div>
  );
}
