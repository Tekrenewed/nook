import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Locations from './pages/Locations';
import Story from './pages/Story';
import KnowledgeBase from './pages/KnowledgeBase';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

// Admin imports
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/admin/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import MenuManager from './pages/admin/MenuManager';
import OrderTracker from './pages/admin/OrderTracker';
import Settings from './pages/admin/Settings';
import SiteContentManager from './pages/admin/SiteContentManager';
import Checkout from './pages/Checkout';

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
            <Route path="checkout" element={<Checkout />} />
            <Route path="knowledge" element={<KnowledgeBase />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/:slug" element={<BlogPost />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="menu" element={<MenuManager />} />
              <Route path="content" element={<SiteContentManager />} />
              <Route path="orders" element={<OrderTracker />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
