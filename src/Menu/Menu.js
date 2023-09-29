import React from 'react';

import{
    Link
  } from "react-router-dom";


function Menu() {
  return (
    <nav role="navigation">         
        <div className="menu">
            <ul className="menu">
                <li role="menuitem"><Link to="/">Homepage</Link></li>
                <li role="menuitem"><Link to="about">About</Link></li>
                <li role="menuitem"><Link to="login" title="link which redirects to login page">Login</Link></li> 
            </ul>
        </div>
    </nav>
  );
}

export default Menu;
