import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Badge, ListGroupItem, ListGroupItemHeading, Progress, Row} from "reactstrap";
import PropTypes from 'prop-types';
import {formatBytes} from "../../reducer";
import {UPLOAD_STATUS_ABORTED, UPLOAD_STATUS_ERROR, UPLOAD_STATUS_UPLOADING, UPLOAD_STATUS_WAITING} from "../../../../constants";

class UploadItem extends Component {

    shouldComponentUpdate() {
        return true;
    }

    getProgress(progress) {
        progress = Math.round(progress);

        if (progress < 0 || (progress === 0 && this.props.process.progress === 0)) {
            if (this.props.process.status === UPLOAD_STATUS_UPLOADING || this.props.process.status === UPLOAD_STATUS_WAITING)
                return (<Badge color="primary">En attente...</Badge>);

            return (<Badge color="secondary">Annulée</Badge>);
        }

        if (this.props.process.status === UPLOAD_STATUS_ERROR) {
            return <Badge color="danger">Erreur</Badge>
        } else if (this.props.process.status === UPLOAD_STATUS_ABORTED) {
            return <Badge color="danger">Annulée</Badge>
        }

        return (
            <Progress style={{ marginBottom: 0 }} value={progress > 100 ? 100 : progress}
                      animated={progress >= 100 && this.props.process.status === UPLOAD_STATUS_UPLOADING} >
                { this.props.process.status === UPLOAD_STATUS_UPLOADING
                    ? (progress >= 100 ? "Traitement serveur" : (progress > 100 ? 100 : progress) + " %")
                    : "Uploadé"
                }
            </Progress>
        )
    }

    render() {
        const isRep = this.props.upload.files[this.props.index] && this.props.upload.files[this.props.index] === 'directory';

        return (<ListGroupItem className="clearfix" key={"file" + this.props.index}>
                    <div className="col-sm-9">
                        {isRep ? <i className="fa fa-folder-open-o" /> : <i className="fa fa-file-o" />}
                        &nbsp;&nbsp;
                        {this.props.upload.files[this.props.index].name}
                        &nbsp;&nbsp;
                        <small className="text-muted">
                            { formatBytes(this.props.upload.files[this.props.index].size) }
                            { isRep ? " - " + this.props.upload.files[this.props.index].length + " fichiers" : ""}
                        </small>
                    </div>
                    <div className="col-sm-3 text-right">
                        { this.getProgress((this.props.process.progress - this.props.upload.files[this.props.index].offset) * 100 / this.props.upload.files[this.props.index].size) }
                    </div>
            </ListGroupItem>)
    }

}


UploadItem.propTypes = {
    index: PropTypes.number.isRequired,
    upload : PropTypes.object.isRequired,
    process: PropTypes.object.isRequired,
};

export default connect((state) => {
    return {
        upload : state.upload,
        process : state.upload.process,
    }
})(UploadItem);