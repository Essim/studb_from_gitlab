import React, {Component} from 'react';
import { connect } from 'react-redux';
import Datatable from 'react-bs-datatable';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

import { deleteComment, toggleRefreshComments } from "../action";

class ZoneComments extends Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
        this.state = {
            header: [
                { title: 'Auteur', prop:'author', sortable: true, filterable: true },
                { title: 'Document', prop: 'document', sortable: true, filterable: true },
                { title: 'Texte', prop: 'text', sortable: true, filterable: true },
                { title: '', prop: 'remove'}
            ],
            body: [],
        }
    }

    componentDidMount() {
        if(!this.props.admin.refreshComments)
            this.props.toggleRefreshComments();
    }


    handleRemove(comment, document) {
        this.props.deleteComment(comment, document, this.props.admin.documents);
    }

    componentDidUpdate() {
        if(this.props.admin.refreshComments) {
            const temp = [];
            this.props.admin.documents.forEach((document) => {
                if(!document.logicalDelete) { // Only process not deleted documents
                    document.comments.forEach((comment) => {
                        if (!comment.logicalDelete) { // And only process not deleted comments
                            const entry = {
                                author: comment.name_author,
                                document: document.name,
                                text: comment.text,
                                remove: <Button color="danger" onClick={() => this.handleRemove(comment, document)}>Supprimer</Button>,
                            };
                            temp.push(entry);
                        }
                    });
                }
            });
            this.setState({ body: temp });
            this.props.toggleRefreshComments();
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

ZoneComments.propTypes = {
    admin: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    toggleRefreshComments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        admin: state.admin,
    };
};

const mapDispatchToProps = {
    deleteComment,
    toggleRefreshComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(ZoneComments)