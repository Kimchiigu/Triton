import { canisterId, createActor } from '@/declarations/backend';

export default function Crud() {
  const actor = createActor(canisterId);

  const handleClick = async () => {
    try {
      const greeting = await actor.printHello();
      console.log(greeting);
    } catch (error) {
      console.error('Error calling printHello:', error);
    }
  };

  return (
    <div className="h-screen relative text-white">
      <button onClick={handleClick} className="text-black">
        Click me
      </button>
    </div>
  );
}
