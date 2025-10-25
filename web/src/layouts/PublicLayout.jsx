import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PublicNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-gray-300 text-center p-4">
        © {new Date().getFullYear()} JobTracker — Built by Hafizur Rahman
      </footer>
    </div>
  );
}
