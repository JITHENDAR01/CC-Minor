import React, { useEffect } from 'react';
import img1 from '../assets/AboutUs1.jpg';
import img2 from '../assets/AboutUs2.jpg';
import img3 from '../assets/AboutUs3.jpg';

const AboutUs = () => {
  useEffect(() => {
    const statsItems = document.querySelectorAll('.stats div');

    const handleScroll = () => {
      statsItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          item.style.transition = 'all 0.6s ease';
          item.style.opacity = 1;
          item.style.transform = 'translateY(0)';
        }
      });
    };

    statsItems.forEach(item => {
      item.style.opacity = 0;
      item.style.transform = 'translateY(20px)';
    });

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about-us">
      <style>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          line-height: 1.6;
          color: #333;
        }
        .about-us {
          background-color: #f9f9f9;
        }
        .about-header {
          text-align: center;
          padding: 50px 20px;
          background-color: #f5f5f5;
          transition: color 0.3s ease;
        }
        .about-header h1:hover {
          color: #0f6def; /* Change color on hover */
        }
        .about-header h1 {
          font-size: 3rem;
          font-weight: bold;
        }
        .intro-text {
          color: #333;
          max-width: 800px;
          margin: 0 auto;
        }
        h2 {
          color: #454ef5;
        }
        .chapter {
          padding: 40px 20px;
        }
        .chapter-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px; /* Add consistent gap between text and image */
        }
        .chapter-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .chapter-text h2, .chapter-text p {
          margin: 0;
          padding: 0;
        }
        .chapter-text h2 {
          font-size: 2.5rem;
          color: #454ef5;
          margin-bottom: 15px;
        }
        .chapter-text p {
          font-size: 1.2rem;
          color: #101111;
        }
        .chapter-image {
          flex: 1;
          text-align: center;
        }
        .chapter-image img {
          height: 300px;
          transition: transform 0.3s ease;
        }
        .chapter-image img:hover {
          transform: scale(0.9);
        }
        .reverse {
          flex-direction: row-reverse;
        }
        .stats {
          display: flex;
          justify-content: space-around;
          padding: 20px;
          background-color: #f0f0f0;
        }
        .stats div {
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
        }
        .stats h3 {
          font-size: 2rem;
          color: #081114;
        }
        .stats p {
          font-size: 1rem;
          color: #0ec4ed;
        }
        @media (max-width: 768px) {
          .chapter-content {
            flex-direction: column;
          }
          .chapter-image {
            margin-top: 20px;
          }
          .chapter-image img {
            max-width: 100%;
          }
        }
      `}</style>

      <header className="about-header">
        <h1>Our Mission</h1>
        <p className="intro-text">Our mission is to create a safe, supportive, and vibrant community tailored to the needs of college students. We aim to foster connections that will help students both in their studies and in their future careers, giving them tools to network, find opportunities, and grow as individuals.</p>
      </header>

      <section className="chapter">
        <div className="chapter-content">
          <div className="chapter-text">
            <h2>Welcome to CampusConnect!</h2>
            <p>CampusConnect is an exclusive online platform designed by students, for students. Our goal is to bridge the gap between academics and social life, providing a dynamic space where college students can connect, collaborate, and share knowledge. At CampusConnect, we believe college is more than lectures and textbooks – it’s a time to grow, network, and make lifelong friends.</p>
          </div>
          <div className="chapter-image">
            <img src={img1} alt="Chapter 1" />
          </div>
        </div>
      </section>

      <section className="chapter">
        <div className="chapter-content reverse">
          <div className="chapter-text">
            <h2>What We Offer</h2>
            <p>Networking Opportunities: CampusConnect lets you connect with peers not only within your college but across various fields and interests. It's a chance to meet people you might not cross paths with in your classes.</p>

            <p>Career & Skill-Building Resources: Join discussions on career planning, internships, skill-building, and future career paths. Connect with seniors and alumni who can share valuable insights into your field of interest.</p>
          </div>
          <div className="chapter-image">
            <img src={img2} alt="Chapter 2" />
          </div>
        </div>
      </section>

      <section className="chapter">
        <div className="chapter-content">
          <div className="chapter-text">
            <h2>Why CampusConnect?</h2>
            <p>CampusConnect is made exclusively for college students, ensuring a safe and comfortable space where everyone shares a similar journey. Our commitment to privacy means that only verified students can join, and we’re always looking for ways to enhance our platform based on your feedback. We’re more than a social network; we’re a campus community.</p>
          </div>
          <div className="chapter-image">
            <img src={img3} alt="Chapter 3" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
