
import React, { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PawPrint, Home, Heart, MessageCircle, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Layout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };
  
  if (!user) {
    return <>{children}</>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pb-20">{children}</main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-gray-200 dark:border-gray-800 shadow-lg">
        <div className="flex justify-around p-2">
          <button 
            className={`${isActive('/') ? 'active-nav-item' : 'nav-item'}`}
            onClick={() => navigate('/')}
          >
            <Home size={24} />
          </button>
          
          <button 
            className={`${isActive('/discover') ? 'active-nav-item' : 'nav-item'}`}
            onClick={() => navigate('/discover')}
          >
            <PawPrint size={24} />
          </button>
          
          <button 
            className={`${isActive('/matches') ? 'active-nav-item' : 'nav-item'}`}
            onClick={() => navigate('/matches')}
          >
            <Heart size={24} />
          </button>
          
          <button 
            className={`${isActive('/messages') ? 'active-nav-item' : 'nav-item'}`}
            onClick={() => navigate('/messages')}
          >
            <MessageCircle size={24} />
          </button>
          
          <button 
            className={`${isActive('/profile') ? 'active-nav-item' : 'nav-item'}`}
            onClick={() => navigate('/profile')}
          >
            <User size={24} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
