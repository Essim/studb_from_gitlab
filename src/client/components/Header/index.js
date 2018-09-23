import Notification from "./Notification";
import NotificationComment from "./NotificationComment";
import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Profile from "./Profile/index";
import { connect } from 'react-redux';
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import { logout } from "../SignIn/action";
import Upload from "../Upload";


export class Header extends Component {

    customMenu() {
        return this.props.signin.connected ?
            <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                    <li className="notifications-menu">
                        <Link to="/">
                                <i className="fa fa-home"/>
                                &nbsp; Accueil
                        </Link>
                    </li>
                    <Upload/>
                    <Profile user={ this.props.signin.user } logout={ this.props.logout } divisions={this.props.divisions.divisions}/>
                </ul>
            </div>:
            <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                    <li>
                        <Route path="/" component={SignIn} />
                    </li>
                </ul>
            </div>;
    }


    render() {
        return (
            <header className="main-header">
                <Link to="/" className="logo">
                    <span className="logo-mini"><b>STU</b>DB</span>
                    <span className="logo-lg"><b>Student</b>DB</span>
                </Link>
                <nav className="navbar navbar-static-top">
                    { this.customMenu() }
                    <SignUp/>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      divisions: state.divisions,
      signin: state.signin,
  };
}

const mapDispatchToProps = {
    logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
