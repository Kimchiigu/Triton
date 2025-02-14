import { useNavigate } from 'react-router-dom';
import { RainbowButton } from '../components/magicui/rainbow-button';
import { Button } from '../components/ui/button';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full items-center justify-center h-screen text-center">
      <div className="absolute inset-0 w-full h-full -z-10">
        <img
          src="https://res.cloudinary.com/dxcn5osfu/image/upload/f_auto,q_auto/v1/Triton/Website/cjfbhsmvgmeu7mndvmuu"
          alt="Triton Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-9xl font-pixel bg-white/10 text-white rounded-sm p-8 backdrop-blur-sm hover:bg-secondary/50 hover:text-black cursor-default transition duration-300 ease-in-out">
          Triton
        </h1>
      </div>

      <Button
        className="text-white mt-5 font-pixel text-2xl p-8"
        onClick={() => navigate('/login')}
      >
        Get Started
      </Button>
    </div>
  );
}
