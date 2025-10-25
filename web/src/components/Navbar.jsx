import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center rounded-2xl shadow">
      <Link to="/jobs" className="text-xl font-bold">Job Tracker</Link>
      <div className="flex gap-4 items-center">
        {user && <span className="text-sm">{user.email}</span>}
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <button
          onClick={signOut}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
