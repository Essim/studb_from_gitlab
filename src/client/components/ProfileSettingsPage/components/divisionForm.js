import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { FormGroup, Button, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateDivision, toggleChangeSection } from "../action";

class DivisionForm extends Component {
    constructor(props) {
        super(props);
        this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.myDivision = this.myDivision.bind(this);
        this.formDivision = this.formDivision.bind(this);
    }

    handleValidSubmit(event, values) {
        this.props.updateDivision(this.props.signin.user, values.divisions);
    }

    handleInvalidSubmit(event, errors, values) {
        this.setState({errors, values});
    }

    // Used to display the user's division (Or empty if loading)
    myDivision() {
        if(this.props.profileSettings.myDivision !== null && Object.keys(this.props.profileSettings.myDivision).length !== 0)
            return(<FormGroup>
                <Label for="section">Votre Bachelier : </Label>
                <Input type="text" name="section" id="section" disabled value={this.props.profileSettings.myDivision.acronym} />
            </FormGroup>);
        else
            return(<FormGroup>
                <Label for="section">Votre Bachelier : </Label>
                <Input type="text" name="section" id="section" disabled value='Pas de Bachelier à afficher' />
            </FormGroup>);
    }

    //Used to display the division form (One input : All the available divisions)
    formDivision() {
        if(this.props.profileSettings.isChangingSection )
            return( <AvForm onInvalidSubmit={this.handleInvalidSubmit} onValidSubmit={this.handleValidSubmit} >
                <AvField type='select' name="divisions" label="Votre nouveau bachelier : " errorMessage="Veuillez choisir un nouveau bachelier" required>{}
                    <option value=""/>
                    {this.props.profileSettings.divisions.filter((division) => !division.logicalDelete).map((section) => {
                        return <option key={section.cuid} value={section.cuid}>{section.acronym}</option>;
                    })}
                </AvField>
                <FormGroup>
                    <Button color="primary">Confirmer le changement</Button>{' '}
                    <Button color="danger" onClick={this.props.toggleChangeSection}>Annuler</Button>
                </FormGroup>
            </AvForm>);
        else
            return <Button color="info" onClick={this.props.toggleChangeSection}>Changer de Bachelier</Button>;
    }

    render() {
        return(<div>
            { this.myDivision() }
            { this.formDivision() }
        </div>);
    }
}

DivisionForm.propTypes = {
    profileSettings: PropTypes.object.isRequired,
    signin: PropTypes.object.isRequired,
    updateDivision: PropTypes.func.isRequired,
    toggleChangeSection: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        signin: state.signin,
        profileSettings: state.profileSettings
    };
}

const mapDispatchToProps = {
    updateDivision,
    toggleChangeSection,
};

export default connect(mapStateToProps, mapDispatchToProps)(DivisionForm);