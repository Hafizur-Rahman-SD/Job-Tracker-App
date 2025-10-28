import { Link } from "react-router-dom";
import "../../styles/Home.css"; // external CSS
import { motion } from "framer-motion";
import { Briefcase, CalendarDays, ChartLine } from "lucide-react";

export default function Home() {
  return (
    <div className="home-container">
      {/* HERO */}
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">Stay Organized. Land Your Dream Job.</h1>
          <p className="hero-subtitle">
            Job Tracker helps you keep every job application, interview, and offer
            neatly organized — so you can focus on getting hired.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="btn-primary">Get Started</Link>
            <Link to="/about" className="btn-secondary">Learn More</Link>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <motion.div
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Briefcase className="feature-icon icon-blue" size={42} />
          <h3>Track Applications</h3>
          <p>Log where you’ve applied, when, and keep notes on follow-ups & feedback.</p>
        </motion.div>

        <motion.div
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <CalendarDays className="feature-icon icon-green" size={42} />
          <h3>Manage Interviews</h3>
          <p>Never miss an interview. Store details, reminders, and recruiter contacts.</p>
        </motion.div>

        <motion.div
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <ChartLine className="feature-icon icon-yellow" size={42} />
          <h3>View Your Progress</h3>
          <p>Visualize your job search journey with stats and performance insights.</p>
        </motion.div>
      </section>

      {/* CTA */}
      <motion.section
        className="cta-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2>Ready to organize your career journey?</h2>
        <Link to="/signup" className="btn-primary cta-btn">
          Create Free Account
        </Link>
      </motion.section>

      <section className="why-section">
  <h2>Why Choose JobTracker?</h2>
  <div className="why-grid">
    <div className="why-card">
      <h3>🧭 Stay Organized</h3>
      <p>Keep every job application and interview neatly tracked in one place.</p>
    </div>
    <div className="why-card">
      <h3>⏰ Save Time</h3>
      <p>Stop digging through emails — find all your job details instantly.</p>
    </div>
    <div className="why-card">
      <h3>📈 See Progress</h3>
      <p>Understand your application trends with clean dashboards and charts.</p>
    </div>
  </div>
</section>


      <footer className="footer">© {new Date().getFullYear()} Job Tracker | Made with ❤️ by You</footer>
    </div>
  );
}
