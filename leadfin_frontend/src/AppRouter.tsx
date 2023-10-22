import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useUserStore } from './storage/userStore';
import AdminDashboard from './components/pages/adminDashboard/adminDashboard';
import ClientDashboard from './components/pages/clientDashboard/clientDashboard';
import MainPage from './components/pages/mainPage/mainPage';
import NotFound from './components/pages/notFound/notFound';
import WebmasterDashboard from './components/pages/webmasterDashboard/webmasterDashboard';
import Login from './components/auth/login';
import Registration from './components/auth/registration';

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{element}</>;
};

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} />} />
      <Route path="/client" element={<PrivateRoute element={<ClientDashboard />} />} />
      <Route path="/webmaster" element={<PrivateRoute element={<WebmasterDashboard />} />} />
    </Routes>
  );
};

export default AppRouter;
