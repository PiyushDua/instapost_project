import React from 'react';
import { Link } from 'react-router-dom';
const NoMatch = () => (
  <div style={{ paddingTop: '9rem' }}>
    <center>
      <h1>Not Found !</h1>
      <p> Seems Like You have encountered at wrong page </p>
      <Link to="/">Return to Home Page</Link>
    </center>
  </div>
);
export default NoMatch;