import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from './button';

export default function OrganizationDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const organization = location.state;

  const goTransactionListPage = (id: string) => {
    navigate(`/organization/${id}/transactions`, { state: { organization } });
  };

  if (!organization) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl font-bold">Organization not found!</p>
        <Button onClick={() => navigate('/')} className="mt-4 px-6 py-3">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-pixel text-5xl">{organization.name}</h1>
      <img
        src={organization.logo}
        alt={`${organization.name} logo`}
        className="h-64 w-fit rounded-md"
      />
      <p className="text-2xl font-pixel">
        <span className="bg-white/75 backdrop-blur-lg p-2">
          {organization.description}
        </span>
      </p>

      <div className="flex flex-col w-fit gap-4">
        <Button
          className="p-6 text-xl font-pixel hover:bg-blue-400"
          onClick={() => goTransactionListPage(organization.organization_id)}
        >
          See transactions
        </Button>
        <Button className="p-6 text-xl font-pixel bg-green-500 hover:bg-green-600">
          Donate
        </Button>
      </div>
    </div>
  );
}
