import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Locations from './pages/Locations';
import Story from './pages/Story';
import KnowledgeBase from './pages/KnowledgeBase';

// Admin imports
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/admin/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import MenuManager from './pages/admin/MenuManager';
import OrderTracker from './pages/admin/OrderTracker';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="locations" element={<Locations />} />
            <Route path="story" element={<Story />} />
            <Route path="knowledge" element={<KnowledgeBase />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="menu" element={<MenuManager />} />
              <Route path="orders" element={<OrderTracker />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
