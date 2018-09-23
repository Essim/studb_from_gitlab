import Grade from "./Grade";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, {Component} from "react";
import SideNav from 'react-sidenav';

class Division extends Component {

    static propTypes = {
        division: PropTypes.object.isRequired,
        user: PropTypes.object,
        connected: PropTypes.bool.isRequired,
    };

    render() {
        if (this.props.connected && this.props.user.division !== this.props.division.cuid) {
            return "";
        }

        return [
            (<li className="header" key={"division_" + this.props.division.cuid}>
                Division {this.props.division.acronym}
            </li>),
            (this.props.division.grades ? <SideNav key={"sidenav_" + this.props.division.cuid}>
                {this.props.division.grades.map((grade) => {
                    return <Grade
                        key={"navbar" + this.props.division.cuid + grade.name}
                        division={this.props.division}
                        grade={grade} />
                })}
            </SideNav> : "")
        ];
    }
}

export default connect((state) => {
    return {
        connected: state.signin.connected,
        user: state.signin.user,
    };
}) (Division);
