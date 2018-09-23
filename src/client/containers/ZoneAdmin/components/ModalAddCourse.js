import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
import { AvForm, AvGroup, AvFeedback, AvInput, AvField } from 'availity-reactstrap-validation';

import { toggleModalCourse, addCourse } from "../action";

class ModalAddCourse extends Component {
    constructor(props) {
        super(props);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.getSections = this.getSections.bind(this);
    }

    /* Handle the user response if valid */
    handleValidSubmit(event, values) {
       const course = {
            name: values.gradeName,
            grade: values.year,
        };
        this.props.addCourse(course, values.divisions, this.props.admin.divisions);
    }

    /* Create the division select => (Empty if not loaded) */
    getSections() {
        if (this.props.admin.divisions.length !== 0)
            return (
                <AvField type='select' name="divisions" label="Bachelier : " helpMessage="Le bachelier auquel le cours est relié"
                         errorMessage="Veuillez choisir une section" required>{}
                    <option value=""/>
                    {this.props.admin.divisions.filter((division) => !division.logicalDelete).map((division) => {
                        return <option key={division.cuid} value={division.cuid}>{division.acronym}</option>;
                    })}
                </AvField>);
        return (
            <AvField type='select' name="divisions" label="Bachelier : " helpMessage="Le bachelier auquel le cours est relié"
                     errorMessage="Veuillez choisir une section" required>{}
                <option value=""/>
            </AvField>);
    }

    render() {
        return(<Modal isOpen={this.props.admin.isModalCourseOpen} toggle={this.props.toggleModalCourse}>
                <ModalHeader toggle={this.props.toggleModalCourse}>Ajout d'un nouveau cours</ModalHeader>
                <AvForm onValidSubmit={this.handleValidSubmit}>
                    <ModalBody>
                        <AvGroup>
                            <Label for="gradeName">Nom du nouveau cours : </Label>
                            <AvInput type="text" name="gradeName" id="gradeName" required />
                            <AvFeedback>Le nom du cours est obligatoire</AvFeedback>
                        </AvGroup>
                        { this.getSections() }
                        <AvField type="select"
                                 name="year"
                                 label="Année du bachelier : "
                                 helpMessage="L'année du cours">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </AvField>
                    </ModalBody>
                    <ModalFooter>
                        <FormGroup>
                            <Button color="primary">Ajouter</Button>
                            <Button color="danger" onClick={this.props.toggleModalCourse}>Retour</Button>
                        </FormGroup>
                    </ModalFooter>
                </AvForm>
            </Modal>
        );
    }
}

ModalAddCourse.propTypes = {
    admin: PropTypes.object.isRequired,
    toggleModalCourse: PropTypes.func.isRequired,
    addCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        admin: state.admin,
    };
};

const mapDispatchToProps = {
    toggleModalCourse,
    addCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddCourse);