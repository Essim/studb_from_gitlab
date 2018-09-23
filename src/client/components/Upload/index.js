import React, { Component } from "react";
import { connect } from "react-redux";
import {toggleModal, toggleRevisionModal} from "./action";
import { Button } from 'reactstrap';
import PropTypes from "prop-types";
import Uploader from "./Uploader";
import UploadForm from "./UploadForm";


export class Upload extends Component {

    render() {
        return this.props.connected ?
            [
                <li key="upload-li" className="notifications-menu" onClick={this.props.toggleModal}>
                    <a>
                        <i className="fa fa-upload"/>
                        &nbsp; Publier { this.props.upload.hasUpload ? " : " + this.props.upload.process.status : "" }
                    </a>
                </li>,
                this.props.upload.hasUpload ?  <Uploader /> : <UploadForm />
            ] : [];
    }
}


Upload.propTypes = {
    upload: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
    connected: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        upload: state.upload,
        connected: state.signin.connected,
    };
};

const mapDispatchToProps = {
    toggleModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);



class RevisionUploadComponent extends Component {

    render () {
        return <button type="button" className="btn btn-info btn-xs" onClick={() => {
            this.props.toggleRevisionModal(this.props.document)}
        }>
            <i className="fa fa-code-fork"/>&nbsp;Réviser
        </button>
    }

}

export const RevisionUpload = connect((state) => {return {}}, {
    toggleRevisionModal
})(RevisionUploadComponent);