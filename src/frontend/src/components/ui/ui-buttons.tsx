import { useNavigate } from 'react-router-dom';
import { Button } from './button';

export default function UIButtons() {
  const porfileIcon =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/temce2ec8cu06neyfmyv';
  const settingIcon =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/thzsec4d506ejnafwdhm';
  const logoutIcon =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/au3hhmzd7ingqg59fbxa';

  const navigate = useNavigate();

  const goBack = async () => {
    navigate('/login');
  };

  return (
    <div className="block absolute w-1/4 h-full z-10 left-0">
      <Button className="p-6 ml-6 mt-6 bg-green-600 hover:bg-green-700">
        <img src={porfileIcon} alt="Profile Icon" className="w-6 h-6" />
      </Button>
      <Button className="p-6 ml-6 mt-6 bg-green-600 hover:bg-green-700">
        <img src={settingIcon} alt="Profile Icon" className="w-6 h-6" />
      </Button>
      <Button
        className="p-6 ml-6 mt-6"
        variant={'destructive'}
        onClick={goBack}
      >
        <img src={logoutIcon} alt="Profile Icon" className="w-6 h-6" />
      </Button>
    </div>
  );
}
