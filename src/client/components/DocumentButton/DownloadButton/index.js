import React, { Component } from "react";
import { Link } from 'react-router'
import PropTypes from "prop-types";

class DownloadButton extends Component {

    static propTypes = {
        file_path: PropTypes.string.isRequired,
        isZip: PropTypes.bool.isRequired
    };

    downloadFile = () => {
        var file_name = this.props.file_path.split("/").pop();
        var win = window.open(this.props.file_path, '_blank');
        win.focus();
    };

    render() {
        if(this.props.isZip){
            return (
                <button type="button" onClick={() => this.downloadFile()} className="btn btn-assertive btn-xs"><i className="fa fa-download"/> Télécharger(zip) </button>
            );
        }
        else{
            return (
                <button type="button" onClick={() => this.downloadFile()} className="btn btn-primary btn-xs"><i className="fa fa-download"/> Télécharger </button>

            );
        }
    }
}

export default DownloadButton;
