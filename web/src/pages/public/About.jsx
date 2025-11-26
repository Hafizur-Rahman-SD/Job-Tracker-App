import "../../styles/About.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <div className="about-container">
      {/* Header Section */}
      <section className="about-hero" data-aos="fade-up">
        <h1 className="about-title">About JobTracker</h1>
        <p className="about-subtitle">
          JobTracker is your personal assistant for managing job applications,
          interviews, and offers — built to keep you organized, confident, and focused
          on landing your dream job.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mission-section" data-aos="fade-up" data-aos-delay="100">
        <div className="mission-card">
          <h2>🎯 Our Mission</h2>
          <p>
            Our goal is simple — to make your job hunt stress-free.
            We help you stay organized, plan interviews, and track your
            progress so you never miss an opportunity again.
          </p>
        </div>

        <div className="mission-card">
          <h2>💡 Our Vision</h2>
          <p>
            To become the go-to platform for job seekers everywhere —
            combining simplicity, smart tracking, and data insights in one place.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section" data-aos="fade-up">
        <h2>⚙️ How It Works</h2>
        <div className="how-grid">
          <div className="how-step" data-aos="fade-up" data-aos-delay="100">
            <span className="step-number">1</span>
            <h3>Create Your Account</h3>
            <p>Sign up for free and start organizing your job search journey right away.</p>
          </div>
          <div className="how-step" data-aos="fade-up" data-aos-delay="200">
            <span className="step-number">2</span>
            <h3>Add Your Applications</h3>
            <p>Track each job you’ve applied to — with status, company details, and notes.</p>
          </div>
          <div className="how-step" data-aos="fade-up" data-aos-delay="300">
            <span className="step-number">3</span>
            <h3>Manage Interviews</h3>
            <p>Schedule interviews, add recruiter contacts, and get reminders easily.</p>
          </div>
          <div className="how-step" data-aos="fade-up" data-aos-delay="400">
            <span className="step-number">4</span>
            <h3>Track Your Success</h3>
            <p>Stay motivated with insights and progress stats to improve your journey.</p>
          </div>
        </div>
      </section>

      {/* Team Section 
      <section className="team-section" data-aos="fade-up">
        <h2>👥 Meet the Team</h2>
        <div className="team-grid">
          <div className="team-card" data-aos="zoom-in" data-aos-delay="100">
            <img src="https://i.pravatar.cc/150?img=32" alt="Founder" />
            <h3>Hafizur Rahman</h3>
            <p>Founder & Developer</p>
          </div>
          <div className="team-card" data-aos="zoom-in" data-aos-delay="200">
            <img src="https://i.pravatar.cc/150?img=47" alt="Designer" />
            <h3>UI/UX Designer</h3>
            <p>Design & User Experience</p>
          </div>
          <div className="team-card" data-aos="zoom-in" data-aos-delay="300">
            <img src="https://i.pravatar.cc/150?img=52" alt="Advisor" />
            <h3>Advisor</h3>
            <p>Career Strategy & Guidance</p>
          </div>
        </div>
      </section>
*/}

 
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-3">
      <h1 className="text-3xl font-bold text-gray-800">Contact:01605135004</h1>
      <p className="text-gray-600">Email: hafizurrahman5004@gmail.com</p>
      <p className="text-gray-600">Email: support@jobtracker.com</p>
    </div>
  );


      {/* Footer Section */}
      <footer className="about-footer" data-aos="fade-up">
        <p>© {new Date().getFullYear()} JobTracker | Made with ❤️ Hafizur Rahman</p>
      </footer>
    </div>
  );
}
