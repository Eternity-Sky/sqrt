import { Link } from 'react-router-dom';
import { LogIn, LogOut, PlusCircle, Square } from 'lucide-react';
import { getAccessToken, login, logout } from '../utils/oauth';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getAccessToken());
  }, []);

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-4xl">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
            <Square size={20} strokeWidth={3} />
          </div>
          <span className="text-xl font-bold tracking-tight">sqrt</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/publish" className="flex items-center gap-1 text-sm font-medium hover:text-brand transition-colors">
                <PlusCircle size={18} />
                <span>发表</span>
              </Link>
              <button 
                onClick={logout}
                className="flex items-center gap-1 text-sm font-medium hover:text-red-500 transition-colors cursor-pointer"
              >
                <LogOut size={18} />
                <span>登出</span>
              </button>
            </>
          ) : (
            <button 
              onClick={login}
              className="flex items-center gap-1 text-sm font-medium bg-brand text-white px-4 py-2 rounded-full hover:opacity-90 transition-all cursor-pointer"
            >
              <LogIn size={18} />
              <span>登录</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
