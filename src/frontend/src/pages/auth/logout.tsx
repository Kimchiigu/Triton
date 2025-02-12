import { useAuth } from '../../hooks/use-auth-client';
import { Button } from '../../components/ui/button';
import Aurora from '../../components/backgrounds/Aurora/Aurora';

export default function Logout() {
  const { login } = useAuth();

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="absolute inset-0 w-full h-full -z-10">
        <Aurora colorStops={['#00FBFF', '#7CFF67', '#00D8FF']} speed={0.5} />
      </div>
      <div className="relative flex flex-col gap-3 text-center justify-center items-center bg-slate-50 w-fit p-7 rounded-xl bg-white/70 shadow-xl backdrop-blur-sm">
        <div className="text-orange-custom font-bold text-3xl">
          Hello Stranger!
        </div>
        <div className="mb-3">You are not authenticated</div>
        <Button
          variant={'default'}
          onClick={login}
          className="w-5/6 bg-orange-custom hover:bg-darkorange-custom"
          color="white"
        >
          Log in
        </Button>
      </div>
    </div>
  );
}
