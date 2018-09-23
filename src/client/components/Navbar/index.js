import UserPanel from "./UserPanel";
import Search from "./Search";
import Division from "./Division";
import {fetchDivision} from "./action";
import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';



export class Navbar extends Component {

    static propTypes = {
        divisions: PropTypes.object.isRequired,
        fetchDivision: PropTypes.func.isRequired,
        user: PropTypes.object,
        connected: PropTypes.bool.isRequired,
    };

    constructor(props){
        super(props);

        this.props.fetchDivision();

    }

    renderMenu() {
        if (this.props.divisions.loading)
            return (<p>Loading...</p>);


        if (this.props.divisions.error || !this.props.divisions.divisions)
            return (<p>Error loading menu {this.props.divisions.error ? " : " + this.props.divisions.error : ""}</p>);


        return (
            <ul className="sidebar-menu" data-widget="tree">
                {this.props.divisions.divisions.filter(division => !division.logicalDelete).map((division) => <Division
                    key={"navbar" + division.acronym}
                    division={division} />)
                }
            </ul>
        );
    }

    ifConnectedUserPanel() {
        return this.props.connected ? <UserPanel user={this.props.user}/> : '';
    }

    render() {
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    {this.ifConnectedUserPanel()}
                    <Search location={this.props.location}/>
                    { this.renderMenu() }
                </section>
            </aside>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        divisions: state.divisions,
        connected: state.signin.connected,
        user: state.signin.user,
    }
};

const dispatchToProps = {
    fetchDivision
};

export default connect(mapStateToProps, dispatchToProps)(Navbar);
