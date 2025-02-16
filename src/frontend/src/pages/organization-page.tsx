import OrganizationList from '../components/ui/organization-list';

export default function OrganizationPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="absolute w-full h-full z-[-1]">
        <img
          src="https://res.cloudinary.com/dxcn5osfu/image/upload/f_auto,q_auto/v1/Triton/Website/cjfbhsmvgmeu7mndvmuu"
          alt="Triton Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-12 p-8 bg-white/25 backdrop-blur-sm">
        <OrganizationList></OrganizationList>
      </div>
    </div>
  );
}
