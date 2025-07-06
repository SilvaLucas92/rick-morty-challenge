import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import "./Navbar.scss";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="navbar">
      <nav className="navbar-container" aria-label="Main navigation">
        <Link
          to="/"
          className="navbar-title"
          onClick={closeMenu}
          aria-label="Go to home page"
        >
          Rick & Morty
        </Link>

        <button
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="navbar-menu"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <HiX className="navbar-icon" aria-hidden="true" />
          ) : (
            <HiMenu className="navbar-icon" aria-hidden="true" />
          )}
        </button>

        <ul
          className={`navbar-menu ${isMenuOpen ? "active" : ""}`}
          id="navbar-menu"
        >
          <li>
            <Link
              to="/"
              className={`navbar-item ${isActive("/") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className={`navbar-item ${
                isActive("/favorites") ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              Favorites
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
