import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {

  const auth = useContext(AuthContext);
  let userConnected = "";
  if(auth.isLoggedIn){
    userConnected = auth.__t
  }
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Annonces
        </NavLink>
      </li>
      { (auth.isLoggedIn && userConnected === 'Recruiter') ? (
        <>
        <li>
          <NavLink to="/user/annonces">Mes Annonces</NavLink>
        </li>
        <li>
        <NavLink to="/annonces/nouvel">Nouvel annonce</NavLink>
      </li>
      </>
      ):(
        auth.isLoggedIn &&
        <li>
          <NavLink to="/user/postulations">Mes Candidatures</NavLink>
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
