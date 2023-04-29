import React from 'react';
import { Link } from 'react-router-dom';
import './explore.css';

function Explore() {
  return (
    <div>
      <div className="services">
        <div>
          <h3>Local Banks</h3>
          <p>Find the best local banks, their locations, and the most competitive mortgage rates in the city.</p>
          <Link to="/local-banks">Explore Local Banks</Link>
        </div>
        <div>
          <h3>Car Dealerships</h3>
          <p>Discover reliable dealerships for car loans and new vehicle purchases in Winnipeg.</p>
          <Link to="/dealerships">Find Dealerships</Link>
        </div>
        <div>
          <h3>Winnipeg Neighborhoods</h3>
          <p>Learn about the best and worst neighborhoods in Winnipeg based on crime rate statistics.</p>
          <Link to="/neighborhoods">View Neighborhoods</Link>
        </div>
        <div>
          <h3>Local Professionals</h3>
          <p>Connect with trusted realtors, lawyers, and doctors in the Winnipeg area.</p>
          <Link to="/professionals">Meet Professionals</Link>
        </div>
        <div>
          <h3>Credit Cards</h3>
          <p>Compare various credit card options tailored to new immigrants' financial needs.</p>
          <Link to="/credit-cards">Compare Credit Cards</Link>
        </div>
        <div>
          <h3>Top Schools in Winnipeg</h3>
          <p>Discover the best schools in Winnipeg for your children. Find information on schools, rankings, and more.</p>
          <Link to="/schools">Find Schools</Link>
        </div>
        <div>
          <h3>Best Kindergartens in Winnipeg</h3>
          <p>Find the perfect kindergarten for your little ones in Winnipeg. Explore our list of top kindergartens.</p>
          <Link to="/kindergartens">Find Kindergartens</Link>
        </div>
      </div>
    </div>
  );
}

export default Explore;
