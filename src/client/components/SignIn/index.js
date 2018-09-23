import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Alert } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import PropTypes from 'prop-types';
import { facebookOauth, googleOauth, toggleModalSignIn, signIn, init } from "./action";

import Facebook from './components/facebook';
import Google from './components/google';
import styled from "styled-components";

const MyDiv = styled.div`text-align:center;`;

export class SignIn extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.toggle = this.toggle.bind(this);
        this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {};
        this.props.init();
    }

    //Used to toggle the modal (Display or Hide the modal)
    toggle() {
        this.props.toggleModalSignIn();
    }

    handleInvalidSubmit(event, errors, values) {
        this.setState({errors, values});
    }

    handleValidSubmit(event, values) {
        this.props.signIn(values);
    }

    render() {
        let alert;
        if(this.props.signin.formSignInError) {
            alert = <Alert color='danger'>{ this.props.signin.formSignInErrorMessage }</Alert>;
        } else {
            alert = '';
        }
        return [<a key="signin_button" onClick={this.toggle}><i className="fa fa-sign-in"/></a>,
                <Modal key="singin_modal" isOpen={this.props.signin.modalSignIn} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Connexion
                    </ModalHeader>
                    <ModalBody>
                        { alert }
                        <AvForm onInvalidSubmit={this.handleInvalidSubmit} onValidSubmit={this.handleValidSubmit}>
                            <AvGroup>
                                <Label for="login">E-Mail / Pseudo : </Label>
                                <AvInput name="login" id="login" type="text" required />
                                <AvFeedback>Il doit s'agir d'une adresse mail valide</AvFeedback>
                            </AvGroup>
                            <AvGroup >
                                <Label for="password">Mot de passe : </Label>
                                <AvInput name="password" id="password" type="password" required minLength={6} />
                                <AvFeedback>Ce champ est obligatoire</AvFeedback>
                            </AvGroup>
                            <FormGroup>
                                <Button color="primary">Se connecter</Button>
                            </FormGroup>
                        </AvForm>
                        <hr />
                        <h4>S'inscrire / Se connecter : </h4>
                        <hr />
                        <MyDiv>
                            <Facebook facebookOauth={this.props.facebookOauth} />
                            <br /><br />
                            <Google googleOauth={this.props.googleOauth} />
                            <br />
                        </MyDiv>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggle}>Retour</Button>
                    </ModalFooter>
                </Modal>,
            ]
    }
}

SignIn.propTypes = {
    facebookOauth: PropTypes.func.isRequired,
    googleOauth: PropTypes.func.isRequired,
    toggleModalSignIn: PropTypes.func.isRequired,
    signin: PropTypes.object.isRequired,
    init: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        signin: state.signin
    };
};

const mapDispatchToProps = {
    facebookOauth,
    googleOauth,
    toggleModalSignIn,
    signIn,
    init,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
