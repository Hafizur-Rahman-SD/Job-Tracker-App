import { Outlet, Navigate } from "react-router-dom";
import PrivateNavbar from "../components/PrivateNavbar";
import { useAuth } from "../context/AuthContext";

export default function PrivateLayout() {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <PrivateNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
