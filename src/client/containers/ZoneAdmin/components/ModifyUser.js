import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody,
    ModalFooter, Button, FormGroup, Label } from 'reactstrap';
import { AvForm, AvGroup, AvFeedback, AvInput } from 'availity-reactstrap-validation';
import PropTypes from 'prop-types';

import { toggleModalUser, modifyRole } from "../action";
import {ADMIN_ROLE, TEACHER_ROLE, USER_ROLE} from "../../../constants";

class ModifyUser extends Component {
    constructor(props) {
        super(props);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    handleValidSubmit(event, values) {
        const role = parseInt(values.role);
        if(role !== this.props.admin.selectedUser.role) //If requested role != user role then
            this.props.modifyRole(this.props.admin.selectedUser, role, this.props.admin.users);
    }

    render() {
        let role;
        if(this.props.admin.selectedUser.role === USER_ROLE) {
            role = 'Utilisateur';
        } else if (this.props.admin.selectedUser.role === ADMIN_ROLE) {
            role = 'Administrateur';
        } else if (this.props.admin.selectedUser.role === TEACHER_ROLE){
            role = 'Professeur';
        } else {
            role = "";
        }
        const defaultValues = {
            role: this.props.admin.selectedUser.role,
        };
        return(
            <div>
                <Modal isOpen={this.props.admin.isModalUserOpen} toggle={this.props.toggleModalUser}>
                    <ModalHeader toggle={this.props.toggleModalUser}>Modifier le profil de {this.props.admin.selectedUser.name}</ModalHeader>
                    <AvForm onValidSubmit={this.handleValidSubmit} model={defaultValues}>
                        <ModalBody>
                            <AvGroup>
                                <Label for="pseudo">Pseudo : </Label>
                                <AvInput type="text" name="pseudo" id="pseudo" disabled value={this.props.admin.selectedUser.name}/>
                                <AvFeedback>Veuilliez spécifier un pseudo</AvFeedback>
                            </AvGroup>
                            <AvGroup>
                                <Label for="email">Email : </Label>
                                <AvInput type="email" name="email" id="email" disabled value={this.props.admin.selectedUser.email}/>
                            </AvGroup>
                            <AvGroup>
                                <Label for='currentRole'>Rôle actuel : </Label>
                                <AvInput name='currentRole' id='currentRole' type='text' disabled value={role}/>
                            </AvGroup>
                            <AvGroup>
                                <Label for="role">Rôle : </Label>
                                <AvInput name="role" id="role" type="select" required>
                                    <option value={USER_ROLE}>Utilisateur</option>
                                    <option value={TEACHER_ROLE}>Professeur</option>
                                    <option value={ADMIN_ROLE}>Administrateur</option>
                                </AvInput>
                            </AvGroup>
                        </ModalBody>
                        <ModalFooter>
                            <FormGroup>
                                <Button color="primary">Confirmer</Button>{' '}
                                <Button color="danger" onClick={this.props.toggleModalUser}>Retour</Button>
                            </FormGroup>
                        </ModalFooter>
                    </AvForm>
                </Modal>
            </div>);
    }
}

ModifyUser.propTypes = {
    toggleModalUser: PropTypes.func.isRequired,
    modifyRole: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        admin: state.admin,
    };
};

const mapDispatchToProps = {
    toggleModalUser,
    modifyRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyUser)