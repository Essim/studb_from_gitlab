import React, { Component } from "react";
import PropTypes from "prop-types";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";
import ReportButton from "./ReportButton";
import DownloadButton from "./DownloadButton";

export class DocumentButton extends Component {

    static propTypes = {
        button: PropTypes.oneOf(["like", "dislike", "report", "download"]).isRequired,
        document_cuid: PropTypes.string.isRequired,
        opinions: PropTypes.array,

    };

    render() {
        switch (this.props.button){
            case "like":
                return <LikeButton
                    key={"like_"+this.props.document_cuid}
                    opinions={this.props.opinions}
                    document_cuid={this.props.document_cuid}/>;
            case "dislike":
                return <DislikeButton
                    key={"dislike_"+this.props.document_cuid}
                    opinions={this.props.opinions}
                    document_cuid={this.props.document_cuid} />;
            case "report":
                return <ReportButton
                    key={"report_"+this.props.document_cuid}
                    opinions={this.props.opinions}
                    document_cuid={this.props.document_cuid} />;
            case "download":
                return <DownloadButton
                    key={"download_"+this.props.document_cuid}
                    document_cuid={this.props.document_cuid}
                    isZip={this.props.isZip}
                    file_path={this.props.file_path}/>;
        }
    }
}

export default DocumentButton;
