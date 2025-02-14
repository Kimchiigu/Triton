import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './src/pages/landing-page';
import Logout from './src/pages/auth/logout';
import { AuthProvider } from './src/hooks/use-auth-client';
import AuthPage from './src/pages/auth/auth-page';
import HomePage from './src/pages/home/home-page';
import { useAuth } from './src/hooks/use-auth-client';

function App() {
  const { isAuthenticated } = useAuth();

  const routes = [
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/login',
      element: <AuthPage />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
    {
      path: '/home',
      element: <>{isAuthenticated ? <HomePage /> : <Logout />}</>,
    },
  ];

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
