import { useNavigate } from 'react-router-dom';
import Aurora from '../components/backgrounds/Aurora/Aurora';
import GradientText from '../components/textanimations/GradientText/GradientText';
import { RainbowButton } from '../components/magicui/rainbow-button';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full items-center justify-center h-screen text-center">
      <div className="absolute inset-0 w-full h-full -z-10">
        <Aurora colorStops={['#00FBFF', '#7CFF67', '#00D8FF']} speed={0.5} />
      </div>
      <GradientText
        colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
        animationSpeed={10}
        showBorder={false}
        className="custom-class text-9xl"
      >
        Triton
      </GradientText>
      <RainbowButton
        className="text-white mt-5"
        onClick={() => navigate('/register')}
      >
        Get Started
      </RainbowButton>
    </div>
  );
}
