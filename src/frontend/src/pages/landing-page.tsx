import { useNavigate } from 'react-router-dom';
import { RainbowButton } from '../components/magicui/rainbow-button';

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
      <h1 className="text-9xl font-mono">Triton</h1>
      <RainbowButton
        className="text-white mt-5 font-mono"
        onClick={() => navigate('/login')}
      >
        Get Started
      </RainbowButton>
    </div>
  );
}
