import React from 'react';

const Landing = () => {
  return (
    <section class='landing'>
      <div class='dark-overlay'>
        <div class='landing-inner'>
          <h1 class='x-large'>Developer Networker</h1>
          <p class='lead'>
            Create a developer profile and connect with developers over the
            network
          </p>
          <div class='buttons'>
            <a href='register.html' class='btn btn-primary'>
              Sign Up
            </a>
            <a href='login.html' class='btn'>
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
