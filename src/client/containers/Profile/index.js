import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Switch, Route } from 'react-router-dom';

import { fetchUser, fetchConnectedUser, fetchDocuments } from "./action";

import { searchFeed } from "../Feed/action";

import ProfileSettingsPage from '../../components/ProfileSettingsPage/index';
import ProfileStatsPage from '../../components/ProfileStatsPage/index';

import {ADMIN_ROLE} from "../../constants";

const STATS = 0;
const SETTINGS = 1;

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.displaySettingsLink = this.displaySettingsLink.bind(this);
        this.displayHeader = this.displayHeader.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.displayProfile = this.displayProfile.bind(this);
        this.displayAdminLink = this.displayAdminLink.bind(this);
        this.changeActiveTab = this.changeActiveTab.bind(this);
        this.className = this.className.bind(this);
        props.history.listen((location) => {
            this.updateUser(location);
        });
        this.state = {
            stats: true,
            settings: false,
        }
    }

    componentDidMount() {
        this.updateUser(this.props.location);
        if(this.props.location.pathname.split("/")[2] === 'settings') {
            this.changeActiveTab(SETTINGS);
        } else {
            this.changeActiveTab(STATS);
        }
    }

    updateUser(location) {
        const pseudo = location.pathname.split("/")[3];
        if(pseudo !== this.props.profile.user.pseudo){
            if(pseudo === this.props.signin.user.pseudo) {
                this.props.fetchConnectedUser(this.props.signin.user);
            } else if (!this.props.profile.isFetchingUser) {
                this.props.fetchUser(pseudo);
            }
        }
        this.props.fetchDocuments();
    }

    // Used to see which tab is activate
    changeActiveTab(tab) {
        switch (tab) {
            case STATS:
                return this.setState({
                    stats: true,
                    settings: false,
                });
            case SETTINGS:
                return this.setState({
                    stats: false,
                    settings: true,
                });
        }
    }

    // Return the active className for the correct tab
    className(tab) {
        switch (tab) {
            case STATS:
                if(this.state.stats)
                    return "active";
                return "";
            case SETTINGS:
                if(this.state.settings)
                    return "active";
                return "";
        }
    }

    /* Choose which profile to display :
     *      - If it is the profile of the connected user, display : "Mon Profil".
     *      - If not display : Profil de + pseudo of the connected user.
     */
    displayHeader() {
        if(this.props.signin.user.pseudo === this.props.profile.user.pseudo) {
            return(
                <h3 className="box-title">Mon Profil</h3>
            );
        }
        return(<h3 className="box-title">Profil de {this.props.profile.user.pseudo}</h3>);
    }

    // If profile of the connected user : display the settings link
    displaySettingsLink() {
        if(this.props.signin.user.pseudo === this.props.profile.user.pseudo) {
           return(
               <li className={this.className(SETTINGS)}>
                   <Link
                       onClick={() => this.changeActiveTab(SETTINGS)}
                       to={`/user/settings/${this.props.profile.user.pseudo}`}>Paramètres</Link>
               </li>
           );
        }
        return '';
    }

    //If profile of the connected user AND connected user is an admin display the admin link
    displayAdminLink() {
        if(this.props.signin.user.role === ADMIN_ROLE
            && this.props.signin.user.pseudo === this.props.profile.user.pseudo)
            return(<li>
                <Link to='/admin/users' replace>Zone Admin</Link>
            </li>);
        return '';
    }

    //Used to display the elements of the profile component
    displayProfile() {
        const user = this.props.location.pathname.split("/")[3];
        if(Object.keys(this.props.profile.user).length === 0)
            return(<p>{user} n'est pas connus de nos serveurs</p>);
        if(this.props.profile.isFetchingUser)
            return(<p>Le profil de {user} est en cours de chargement</p>);
        return(
            <div className="row">
                <div className="col-md-12">
                    <div className="nav-tabs-custom">
                        <ul className="nav nav-tabs">
                            <li className={this.className(STATS)}>
                                <Link
                                    onClick={() => this.changeActiveTab(STATS)}
                                    to={`/user/stats/${this.props.profile.user.pseudo}`}>Statistiques</Link>
                            </li>
                            {this.displaySettingsLink()}
                            <li>
                                <Link
                                    to="/"
                                    replace
                                    onClick={() => {
                                        this.props.searchFeed([{label:user,value:user,nav:true}])
                                    }}>Documents</Link>
                            </li>
                            { this.displayAdminLink() }
                        </ul>
                        <div className="tab-content">
                            <div className="active tab-pane">
                                <Switch>
                                    <Route path='/user/stats' component={ProfileStatsPage} />
                                    <Route path='/user/settings' component={ProfileSettingsPage} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }

    render() {
        return(<div className="row">
            <div className="col-md-12">
                <div className="box">
                    <div className="box-header with-border">
                        {this.displayHeader() }
                    </div>
                    <div className="box-body">
                        { this.displayProfile() }
                    </div>
                </div>
            </div>
        </div>);
    }
}

Profile.propTypes = {
    signin: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    fetchUser: PropTypes.func.isRequired,
    fetchConnectedUser: PropTypes.func.isRequired,
    fetchDocuments: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    searchFeed: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        signin: state.signin,
        profile: state.profile,
    };
}

const mapDispatchToProps = {
    fetchUser,
    fetchConnectedUser,
    fetchDocuments,
    searchFeed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
