import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          
          {/* Logo */}
          <h1 className="text-2xl font-extrabold tracking-wide">
            <Link to="/" className="hover:text-cyan-400 transition-colors">
              Job<span className="text-cyan-400">Tracker</span>
            </Link>
          </h1>

          {/* Menu */}
          <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base items-center">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-cyan-300 px-3 py-1 rounded-md transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/jobs"
                  className="hover:text-cyan-300 px-3 py-1 rounded-md transition-colors"
                >
                  Jobs
                </Link>
                <Link
                  to="/interview"
                  className="hover:text-cyan-300 px-3 py-1 rounded-md transition-colors"
                >
                  Interviews
                </Link>

                <span className="hidden sm:inline text-gray-400">|</span>

                {/* User Email */}
                <span className="text-gray-300 text-sm">{user.email}</span>

                {/* Logout */}
                <button
                  onClick={signOut}
                  className="bg-cyan-400 text-slate-900 font-semibold px-4 py-1.5 rounded-full hover:bg-cyan-300 transition-all shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="hover:text-cyan-300 px-3 py-1 rounded-md transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="hover:text-cyan-300 px-3 py-1 rounded-md transition-colors"
                >
                  About
                </Link>

                <Link
                  to="/login"
                  className="bg-cyan-400 text-slate-900 font-semibold px-5 py-1.5 rounded-full shadow hover:bg-cyan-300 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-slate-900 border border-cyan-400 text-white font-semibold px-5 py-1.5 rounded-full hover:bg-slate-800 hover:border-cyan-300 transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer: keeps content below navbar */}
      <div className="h-20"></div>
    </>
  );
}
