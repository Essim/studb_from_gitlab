import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Datatable from 'react-bs-datatable';

import ModalAddDivision from './ModalAddDivision';

import { Button } from 'reactstrap';

import { toggleRefreshDivisions, deleteDivision, toggleModalDivision } from "../action";

class ZoneDivisions extends Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
        this.state = {
            header: [
                { title: 'Nom', prop: 'acronym', sortable: true, filterable: true },
                { title: '', prop: 'remove'}
            ],
            body: [],
        };
    }

    componentDidMount() {
        if(!this.props.admin.refreshDivisions)
            this.props.toggleRefreshDivisions();
    }

    handleRemove(division) {
        this.props.deleteDivision(division, this.props.admin.divisions);
    }

    componentDidUpdate() {
        if(this.props.admin.refreshDivisions) {
            const temp = [];
            this.props.admin.divisions.forEach((division) => {
                if(!division.logicalDelete) { //Only process not deleted divisions
                    const entry = {
                        acronym: division.acronym,
                        remove: <Button color="danger" onClick={() => this.handleRemove(division)}>Supprimer</Button>,
                    };
                    temp.push(entry);
                }
            });
            this.setState({ body: temp });
            this.props.toggleRefreshDivisions();
        }
    }

    render() {
        return(
            <div>
                <Button color="info" onClick={this.props.toggleModalDivision}>Ajouter</Button><br /><br />
                <Datatable
                    tableHeader={this.state.header}
                    tableBody={this.state.body}
                    keyName="divisionsTable"
                    tableClass="table table-bordered table-hover"
                    rowsPerPage={5}
                    rowsPerPageOption={[5,10,15,20]}
                    initialSort={{ prop: 'acronym', isAscending: true }}
                />
                <ModalAddDivision />
            </div>
        );
    }
}

ZoneDivisions.propTypes = {
    admin: PropTypes.object.isRequired,
    toggleRefreshDivisions: PropTypes.func.isRequired,
    deleteDivision: PropTypes.func.isRequired,
    toggleModalDivision: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        admin: state.admin,
    };
};

const mapDispatchToProps = {
    toggleRefreshDivisions,
    deleteDivision,
    toggleModalDivision,
};

export default connect(mapStateToProps, mapDispatchToProps)(ZoneDivisions);