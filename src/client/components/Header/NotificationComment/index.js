import React, { Component } from "react";
import { Link } from "react-router-dom";

/*
  TODO:IMPLEMENT NOTIFICATION COMMENT LOGIC
 */
class NotificationComment extends Component {

    render() {
        return (
            <li className="dropdown notifications-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-envelope-o"/>
                    <span className="label label-success">2</span>
                </a>
                <ul className="dropdown-menu">
                    <li className="header">Vous avez 2 commentaires</li>
                    <li>
                        <ul className="menu">
                            <li>
                                <Link to="/">
                                    <h4>
                                        Damien Meur
                                    <small className="pull-right"><i className="fa fa-clock-o"/> 5 mins</small>
                                    </h4>
                                    <p>Meilleur synthèse ever ! </p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <h4>
                                        John Doe
                                        <small className="pull-right"><i className="fa fa-clock-o"/> 2 heures</small>
                                    </h4>
                                    <p>Ta mère ! </p>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="footer"><Link to="/">Voir tout les commentaires</Link></li>
                </ul>
            </li>
        );
    }
}

export default NotificationComment;
