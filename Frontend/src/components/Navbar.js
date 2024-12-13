import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'

function Navbar() {
  return (
    <nav className='nav-item bg-first bd-bottom hpx-100'>
      
     <div className="flex items-center w-50">
     <div className='img-div-logo text-xl'><img src="/assets/logo.png" alt="logo" />CarrierCatalyst</div>
     <div className='text-xl'></div>
     </div>
      
     <div className="items">
     <ul className='flex gap-300 text-md mfr-100'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/categories">Reference</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Login</Link></li>
     </ul>
     </div>
    </nav>
  );
}

export default Navbar;

