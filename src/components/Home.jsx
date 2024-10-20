import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import About from './About';
import { Element } from 'react-scroll';

function Home() {
  return (
    <>
      <Navbar />
      <div>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <h1>Welcome to ExpenseApp</h1>
            <p>Track your expenses, control your budget, and save smarter.</p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
              <Link to="/login" className="btn btn-secondary">Log In</Link>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="features-container">
            <div className="feature">
              <i className="icon-track fa fa-chart-line"></i>
              <h3>Track Your Expenses</h3>
              <p>
                Keep track of every penny spent by logging your expenses in real-time.
                Our user-friendly interface helps you categorize expenses for better
                insights. Easily identify spending patterns and make informed decisions.
              </p>
            </div>
            <div className="feature">
              <i className="icon-budget fa fa-money-bill-wave"></i>
              <h3>Set Budgets</h3>
              <p>
                Set monthly limits for various categories, such as groceries,
                entertainment, and bills, to avoid overspending. Receive alerts
                when you're close to reaching your budget limits, keeping you
                financially disciplined.
              </p>
            </div>
            <div className="feature">
              <i className="icon-visualize fa fa-chart-pie"></i>
              <h3>Visualize Trends</h3>
              <p>
                See where your money goes with interactive charts and graphs.
                Visualize your spending habits over time to easily identify areas
                for improvement and track your financial goals.
              </p>
            </div>
            <div className="feature">
              <i className="icon-reports fa fa-file-alt"></i>
              <h3>Generate Reports</h3>
              <p>
                Receive detailed monthly reports that summarize your spending,
                income, and savings. Use these insights to better understand your
                financial health and plan for the future.
              </p>
            </div>
            <div className="feature">
              <i className="icon-security fa fa-lock"></i>
              <h3>Secure Your Data</h3>
              <p>
                Your financial data is protected with advanced encryption and
                security protocols. We prioritize your privacy and ensure that
                your sensitive information remains confidential and secure.
              </p>
            </div>
          </div>
        </section>
        <Element name="about">  
          <About />
        </Element>

      </div>
      <Footer />
    </>

  );
}

export default Home;
