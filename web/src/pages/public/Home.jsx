import "../../styles/Home.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" data-aos="fade-up">
        <h1 className="hero-title">Stay Organized. Land Your Dream Job.</h1>
        <p className="hero-subtitle">
          JobTracker helps you keep every job application, interview, and offer neatly organized —
          so you can focus on getting hired.
        </p>
        <div className="hero-buttons">
          <Link to="/signup" className="btn-primary">Get Started</Link>
          <Link to="/about" className="btn-secondary">Learn More</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
          <h3>📋 Track Applications</h3>
          <p>Log where you’ve applied, when, and track follow-ups and feedback easily.</p>
        </div>
        <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
          <h3>🗓 Manage Interviews</h3>
          <p>Never miss an interview — store details, reminders, and recruiter contacts.</p>
        </div>
        <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
          <h3>📈 View Your Progress</h3>
          <p>Visualize your job search journey with clear dashboards and insights.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" data-aos="fade-up">
        <h2>Ready to organize your career journey?</h2>
        <Link to="/signup" className="btn-primary">Create Free Account</Link>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat" data-aos="zoom-in" data-aos-delay="100">
          <h3>500+</h3>
          <p>Jobs Tracked</p>
        </div>
        <div className="stat" data-aos="zoom-in" data-aos-delay="200">
          <h3>120+</h3>
          <p>Active Users</p>
        </div>
        <div className="stat" data-aos="zoom-in" data-aos-delay="300">
          <h3>98%</h3>
          <p>User Satisfaction</p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-section">
        <h2 data-aos="fade-up">Why Choose JobTracker?</h2>
        <div className="why-grid">
          <div className="why-card" data-aos="fade-up" data-aos-delay="100">
            <h3>🧭 Stay Organized</h3>
            <p>Keep all your job applications and interviews neatly tracked in one place.</p>
          </div>
          <div className="why-card" data-aos="fade-up" data-aos-delay="200">
            <h3>⏰ Save Time</h3>
            <p>Stop digging through emails — find all your job details instantly.</p>
          </div>
          <div className="why-card" data-aos="fade-up" data-aos-delay="300">
            <h3>📊 See Progress</h3>
            <p>Understand your trends with clean dashboards and charts.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" data-aos="fade-up">
        <p>© {new Date().getFullYear()} JobTracker. Built with ❤️ Hafizur Rahman.</p>
      </footer>
    </div>
  );
}
