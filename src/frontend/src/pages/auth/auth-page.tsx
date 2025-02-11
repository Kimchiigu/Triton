import { useAuth } from '../../components/utils/use-auth-client';
import Login from './login';
import Logout from './logout';

export default function AuthPage() {
  const { isAuthenticated } = useAuth();

  return <>{isAuthenticated ? <Login /> : <Logout />}</>;
}
