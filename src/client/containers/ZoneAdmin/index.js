import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Route, Switch } from 'react-router-dom';

import { fetchDocuments, fetchDivisions, fetchUsers,
    toggleRefreshDivisions,
    toggleRefreshDocuments,
    toggleRefreshComments,
    toggleRefreshCourses,
    toggleRefresh } from "./action";

import ZoneUsers from './components/ZoneUsers';
import ZoneDocuments from './components/ZoneDocuments';
import ZoneComments from './components/ZoneComments';
import ZoneDivisions from './components/ZoneDivisions';
import ZoneCourses from './components/ZoneCourses';

import { ADMIN_ROLE } from "../../constants";

const USERS = 0;
const DOCUMENTS = 1;
const COMMENTS = 2;
const DIVISIONS = 3;
const COURSES = 4;

export class ZoneAdmin extends Component {
    constructor(props) {
        super(props);
        this.checkAccess = this.checkAccess.bind(this);
        this.changeActiveTab = this.changeActiveTab.bind(this);
        this.className = this.className.bind(this);
        this.state = {
            users: true,
            documents: false,
            comments: false,
            divisions: false,
            courses: false,
        };
    }

    componentDidMount() {
        this.props.fetchDivisions();
        this.props.fetchUsers();
        this.props.fetchDocuments();
        switch (this.props.history.location.pathname.split('/')[2]) {
            case 'comments':
                this.changeActiveTab(COMMENTS);
                break;
            case 'divisions':
                this.changeActiveTab(DIVISIONS);
                break;
            case 'documents':
                this.changeActiveTab(DOCUMENTS);
                break;
            case 'courses':
                this.changeActiveTab(COURSES);
                break;
            default:
                this.changeActiveTab(USERS);
        }
    }

    // Used to see which tab is active
    changeActiveTab(tab) {
        switch (tab) {
            case USERS:
                if(this.props.admin.refreshUsers)
                    this.props.toggleRefresh();
                return this.setState({
                    users: true,
                    documents: false,
                    comments: false,
                    divisions: false,
                    courses: false,
                });
            case DOCUMENTS:
                if(this.props.admin.refreshDocuments)
                    this.props.toggleRefreshDocuments();
                return this.setState({
                    users: false,
                    documents: true,
                    comments: false,
                    divisions: false,
                    courses: false,
                });
            case COMMENTS:
                if(this.props.admin.refreshComments)
                    this.props.toggleRefreshComments();
                return this.setState({
                    users: false,
                    documents: false,
                    comments: true,
                    divisions: false,
                    courses: false,
                });
            case DIVISIONS:
                if(this.props.admin.refreshDivisions)
                    this.props.toggleRefreshDivisions();
                return this.setState({
                    users: false,
                    documents: false,
                    comments: false,
                    divisions: true,
                    courses: false,
                });
            case COURSES:
                if(this.props.admin.refreshCourses)
                    this.props.toggleRefreshCourses();
                return this.setState({
                    users: false,
                    documents: false,
                    comments: false,
                    divisions: false,
                    courses: true,
                });
        }
    }

    // Return the active className for the correct tab
    className(tab) {
        switch (tab) {
            case USERS:
                if(this.state.users)
                    return "active";
                return "";
            case DOCUMENTS:
                if(this.state.documents)
                    return "active";
                return "";
            case COMMENTS:
                if(this.state.comments)
                    return "active";
                return "";
            case DIVISIONS:
                if(this.state.divisions)
                    return "active";
                return "";
            case COURSES:
                if(this.state.courses)
                    return "active";
                return "";
        }
    }

    //Display the admin zone if the connected user is an admin
    checkAccess() {
        if(this.props.signin.user.role === ADMIN_ROLE)
            return (
                <div className="nav-tabs-custom">
                    <ul className="nav nav-tabs">
                        <li className={this.className(USERS)}>
                            <Link
                                to="/admin/users"
                                onClick={() => this.changeActiveTab(USERS)}>Utilisateurs</Link>
                        </li>
                        <li className={this.className(DOCUMENTS)}>
                            <Link
                                to="/admin/documents"
                                onClick={() => this.changeActiveTab(DOCUMENTS)}>Documents</Link>
                        </li>
                        <li className={this.className(COMMENTS)}>
                            <Link
                                to="/admin/comments"
                                onClick={() => this.changeActiveTab(COMMENTS)}>Commentaires</Link>
                        </li>
                        <li className={this.className(DIVISIONS)}>
                            <Link
                                to="/admin/divisions"
                                onClick={() => this.changeActiveTab(DIVISIONS)}>Bacheliers</Link>
                        </li>
                        <li className={this.className(COURSES)}>
                            <Link
                                to="/admin/courses"
                                onClick={() => this.changeActiveTab(COURSES)}>Cours</Link>
                        </li>
                        <li>
                            <Link to={`/user/stats/${this.props.signin.user.pseudo}`} replace>Retour au profil</Link>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="active tab-pane">
                            <Switch>
                                <Route exact path="/admin/users" component={ZoneUsers} />
                                <Route exact path="/admin/documents" component={ZoneDocuments} />
                                <Route exact path="/admin/comments" component={ZoneComments} />
                                <Route exact path="/admin/divisions" component={ZoneDivisions} />
                                <Route exact path="/admin/courses" component={ZoneCourses} />
                            </Switch>
                        </div>
                    </div>
                </div>);
        return <p>Zone interdite</p>;
    }

    render() {
        return(
            <div className="row">
                <div className="col-md-12">
                    <div className="box">
                        <div className="box-header with-border">
                         <h3 className="box-title">Zone Administrateur</h3>
                        </div>
                        <div className="box-body">
                            <div className="row">
                                <div className="col-md-12">
                                    {this.checkAccess()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

ZoneAdmin.propTypes = {
    signin: PropTypes.object.isRequired,
    admin: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    fetchDocuments: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    fetchDivisions: PropTypes.func.isRequired,
    toggleRefresh: PropTypes.func.isRequired,
    toggleRefreshCourses: PropTypes.func.isRequired,
    toggleRefreshDivisions: PropTypes.func.isRequired,
    toggleRefreshDocuments: PropTypes.func.isRequired,
    toggleRefreshComments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        signin: state.signin,
        admin: state.admin,
    };
};

const mapDispatchToProps = {
    fetchDocuments,
    fetchUsers,
    fetchDivisions,
    toggleRefreshComments,
    toggleRefresh,
    toggleRefreshCourses,
    toggleRefreshDocuments,
    toggleRefreshDivisions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ZoneAdmin)

