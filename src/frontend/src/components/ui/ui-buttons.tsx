import { useNavigate } from 'react-router-dom';
import { Button } from './button';
import DialogSetting from './dialog-setting';
import { DollarSign } from 'lucide-react';

export default function UIButtons() {
  const porfileIcon =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/temce2ec8cu06neyfmyv';
  const logoutIcon =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/au3hhmzd7ingqg59fbxa';
  const backpackIcon =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/ppiuukmzhesktzjtwcd3';
  const dollarSignIcon =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/qophvbugffupqryyqmcg';

  const navigate = useNavigate();

  const goBack = async () => {
    navigate('/login');
  };

  const goDonate = async () => {
    navigate('/organization');
  };

  return (
    <div className="flex flex-col justify-between absolute w-1/4 h-full z-10 left-0">
      <div className="flex flex-row items-center">
        <Button className="p-6 ml-6 mt-6 bg-green-600 hover:bg-green-700">
          <img src={porfileIcon} alt="Profile Icon" className="w-6 h-6" />
        </Button>
        <Button className="p-6 ml-6 mt-6 bg-green-600 hover:bg-green-700">
          <img src={backpackIcon} alt="Profile Icon" className="w-6 h-6" />
        </Button>
        <Button
          className="p-6 ml-6 mt-6 bg-green-600 hover:bg-green-700"
          onClick={goDonate}
        >
          <img src={dollarSignIcon} alt="Profile Icon" className="w-6 h-6" />
        </Button>
        <Button
          className="p-6 ml-6 mt-6"
          variant={'destructive'}
          onClick={goBack}
        >
          <img src={logoutIcon} alt="Profile Icon" className="w-6 h-6" />
        </Button>
      </div>
      <div className="flex flex-row items-center">
        <DialogSetting></DialogSetting>
        <Button className="p-6 ml-6 mb-6 bg-green-600 hover:bg-green-700 font-pixel">
          Donate to Triton!
        </Button>
      </div>
    </div>
  );
}
