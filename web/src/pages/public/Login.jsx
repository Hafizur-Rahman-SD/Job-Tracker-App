import "../../styles/auth.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple, FaLinkedinIn } from "react-icons/fa";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else navigate("/dashboard");
  };

  const handleOAuth = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) alert(error.message);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>
        <p className="auth-sub">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
          />
          <button className="auth-btn" type="submit">
            Login
          </button>
        </form>

        <div className="social-icons">
          <div className="social-icon"><FaApple /></div>
          <div className="social-icon" onClick={() => handleOAuth("facebook")}><FaFacebookF /></div>
          <div className="social-icon" onClick={() => handleOAuth("linkedin")}><FaLinkedinIn /></div>
          <div className="social-icon" onClick={() => handleOAuth("google")}><FcGoogle /></div>
        </div>

        <div className="auth-footer">
          Forgot your password?{" "}
          <Link to="/reset">Reset here</Link>
        </div>
      </div>
    </div>
  );
}
