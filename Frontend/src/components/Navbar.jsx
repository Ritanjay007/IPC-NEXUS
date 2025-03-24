import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Components.css';

const Navbar = ({ branches }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm">
      <div className="container">
        {/* Brand / Logo */}
        <a className="navbar-brand fw-bold fs-4 text-info" href="/">
          IPC Nexus
        </a>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* Dropdown for Laws */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                id="branchesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Laws
              </a>
              <ul className="dropdown-menu bg-black border-0">
                {branches.map((branch, index) => (
                  <li key={index}>
                    <Link
                      className="dropdown-item text-white"
                      to={`/${branch.toLowerCase().replace(/\s/g, '-')}`}
                      style={{
                        transition: 'color 0.3s ease',
                      }}
                      onMouseEnter={(e) => (e.target.style.color = 'lightblue')}
                      onMouseLeave={(e) => (e.target.style.color = 'white')}
                    >
                      {branch}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* New Buttons for Features */}
            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold"
                to="/register-complaint"
                style={{
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'lightblue')}
                onMouseLeave={(e) => (e.target.style.color = 'white')}
              >
                Register Complaint
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold"
                to="/complaint-history"
                style={{
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'lightblue')}
                onMouseLeave={(e) => (e.target.style.color = 'white')}
              >
                Complaint History
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white fw-semibold"
                href="/IPCSections"
                style={{
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'lightblue')}
                onMouseLeave={(e) => (e.target.style.color = 'white')}
              >
                IPC Sections
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white fw-semibold"
                href="/about"
                style={{
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'lightblue')}
                onMouseLeave={(e) => (e.target.style.color = 'white')}
              >
                About Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
