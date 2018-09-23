import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { myDivision, divisions } from "./action";
import PropTypes from 'prop-types';

import DivisionForm from './components/divisionForm';
import GradesForm from './components/gradesForm';
import PasswordForm from "./components/passwordForm";

export class ProfileSettingsPage extends Component {
    componentDidUpdate() {
        if(this.props.profileSettings.myDivision !== null && Object.keys(this.props.profileSettings.myDivision).length === 0 && !this.props.profileSettings.isLoadingMyDivision && this.props.signin.connected)
            this.props.myDivision(this.props.signin.user.division);
    }

    componentDidMount() {
        if(this.props.signin.connected)
            this.props.myDivision(this.props.signin.user.division);
        this.props.divisions();
    }

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="email">Email : </Label>
                        <Input type="email" name="email" id="email" disabled value={this.props.signin.user.email} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pseudo">Pseudo : </Label>
                        <Input type="pseudo" name="pseudo" id="pseudo" disabled value={this.props.signin.user.pseudo} />
                    </FormGroup>
                </Form>
                <DivisionForm />
                <hr />
                <GradesForm />
                <hr />
                <PasswordForm />
            </div>);
    }
}

ProfileSettingsPage.propTypes = {
    signin: PropTypes.object.isRequired,
    profileSettings: PropTypes.object.isRequired,
    myDivision: PropTypes.func.isRequired,
    divisions: PropTypes.func.isRequired,
};

const mapStateToProps= (state) => {
    return {
        signin: state.signin,
        profileSettings: state.profileSettings
    };
};

const mapDispatchToProps = {
    myDivision,
    divisions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettingsPage);
