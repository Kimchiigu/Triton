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
      <div className="relative flex flex-col gap-3 text-center justify-center items-center bg-slate-50 w-fit p-7 rounded-xl bg-white/70 shadow-xl backdrop-blur-sm">
        <div className="text-orange-custom font-bold text-3xl">
          Hello Stranger!
        </div>
        <div className="mb-3">You are not authenticated</div>
        <Button
          variant={'default'}
          onClick={login}
          className="w-5/6 bg-slate-600 text-white hover:bg-slate-700 rounded-xl"
          color="white"
        >
          Log in
        </Button>
        <Button
          variant={'default'}
          onClick={goBack}
          className="w-5/6 bg-slate-600 text-white hover:bg-slate-700 rounded-xl"
          color="white"
        >
          Go to Landing Page
        </Button>
      </div>
    </div>
  );
}
