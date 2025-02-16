import { useEffect, useState } from 'react';
import { ScrollArea } from './scroll-area';
import { useNavigate } from 'react-router-dom';

interface Organization {
  organization_id: string;
  name: string;
  logo: string;
  description: string;
}

export default function OrganizationList() {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  // TODO LOAD ORGANIZATIONS DATA
  useEffect(() => {
    fetch('/public/temp_db/mockOrganizationList.json')
      .then((response) => response.json())
      .then((data) => setOrganizations(data.organizations))
      .catch((error) => console.error('Error loading data:', error));
  }, []);

  const handleCardClick = (org: Organization) => {
    navigate(`/organization/${org.organization_id}`, { state: org });
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="text-5xl font-pixel">Organization List</div>
      <ScrollArea className="h-full w-full">
        <div className="flex flex-wrap gap-8 justify-around">
          {organizations.map((org) => (
            <div
              key={org.organization_id}
              className="bg-white/50 p-6 rounded-lg shadow-lg backdrop-blur-sm w-1/5 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl"
              onClick={() => handleCardClick(org)}
            >
              <img
                src={org.logo}
                alt={`${org.name} logo`}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-3xl font-pixel mt-4">{org.name}</h3>
              <p className="text-lg text-gray-600 font-pixel line-clamp-3 overflow-hidden mt-auto">
                {org.description}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
