import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Settings, 
  LogOut,
  Map
} from 'lucide-react';

export default function AdminSidebar() {
  const { logout } = useAuth();
  const location = useLocation();

  const links = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/menu', icon: UtensilsCrossed, label: 'Menu Builder' },
    { to: '/admin/content', icon: Map, label: 'Site Content' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <aside className="w-64 bg-primary text-background min-h-screen flex flex-col font-body fixed left-0 top-0 border-r-4 border-black">
      <div className="p-6 border-b-4 border-black">
        <h1 className="font-heading font-black text-3xl uppercase tracking-tighter leading-none">
          Nook<br/>Admin
        </h1>
      </div>

      <nav className="flex-1 py-6 flex flex-col gap-2 px-4">
        {links.map(link => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          return (
            <Link 
              key={link.to} 
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-none font-bold uppercase tracking-widest text-sm transition-all border-2 border-transparent ${
                isActive 
                  ? 'bg-background text-primary border-black' 
                  : 'text-background hover:bg-black/20 hover:border-black/20'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-primary' : 'text-background'} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t-4 border-black">
        <button 
          onClick={() => logout()}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-none font-bold uppercase tracking-widest text-sm text-background hover:bg-red-600 hover:border-black transition-all border-2 border-transparent"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
