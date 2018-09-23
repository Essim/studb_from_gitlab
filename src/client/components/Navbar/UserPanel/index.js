import React, { Component } from "react";
import { Link } from "react-router-dom";
import Gravatar from 'react-gravatar';
import PropTypes from 'prop-types';

/*
    TODO : IMPLEMENT USER PANEL LOGIC
 */
class UserPanel extends Component {

  render() {
    return (
        <div className="user-panel">
            <div className="pull-left image">
                <Gravatar email={this.props.user.pseudo} default="identicon" className="img-circle" />
            </div>
            <div className="pull-left info">
                <p><Link
                    to={`/user/stats/${this.props.user.pseudo}`}>{this.props.user.pseudo}</Link></p>
                <a><i className="fa fa-circle text-success"/>En ligne</a>
            </div>
        </div>
    );
  }
}

UserPanel.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserPanel;
