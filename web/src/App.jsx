import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

// Public Pages
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";

// Private Pages
import Dashboard from "./pages/private/Dashboard";
import Jobs from "./pages/private/Jobs";
import Interview from "./pages/private/Interview";

function Home() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-2">🏠 Welcome to Job Tracker</h1>
      <p className="text-gray-600">
        Track all your job applications and interviews easily!
      </p>
    </div>
  );
}

function About() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-2">ℹ️ About Job Tracker</h1>
      <p className="text-gray-600">
        This app helps you organize job applications and stay on top of follow-ups.
      </p>
    </div>
  );
}

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="p-6 min-h-screen bg-gray-50">
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Private */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <PrivateRoute>
                  <Jobs />
                </PrivateRoute>
              }
            />
            <Route
              path="/interview"
              element={
                <PrivateRoute>
                  <Interview />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
