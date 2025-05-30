import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateReport from './pages/CreateReport';
import ManageWorkplace from './pages/ManageWorkplace';
import Profile from './pages/Profile';
import AllIncidents from './pages/AllIncidents';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/all-incidents" element={<AllIncidents />} />
        <Route path="/create-report" element={<CreateReport />} />
        <Route path="/manage-workplace" element={<ManageWorkplace />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
