import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const isCandiate = false;
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Annonces
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/annonces">Mes Annonces</NavLink>
        </li>
      )}
      {/* This one should be visible only if loggedIn AND isCandidate */}
      {auth.isLoggedIn && isCandiate && (
        <li>
          <NavLink to="/u1/postulations">Mes Postulations</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/annonces/nouvel">Nouveau annonce</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>Se déconnecter</button>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">S'authentifier</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
