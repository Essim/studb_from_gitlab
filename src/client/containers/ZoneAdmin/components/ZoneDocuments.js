import React, {Component} from 'react';
import { connect } from 'react-redux';
import Datatable from 'react-bs-datatable';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

import { deleteDocument, toggleRefreshDocuments } from "../action";

import { genericPrintDate } from "../../../util/dateHandler";

class ZoneDocuments extends Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
        this.state = {
            header: [
                { title: 'Nom', prop: 'name', sortable: true, filterable: true },
                { title: 'Auteur', prop: 'name_author', sortable: true, filterable: true },
                { title: 'Bachelier', prop:'division', sortable: true, filterable: true },
                { title: 'Cours', prop: 'course', sortable: true, filterable: true},
                { title: 'Date', prop: 'date' },
                { title: '', prop: 'remove'}
            ],
            body: [],
        }
    }

    componentDidMount() {
        if(!this.props.admin.refreshDocuments)
            this.props.toggleRefreshDocuments();
    }

    handleRemove(document) {
        this.props.deleteDocument(document, this.props.admin.documents);
    }

    componentDidUpdate() {
        if(this.props.admin.refreshDocuments) {
            const temp = [];
            this.props.admin.documents.forEach((document) => {
                if(!document.logicalDelete) { // Only process not deleted documents
                    let division = '';
                    this.props.admin.divisions.forEach((div) => {
                        if(div.cuid === document.cuid_division)
                            division = div.acronym; // Get the document's division acronym
                    });
                    let course = '';
                    this.props.admin.divisions.forEach((div) => {
                        div.courses.forEach((cse) => {
                            if(cse.cuid === document.cuid_course)
                                course = cse.name; // Get the document's course name
                        });
                    });
                    const entry = {
                        name: document.name,
                        name_author: document.name_author,
                        division: division,
                        course: course,
                        date: genericPrintDate(new Date(document.date)),
                        remove: <Button color="danger" onClick={() => this.handleRemove(document)}>Supprimer</Button>,
                    };
                    temp.push(entry);
                }
            });
            this.setState({ body: temp });
            this.props.toggleRefreshDocuments();
        }
    }

    render() {
        return(
            <Datatable
                tableHeader={this.state.header}
                tableBody={this.state.body}
                keyName="docsTable"
                tableClass="table table-bordered table-hover"
                rowsPerPage={5}
                rowsPerPageOption={[5,10,15,20]}
                initialSort={{ prop: 'pseudo', isAscending: true }}
            />
        );
    }
}

ZoneDocuments.propTypes = {
    admin: PropTypes.object.isRequired,
    deleteDocument: PropTypes.func.isRequired,
    toggleRefreshDocuments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        admin: state.admin,
    };
};

const mapDispatchToProps = {
    deleteDocument,
    toggleRefreshDocuments,
};

export default connect(mapStateToProps, mapDispatchToProps)(ZoneDocuments);