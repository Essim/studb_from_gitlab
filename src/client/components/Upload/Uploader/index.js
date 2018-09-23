import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
    Modal, ModalHeader, ModalBody, ListGroup, ModalFooter, Button, Label, Alert
} from 'reactstrap';
import {abortUpload, endUploading, startUploading, toggleModal} from "../action";
import UploadItem from './UploadItem';
import {
    UPLOAD_STATUS_ABORTED, UPLOAD_STATUS_ERROR, UPLOAD_STATUS_SUCCESS,
    UPLOAD_STATUS_UPLOADING, UPLOAD_STATUS_WAITING
} from "../../../constants";


class Uploader extends Component {

    constructor(props) {
        super(props);

        this.handleRetry = this.handleRetry.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAbort = this.handleAbort.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }


    handleRetry(e) {
        console.log("Retrying");

        if (e)
            e.preventDefault();

        this.props.startUploading(this.props.upload.upload, this.props.upload.files)
    }

    handleClose(e) {
        if (e)
            e.preventDefault();

        this.props.endUploading();
    }

    handleAbort(e) {
        e.preventDefault();

        abortUpload();
    }

    handleToggle() {
        if (this.props.upload.process.status === UPLOAD_STATUS_UPLOADING || this.props.upload.process.status === UPLOAD_STATUS_WAITING) {
            this.props.toggleModal();
        } else {
            this.handleClose()
        }

    }

    renderFooter() {
        switch(this.props.upload.process.status) {
            case UPLOAD_STATUS_UPLOADING:
                return [
                    <Button onClick={this.handleToggle}>Arrière-plan</Button>,
                    <Button onClick={this.handleAbort}>Annuler</Button>  ];
            case UPLOAD_STATUS_SUCCESS:
                return <Button onClick={this.handleClose}>Ok !</Button>;
            case UPLOAD_STATUS_ABORTED:
                return [
                    <Button onClick={this.handleRetry}>Relancer</Button>,
                    <Button onClick={this.handleClose}>Annuler</Button>
                ];
            case UPLOAD_STATUS_ERROR:
                return [
                    <Button onClick={this.handleRetry}>Re-essayer</Button>,
                    <Button onClick={this.handleClose}>Annuler</Button>
                ];
            default:
                return "";
        }
    }

    renderMessage(status, message) {
        if (typeof message === "object") {
            if (message.message)
                message = message.message;
            else
                message = "";
        }

        switch (status) {
            case UPLOAD_STATUS_SUCCESS:
                return <Alert color="success">
                    Votre synthèse à bien été uploadée sur nos serveur
                </Alert>;
            case UPLOAD_STATUS_ABORTED:
                return <Alert color="warning">
                    Le téléversement de la synthèse a été annulé par vous
                </Alert>;
            case UPLOAD_STATUS_ERROR:
                return (<Alert color="danger">
                    Une erreur est survenue pendant le téléchargement de votre synthèse&nbsp;
                    { message ? [<hr/>, <p>{message}</p>] : "" }
                </Alert>);
            default:
                return "";
        }
        { this.props.upload.process.status === UPLOAD_STATUS_SUCCESS
            ? <Alert color="success">
                Votre synthèse à bien été uploadée sur nos serveur
            </Alert>
            : (this.props.upload.process.status !== UPLOAD_STATUS_UPLOADING
                ? <Alert color="danger">
                    Une erreur est survenue pendant le téléchargement de votre synthèse&nbsp;
                    ({ this.props.upload.process.statusMessage.message
                    ? this.props.upload.process.statusMessage.message
                    : (typeof this.props.upload.process.statusMessage === "String")
                        ? this.props.upload.process.statusMessage : ""})
                </Alert> : "") }

    }

    render () {
        return (
            <Modal size="lg" isOpen={this.props.upload.modalOpened} toggle={this.handleToggle}>
                <ModalHeader toggle={this.handleToggle}>
                    Télécharger une nouvelle synthèse
                </ModalHeader>
                <ModalBody>
                    { this.renderMessage(this.props.upload.process.status, this.props.upload.process.statusMessage) }

                    <Label>
                        Fichiers en cours de chargement
                    </Label>
                    <ListGroup>
                        {this.props.upload.files.map((file, index) => <UploadItem key={index} index={index} /> )}
                    </ListGroup>
                </ModalBody>
                <ModalFooter>
                    { this.renderFooter() }
                </ModalFooter>
            </Modal>
        )
    }
}


Uploader.propTypes = {
    upload: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
    startUploading: PropTypes.func.isRequired,
    endUploading: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
    return {
        upload: state.upload
    };
};

const mapDispatchToProps = {
    toggleModal,
    startUploading,
    endUploading
};

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
