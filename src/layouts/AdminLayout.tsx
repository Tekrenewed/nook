import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLayout() {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Menu Manager', path: '/admin/menu' },
    { name: 'Orders', path: '/admin/orders' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-primary text-background flex flex-col">
        <div className="p-6 border-b border-background/20">
          <h1 className="font-heading font-black text-2xl uppercase tracking-tighter">Nook Admin</h1>
        </div>
        <nav className="flex-1 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-6 py-3 font-heading font-bold uppercase tracking-widest text-sm transition-colors ${
                    location.pathname === item.path
                      ? 'bg-background text-primary'
                      : 'hover:bg-background/10'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-6 border-t border-background/20">
          <button
            onClick={logout}
            className="w-full text-left font-heading font-bold uppercase tracking-widest text-sm hover:text-background/80 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
