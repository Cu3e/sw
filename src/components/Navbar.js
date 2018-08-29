import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar is-link">
      <div className="navbar-start">
        <h1 className="navbar-item title">Service Worker</h1>
      </div>
      <div className="navbar-end">
        <a className="navbar-item" href="https://github.com/Cu3e/sw">
          Github
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
