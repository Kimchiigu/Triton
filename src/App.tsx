import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing-page';
import Crud from './pages/crud-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/crud" element={<Crud />} />
      </Routes>
    </Router>
  );
}

export default App;
