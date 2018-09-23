import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Gravatar from 'react-gravatar';

/*
  TODO:IMPLEMENT PROFILE LOGIC
 */
class Profile extends Component {
    constructor(props) {
        super(props);
        this.displayGrades = this.displayGrades.bind(this);
    }

    displayGrades() {
        let string = this.props.user.grades[0];
        if(this.props.user.grades[1])
            string += `/${this.props.user.grades[1]}`;
        if(this.props.user.grades[2])
            string += `/${this.props.user.grades[2]}`;
        this.props.divisions.forEach((division) => {
            if(division.cuid === this.props.user.division)
                string += ` ${division.acronym}`;
        });
        return string;
    }

    render() {
        return (
            <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <Gravatar email={this.props.user.pseudo} default="identicon" className="user-image" />
                    <span className="hidden-xs">{ this.props.user.pseudo }</span>
                </a>
                <ul className="dropdown-menu">
                    <li className="user-header">
                        <Gravatar email={this.props.user.pseudo} default="identicon" className="img-circle" />
                        <p>
                            { this.props.user.pseudo }
                        <small>{this.displayGrades()}</small>
                        </p>
                    </li>
                    <li className="user-footer">
                        <div className="pull-left">
                            <Link
                                className="btn btn-default btn-flat"
                                to={`/user/stats/${this.props.user.pseudo}`}>Profile</Link>
                        </div>
                        <div className="pull-right">
                            <Link to="/" className="btn btn-default btn-flat" onClick={ this.props.logout }>Déconnexion</Link>
                        </div>
                    </li>
                </ul>
            </li>
        );
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    divisions: PropTypes.array.isRequired,
};

export default Profile;
