import { Link } from "react-router-dom";
import { LogIn, LogOut, PlusCircle, Square } from "lucide-react";
import { getAccessToken, login, logout } from "../utils/oauth";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getAccessToken());
  }, []);

  return (
    <nav className="border-b border-gray-100 dark:border-gray-800 backdrop-blur-xl bg-white/70 dark:bg-black/70 sticky top-0 z-50 py-4">
      <div className="container mx-auto px-6 h-12 flex items-center justify-between max-w-6xl">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand rounded-[14px] flex items-center justify-center text-white shadow-lg shadow-brand/30 group-hover:rotate-[10deg] transition-all duration-300 group-hover:scale-110">
            <Square size={22} strokeWidth={3} />
          </div>
          <span className="text-2xl font-black tracking-tighter">sqrt</span>
        </Link>

        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <Link
                to="/publish"
                className="flex items-center gap-2 text-sm font-black uppercase tracking-widest hover:text-brand transition-all hover:scale-105"
              >
                <PlusCircle size={20} />
                <span>创作</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-sm font-black uppercase tracking-widest hover:text-red-500 transition-all hover:scale-105 cursor-pointer"
              >
                <LogOut size={20} />
                <span>登出</span>
              </button>
            </>
          ) : (
            <button
              onClick={login}
              className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] bg-brand text-white px-8 py-3 rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-brand/20 active:scale-95 cursor-pointer"
            >
              <LogIn size={20} />
              <span>登录</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
