import React, { Component } from 'react';
import { Alert, Form, FormGroup, Button, Label } from 'reactstrap';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { toggleChangeGrades, setGrades, setUserGrades,  updateGrades } from "../action";

class GradesForm extends Component {
    constructor(props) {
        super(props);
        this.formGrades = this.formGrades.bind(this);
        this.multipleSelectChange = this.multipleSelectChange.bind(this);
        this.submitGrades = this.submitGrades.bind(this);
    }

    componentDidUpdate() {
        if(this.props.signin.connected && this.props.profileSettings.userGrades.length === 0) {
            const grades = this.props.signin.user.grades.map((grade) => {
                const entry = {};
                entry.value = String(grade);
                entry.label = String(grade);
                return entry;
            });
            this.props.setGrades(grades);
            this.props.setUserGrades(grades);
        }
    }

    //Used to handle changes into the multi select
    multipleSelectChange(val) {
        this.props.setGrades(val);
    }

    //Used to handle the form's submit
    submitGrades() {
        this.props.updateGrades(this.props.signin.user, this.props.profileSettings.grades);
    }

    //Used to display the grade's form (One input : all the available grades)
    // => Multi select is pre-fill with current user's grades
    formGrades() {
        if( this.props.profileSettings.isChangingGrades )
            return( <Form>
                    <Label for="grades">Nouveaux blocs de cours : </Label>
                    <Select
                        name='form-field-name'
                        value={this.props.profileSettings.grades}
                        options={[{value: '1', label: '1'}, {value: '2', label: '2'}, {value: '3', label: '3'}]}
                        multi={true}
                        onChange={this.multipleSelectChange}
                        clearable={true}
                    />
                    <br />
                <FormGroup>
                    <Button color="primary" onClick={this.submitGrades}>Confirmer le changement</Button>{' '}
                    <Button color="danger" onClick={this.props.toggleChangeGrades}>Annuler</Button>
                </FormGroup>
            </Form>);
        else
            return <Button color="info" onClick={this.props.toggleChangeGrades}>Changer de bloc de cours</Button>;
    }

    render() {
        let alert = '';
        if(this.props.profileSettings.errorGrades)
            alert = <Alert color='danger'>{this.props.profileSettings.errorMessageGrades}</Alert>;
        return(
            <div>
                { alert }
                <Form>
                    <Label for="grades">Votre / Vos blocs de cours : </Label>
                    <Select
                        name='form-field-name'
                        value={this.props.profileSettings.userGrades}
                        options={[{value: '1', label: '1'}, {value: '2', label: '2'}, {value: '3', label: '3'}]}
                        multi={true}
                        clearable={false}
                        disabled
                    />
                </Form>
                <br />
                { this.formGrades() }
            </div>
        );
    }
}

GradesForm.propTypes = {
    profileSettings: PropTypes.object.isRequired,
    signin: PropTypes.object.isRequired,
    toggleChangeGrades: PropTypes.func.isRequired,
    setGrades: PropTypes.func.isRequired,
    setUserGrades: PropTypes.func.isRequired,
    updateGrades: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        signin: state.signin,
        profileSettings: state.profileSettings
    };
}

const mapDispatchToProps = {
    toggleChangeGrades,
    setUserGrades,
    setGrades,
    updateGrades,
};

export default connect(mapStateToProps, mapDispatchToProps)(GradesForm);