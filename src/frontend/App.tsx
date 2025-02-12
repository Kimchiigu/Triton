import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './src/pages/landing-page';
import Logout from './src/pages/auth/logout';
import { AuthProvider } from './src/components/utils/use-auth-client';
import AuthPage from './src/pages/auth/auth-page';
import HomePage from './src/pages/home/home-page';

function App() {
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
      element: <HomePage />,
    },
  ];

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
