import { Login } from '@mui/icons-material';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/auth/registrationt';
import AdminDashboard from './components/pages/adminDashboard/adminDashboard';
import ClientDashboard from './components/pages/clientDashboard/clientDashboard';
import MainPage from './components/pages/mainPage/mainPage';
import NotFound from './components/pages/notFound';
import WebmasterDashboard from './components/pages/webmasterDashboard/webmasterDashboard';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/webmaster" element={<WebmasterDashboard />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
