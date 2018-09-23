import React, { Component } from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { FormGroup, Button, Label, FormText, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleChangePassword, updatePassword } from "../action";

class PasswordForm extends Component {
    constructor(props) {
        super(props);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
        this.passwordForm = this.passwordForm.bind(this);
        this.state = {
            messageRepeat: '',
        }
    }

    handleValidSubmit(event, values) {
        this.props.updatePassword(this.props.signin.user, values.currentPassword, values.newPassword);
    }

    handleInvalidSubmit(event, errors, values) {
        this.setState({errors, values});
    }

    //Used to display the password Form
    // => This form request the current user password and the new password (the new password must be repeated)
    passwordForm() {
        if(!this.props.profileSettings.isChangingPassword)
            return(<Button color={"info"} onClick={this.props.toggleChangePassword}>Changer mon mot de passe</Button>);
        else
            return(
                <div>
                    <AvForm onInvalidSubmit={this.handleInvalidSubmit} onValidSubmit={this.handleValidSubmit} >
                        <AvGroup>
                            <Label for="currentPassword">Entrer votre mot de passe : </Label>
                            <AvInput type='password' name="currentPassword" id="currentPassword" required minLength={6} />
                            <AvFeedback>Ce champ est obligatoire</AvFeedback>
                            <FormText color="muted">Il s'agit de votre mot de passe actuel</FormText>
                        </AvGroup>
                        <AvGroup>
                            <Label for="newPassword">Entrer votre nouveau mot de passe : </Label>
                            <AvInput type='password' name="newPassword" id="newPassword" required minLength={6} />
                            <AvFeedback>Ce champ est obligatoire</AvFeedback>
                        </AvGroup>
                        <AvGroup>
                            <Label for="repeatPassword">Répéter votre nouveau mot de passe : </Label>
                            <AvInput type='password' name="repeatPassword" id="repeatPassword" validate={{match:{value:'newPassword'}}} />
                            <AvFeedback>Les nouveaux mot de passes doivent etre identiques</AvFeedback>
                        </AvGroup>
                        <FormGroup>
                            <Button color="primary">Confirmer le changement</Button>{' '}
                            <Button color="danger" onClick={this.props.toggleChangePassword}>Annuler</Button>
                        </FormGroup>
                    </AvForm>
                </div>
            );
    }

    render() {
        let alert = '';
        if(this.props.profileSettings.messagePassword !== '' && !this.props.profileSettings.errorPassword)
            alert = <Alert color='success'>{ this.props.profileSettings.messagePassword }</Alert>;
        else if(this.props.profileSettings.errorPassword)
            alert = <Alert color='danger'>{ this.props.profileSettings.messagePassword }</Alert>;
        return(
            <div>
                { alert }
                { this.passwordForm() }
            </div>
        )
    }
}

PasswordForm.propTypes = {
    profileSettings: PropTypes.object.isRequired,
    signin: PropTypes.object.isRequired,
    toggleChangePassword: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        signin: state.signin,
        profileSettings: state.profileSettings
    };
}

const mapDispatchToProps = {
    toggleChangePassword,
    updatePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordForm);