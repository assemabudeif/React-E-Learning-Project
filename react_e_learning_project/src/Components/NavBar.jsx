import React from "react";
// import logo  form '../../imags/logo.jpg';
import logo from "../imags/logo/logo.png";
// import { a } from "react-router-dom";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const state = useSelector((state) => state.handleCart);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} style={{ width: "150px" }} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {/* /*عشان ييجى ف التص */}
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/products">
                  Learn
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="about">
                  About
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="contact">
                  Contact Us
                </a>
              </li>
            </ul>
            <div className="buuttons">
              <a href="login" className="btn btn-outline-dark ms-3">
                <i className="fa fa-sign-in me-1"></i>Login
              </a>

              <a href="register" className="btn btn-outline-dark ms-3 ">
                <i className="fa fa-user-plus me-1"></i>Register
              </a>

              <a href="cart" className="btn btn-outline-dark  ms-3">
                <i className="fa fa-shopping-cart me-1"></i>Cart ({state.length}
                )
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
