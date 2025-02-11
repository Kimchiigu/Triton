import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './src/pages/landing-page';
import Crud from './src/pages/crud-page';
import Login from './src/pages/auth/login';
import Logout from './src/pages/auth/logout';
import { AuthProvider, useAuth } from './src/components/utils/use-auth-client';
import AuthPage from './src/pages/auth/auth-page';

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
