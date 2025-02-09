import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import './App.css';
import GradientText from './components/textanimations/GradientText/GradientText';
import Aurora from './components/backgrounds/Aurora/Aurora';

function App() {
  const { data: count, refetch } = useQueryCall({
    functionName: 'get',
  });

  const { call: increment, loading } = useUpdateCall({
    functionName: 'inc',
    onSuccess: refetch,
  });

  return (
    <div className="flex flex-col items-center justify-center max-h-screen text-center">
      <GradientText
        colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
        animationSpeed={10}
        showBorder={false}
        className="custom-class text-9xl"
      >
        Triton
      </GradientText>
    </div>
  );
}

export default App;
