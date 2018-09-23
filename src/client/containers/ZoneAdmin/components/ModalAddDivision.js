import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Modal, ModalFooter, ModalBody, ModalHeader, FormGroup, Label } from 'reactstrap';

import { AvForm, AvInput, AvFeedback, AvGroup } from 'availity-reactstrap-validation';

import { toggleModalDivision, addDivision } from "../action";

class ModalAddDivision extends Component {
    constructor(props) {
        super(props);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    handleValidSubmit(event, values){
       const division = {
           acronym: values.sectionName,
       };
       this.props.addDivision(division, this.props.admin.divisions);
    }

    render() {
        return(
            <Modal isOpen={this.props.admin.isModalDivisionOpen} toggle={this.props.toggleModalDivision}>
                <ModalHeader toggle={this.props.toggleModalDivision}>Ajout d'un nouveau bachelier</ModalHeader>
                <AvForm onValidSubmit={this.handleValidSubmit}>
                    <ModalBody>
                        <AvGroup>
                            <Label for="sectionName">Nom du nouveau Bachelier : </Label>
                            <AvInput type="text" name="sectionName" id="sectionName" required/>
                            <AvFeedback>Le nom du bachelier est obligatoire</AvFeedback>
                        </AvGroup>
                    </ModalBody>
                    <ModalFooter>
                        <FormGroup>
                            <Button color="primary">Ajouter</Button>
                            <Button color="danger" onClick={this.props.toggleModalDivision}>Retour</Button>
                        </FormGroup>
                    </ModalFooter>
                </AvForm>
            </Modal>
        );
    }
}

ModalAddDivision.propTypes = {
    admin: PropTypes.object.isRequired,
    toggleModalDivision: PropTypes.func.isRequired,
    addDivision: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        admin: state.admin,
    };
};

const mapDispatchToProps = {
    toggleModalDivision,
    addDivision,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddDivision);