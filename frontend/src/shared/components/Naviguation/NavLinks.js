import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Annonces
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/annonces">Mes Annonces</NavLink>
      </li>
      <li>
        <NavLink to="/annonces/nouveau">Nouveau annonce</NavLink>
      </li>
      <li>
        <NavLink to="/auth">S'authentifier</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
