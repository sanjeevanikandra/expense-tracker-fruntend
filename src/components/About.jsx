import React from 'react';

function About() {
  return (
    <section id="about" className="about">
    <div className="about-container">
      <h2>About ExpenseApp</h2>
      <p>
        <strong>ExpenseApp</strong> is designed to help users easily track their expenses, manage their budgets, 
        and gain insights into their spending habits. Whether you're saving for a big purchase 
        or just trying to keep track of daily expenses, our app provides a user-friendly solution.
      </p>
      <div className="about-columns">
        <div className="column">
          <h3>Our Mission</h3>
          <p>
            Developed with a focus on simplicity and efficiency, ExpenseApp aims to make financial tracking 
            straightforward. Our mission is to empower individuals to take control of their finances and 
            make informed decisions about their spending.
          </p>
        </div>
        <div className="column">
          <h3>Our Team</h3>
          <p>
            Created by a team of passionate developers, our goal is to help people stay on top of their 
            finances without the stress. We believe managing money should be easy and accessible to everyone.
            Our team continuously works on improving the app based on user feedback and the latest financial 
            trends.
          </p>
        </div>
        <div className="column">
          <h3>Join Our Community</h3>
          <p>
            We invite you to join our growing community of users who are taking charge of their financial 
            future. Share your experiences, tips, and feedback with us, and help us create an even better 
            ExpenseApp for everyone!
          </p>
        </div>
      </div>
    </div>
</section>

  
  );
}

export default About;
