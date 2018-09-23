import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Datatable from 'react-bs-datatable';

import ModalAddCourse from './ModalAddCourse';

import { Button } from 'reactstrap';
import { toggleRefreshCourses, deleteCourse, toggleModalCourse } from "../action";

class ZoneCourses extends Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
        this.state = {
            header: [
                { title: 'Nom', prop: 'name', sortable: true, filterable: true },
                { title: 'Bachelier', prop: 'section', sortable: true, filterable: true },
                { title: 'Année', prop: 'grade', sortable: true, filterable: true },
                { title: '', prop: 'remove'}
            ],
            body: [],
        }
    }

    componentDidMount() {
        if(!this.props.admin.refreshCourses)
            this.props.toggleRefreshCourses();
    }

    handleRemove(course, division) {
        this.props.deleteCourse(course, division, this.props.admin.divisions);
    }

    componentDidUpdate() {
        if(this.props.admin.refreshCourses) {
            const temp = [];
            this.props.admin.divisions.forEach((division) => {
                if(!division.logicalDelete) { // Only process not deleted divisions
                    division.courses.forEach((course) => {
                        if(!course.logicalDelete) { // And only process not deleted courses
                            const entry = {
                                name: course.name,
                                section: division.acronym,
                                grade: course.grade,
                                remove: <Button color="danger" onClick={() => this.handleRemove(course, division)}>Supprimer</Button>,
                            };
                            temp.push(entry);
                        }
                    });
                }
            });
            this.setState({ body: temp });
            this.props.toggleRefreshCourses();
        }
    }

    render() {
        return(
            <div>
                <Button color="info" onClick={this.props.toggleModalCourse}>Ajouter</Button><br /><br />
                <Datatable
                    tableHeader={this.state.header}
                    tableBody={this.state.body}
                    keyName="divisionsTable"
                    tableClass="table table-bordered table-hover"
                    rowsPerPage={5}
                    rowsPerPageOption={[5,10,15,20]}
                    initialSort={{ prop: 'acronym', isAscending: true }}
                />
                <ModalAddCourse />
            </div>
        );
    }
}

ZoneCourses.propTypes = {
    admin: PropTypes.object.isRequired,
    toggleRefreshCourses: PropTypes.func.isRequired,
    deleteCourse: PropTypes.func.isRequired,
    toggleModalCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        admin: state.admin,
    };
};

const mapDispatchToProps = {
    toggleRefreshCourses,
    deleteCourse,
    toggleModalCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ZoneCourses);