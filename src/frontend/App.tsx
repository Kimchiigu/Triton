import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './src/pages/landing-page';
import Crud from './src/pages/crud-page';
import { Register } from './src/pages/auth/register-page';
import Login from './src/pages/auth/login';
import Logout from './src/pages/auth/logout';
import { AuthProvider, useAuth } from './src/util/use-auth-client';

function App() {
  const { isAuthenticated, identity } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/crud"
          element={isAuthenticated ? <Login /> : <Logout />}
        />
        <Route path="/test" element={<Crud />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
