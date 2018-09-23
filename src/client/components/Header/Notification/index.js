import React, { Component } from "react";
import { Link } from "react-router-dom";
/*
  TODO:IMPLEMENT NOTIFICATION LOGIC
 */
class Notification extends Component {

    render() {
        return (
            <li className="dropdown notifications-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-bell-o"/>
                    <span className="label label-warning">2</span>
                </a>
                <ul className="dropdown-menu">
                    <li className="header">Vous avez 2 notifications</li>
                    <li>
                        <ul className="menu">
                            <li>
                                <Link to="/">
                                    <i className="fa fa-code-fork text-aqua"/> Nouvelle version de la synthèse X
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i className="fa fa-file text-yellow"/> Nouvellle synthèse pour Atelier Java
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="footer"><Link to="/">Afficher tout</Link></li>
                </ul>
            </li>
        );
    }
}

export default Notification;
