import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const Navbar = (props) => {
  const url = window.location.pathname
  const history = useHistory();

  function logout(e) {
    e.preventDefault()
    localStorage.removeItem("user")
    sessionStorage.removeItem("user")
    window.location.reload()
  }
  const [user, setUser] = useState(null)
  useEffect(() => {
    if (user == null) {
      let dbUser = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
      setUser(dbUser);
    } else {
    }
  }, [user])

  return (
<nav className="topbar topbar-inverse topbar-expand-md topbar-sticky">
        <div className="container">
          <div className="topbar-left">
            <button className="topbar-toggler">☰</button>
            <Link className="topbar-brand" to="/">
              <img className="logo-default" src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} alt="logo" />
              <img className="logo-inverse" src={`${process.env.PUBLIC_URL}/assets/img/logo-light.png`} alt="logo" />
            </Link>
          </div>
          <div className="topbar-right">
            <ul className="topbar-nav nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Accueil</Link>
              </li>
              <li className="nav-item">
                <Link classname="nav-link" to="/articles/create">Ecrire un article</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Mon compte
                  <i className="fa fa-caret-down" />
                </a>
                <div className="nav-submenu">
                  <a className="nav-link" href="/mesArticles">Mes articles</a>
                  <a to="/" className="nav-link" href>Déconnexion</a>
                </div>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/login">Se connecter</Link>
              </li>

              <li className="nav-item">
                  <a className="nav-link" href="/signup">S'inscrire</a>
              </li>

            </ul>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;