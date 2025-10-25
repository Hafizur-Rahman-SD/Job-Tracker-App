import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-5 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center shadow-md">
      <h1 className="text-xl font-bold tracking-wide mb-2 sm:mb-0">
        <Link to="/">JobTracker</Link>
      </h1>

      {user ? (
        <div className="flex flex-wrap gap-4 text-sm sm:text-base items-center">
          <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
          <Link to="/jobs" className="hover:text-blue-400">Jobs</Link>
          <Link to="/interview" className="hover:text-blue-400">Interviews</Link>
          <span className="hidden sm:inline text-gray-400">|</span>
          <span className="text-gray-300">{user.email}</span>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 text-sm sm:text-base items-center">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/about" className="hover:text-blue-400">About</Link>
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white">
            Login
          </Link>
          <Link to="/signup" className="bg-gray-700 hover:bg-gray-800 px-3 py-1 rounded text-white">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
