import React, { useEffect } from 'react';
import logo from '../assets/logo.png';
import Footer from '../Components/Footer';

const Privacy = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Handle intersection observer for animations
    const sections = document.querySelectorAll('.privacy-section');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    });

    sections.forEach(section => observer.observe(section));

    // Cleanup function to remove event listeners
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => { });
      });
    };
  }, []);

  return (
    <div>
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          overflow-x: hidden;
        }
        
        header {
          background-color: #f8f9fa;
          padding: 3rem 0;
          position: relative;
          color: rgb(15, 15, 16);
        }
        
        header h1 {
    animation: fadeInUp 2s ease-out;
    font-size: 3rem; /* Increase font size here */
    margin-bottom: 1rem; /* Adjust margin if necessary */
  }

        
        header p {
          color: blue;
          animation: fadeInUp 3s ease-out;
        }
        
        .privacy-section {
          animation: slideIn 1.5s ease-out;
          opacity: 0;
        }
        
        .privacy-section.visible {
          opacity: 1;
        }
        
        .bg-light {
          background-color: #f8f9fa;
        }
        
        .text-center {
          text-align: center;
        }
        
        .py-5 {
          padding: 3rem 0;
        }
        
        .h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #454ef5;
        }
        
        .fw-bold {
          font-weight: bold;
        }
        
        .lead {
          color: rgb(15, 16, 16);
          font-size: 1.25rem;
        }
        
        /* Keyframe Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .container {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 15px;
        }
      `}</style>

      <header className="bg-light text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Privacy Policy</h1>
          <p className="lead">Your privacy is critically important to us. This policy explains how we collect, use, and share information about you.</p>
        </div>
      </header>

      <section id="info-collect" className="privacy-section bg-light py-5">
        <div className="container text-center">
          <h2 className="h2 fw-bold mb-4">Information We Collect</h2>
          <p className="lead">We collect information directly from you, from third parties, and automatically through your use of our services.</p>
        </div>
      </section>

      <section id="use-info" className="privacy-section bg-light py-5">
        <div className="container text-center">
          <h2 className="h2 fw-bold mb-4">How We Use Your Information</h2>
          <p className="lead">We use the information we collect to provide, maintain, and improve our services, and to communicate with you.</p>
        </div>
      </section>

      <section id="your-rights" className="privacy-section bg-light py-5">
        <div className="container text-center">
          <h2 className="h2 fw-bold mb-4">Your Rights</h2>
          <p className="lead">You have the right to access, correct, or delete your personal information. You can also object to our processing of your data.</p>
        </div>
      </section>

      <section id="contact" className="privacy-section bg-light py-5">
        <div className="container text-center">
          <h2 className="h2 fw-bold mb-4">Contact Us</h2>
          <p className="lead">If you have any questions about this Privacy Policy, please contact us at campusconnect@gmail.com.</p>
        </div>
      </section>
    </div>
    
  );
};

export default Privacy;
