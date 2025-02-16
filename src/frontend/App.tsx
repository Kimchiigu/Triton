import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './src/pages/landing-page';
import Logout from './src/pages/auth/logout';
import AuthPage from './src/pages/auth/auth-page';
import HomePage from './src/pages/home/home-page';
import { useAuth } from './src/hooks/use-auth-client';
import OrganizationPage from './src/pages/organization-page';
import OrganizationDetailPage from './src/pages/organization-detail-page';
import TransactionListPage from './src/pages/transaction-list-page';

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
    {
      path: '/organization',
      element: <>{isAuthenticated ? <OrganizationPage /> : <Logout />}</>,
    },
    {
      path: '/organization/:id',
      element: <>{isAuthenticated ? <OrganizationDetailPage /> : <Logout />}</>,
    },
    {
      path: '/organization/:id/transactions',
      element: <>{isAuthenticated ? <TransactionListPage /> : <Logout />}</>,
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
