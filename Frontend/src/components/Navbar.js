

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [token, setToken] = useState(null);
 

  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    }, []); 

  return (
    <nav className="nav-item bg-first bd-bottom hpx-100">
      <div className="flex items-center w-50">
        <div className="img-div-logo text-xl">
          <img src="/assets/logo.png" alt="logo" />
          CarrierCatalyst
        </div>
        <div className="text-xl"></div>
      </div>

      {token ? (
        <div className="items">
          <ul className="flex gap-200 text-md mfr-100">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/categories">Reference</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  localStorage.removeItem("token");
                  setToken(null);
                  
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="items">
          <ul className="flex gap-300 text-md mfr-100">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/categories">Reference</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
