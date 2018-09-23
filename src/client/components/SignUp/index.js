import React, {Component} from 'react';
import {connect} from "react-redux";
import {toggleModalSignUp, submitSignup} from "./action";

import {Button, Label, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, FormText, Alert} from 'reactstrap';
import {AvForm, AvGroup, AvInput, AvFeedback, AvField} from 'availity-reactstrap-validation';
import PropTypes from 'prop-types';
import Select from 'react-select';

export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
        this.multipleSelectChange = this.multipleSelectChange.bind(this);
        this.getSections = this.getSections.bind(this);
        this.state = {
            grades: [],
            error: false,
        };
    }

    //Used to toggle the modal (Display or Hide the modal)
    toggle() {
        this.props.toggleModalSignUp();
    }

    handleInvalidSubmit(event, errors, values) {
        this.setState({errors, values});
    }

    handleValidSubmit(event, values) {
        if (!this.state.grades.length) {
            this.setState({error: true});
            this.handleInvalidSubmit(event, "", values);
        } else {
            this.setState({error: false});
            const date = new Date();
            const user = {
                division: values.divisions,
                pseudo: values.pseudo,
                password: values.password,
                dateSignIn: date,
                dateSignUp: date,
                email: this.props.signup.user.email,
                userID: this.props.signup.user.userID,
                grades: this.state.grades.map((grade) => {
                    return Number.parseInt(grade.value);
                }),
            };
            user.grades.sort();
            this.props.submitSignup(user);
        }
    }

    //Used to handle the multi select
    multipleSelectChange(val) {
        this.setState({grades: val});
    }

    //Used to display the sections (int other words divisions)
    getSections() {
        if (this.props.signup.sections)
            return (
                <AvField type='select' name="divisions" label="Section : " helpMessage="Votre type de bachelier"
                         errorMessage="Veuillez choisir une section" required>{}
                    <option value=""/>
                    {this.props.signup.sections.filter((division) => !division.logicalDelete).map((section) => {
                        return <option key={section.cuid} value={section.cuid}>{section.acronym}</option>;
                    })}
                </AvField>);
        return (
            <AvField type='select' name="divisions" label="Section : " helpMessage="Votre type de bachelier"
                     errorMessage="Veuillez choisir une section" required>{}
                <option value=""/>
            </AvField>);
    }

    render() {
        let alert;
        if (this.props.signup.formError)
            alert = <Alert color='danger'>{this.props.signup.formErrorMessage}</Alert>;
        else if (this.state.error)
            alert = <Alert color='danger'> Vous devez préciser votre/vos années d'étude</Alert>;
        else
            alert = null;

        return (
            <div>
                <Modal isOpen={this.props.signup.modalSignUp} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Inscription</ModalHeader>
                    <ModalBody>
                        {alert}
                        <AvForm onInvalidSubmit={this.handleInvalidSubmit} onValidSubmit={this.handleValidSubmit}>
                            <AvField type="email" name="email" label="Email : "
                                     placeholder={this.props.signup.user.email} disabled/>
                            <AvGroup>
                                <Label for="pseudo">Pseudo : </Label>
                                <AvInput name="pseudo" id="pseudo" required/>
                                <AvFeedback>Ce champ est obligatoire</AvFeedback>
                            </AvGroup>
                            <AvGroup>
                                <Label for="password">Mot de passe : </Label>
                                <AvInput name="password" id="password" type="password" required minLength={6} />
                                <AvFeedback>ce champ est obligatoire</AvFeedback>
                            </AvGroup>
                            {this.getSections()}
                            <Label for="grades">Bloc : </Label>
                            <Select
                                name='form-field-name'
                                value={this.state.grades}
                                options={[{value: '1', label: '1'}, {value: '2', label: '2'}, {value: '3', label: '3'}]}
                                multi={true}
                                clearable={false}
                                onChange={this.multipleSelectChange}
                                required
                            />
                            <FormText color="muted">
                                L'année dans laquelle vous êtes inscrit
                            </FormText>
                            <br/>
                            <br/>
                            <FormGroup>
                                <Button color="primary"> S'inscrire </Button>{'    '}
                                <Button color="danger" onClick={this.toggle}> Annuler </Button>
                            </FormGroup>
                        </AvForm>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

SignUp.propTypes = {
    signup: PropTypes.object.isRequired,
    toggleModalSignUp: PropTypes.func.isRequired,
    submitSignup: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
    return {
        signup: state.signup
    };
};

const mapDispatchToProps = {
    toggleModalSignUp,
    submitSignup,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
