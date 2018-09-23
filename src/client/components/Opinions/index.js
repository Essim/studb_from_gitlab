import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DocumentButton from "../DocumentButton/index";
import OpinionsSummary from "./OpinionsSummary";
import { RevisionUpload } from "../Upload";

export class Opinions extends Component {

    static propTypes = {
        document_cuid: PropTypes.string.isRequired,
        opinions: PropTypes.array.isRequired,
        comments: PropTypes.array
    };

    renderInteractions() {
        return [
            <DocumentButton key={"like_" + this.props.document_cuid}
                            button="like"
                            opinions={this.props.opinions}
                            document_cuid={this.props.document_cuid} />,
            <span key={"span1" + this.props.document_cuid}>&nbsp;</span>,
            <DocumentButton key={"dislike_" + this.props.document_cuid}
                            button="dislike"
                            opinions={this.props.opinions}
                            document_cuid={this.props.document_cuid} />,
            <span key={"span2" + this.props.document_cuid}>&nbsp;</span>,
            <DocumentButton key={"report_" + this.props.document_cuid}
                            button="report"
                            opinions={this.props.opinions}
                            document_cuid={this.props.document_cuid}/>
        ];
    }

    render() {
        return (
            <div>
                <div className="pull-left">
                    <DocumentButton key={"download_"+this.props.document_cuid}
                                    document_cuid={this.props.document_cuid}
                                    button="download"
                                    isZip={this.props.isZip}
                                    file_path={this.props.file_path}/>&nbsp;

                    <RevisionUpload document={this.props.document}/>&nbsp;
                    {this.renderInteractions()}
                </div>
                <div className="pull-right text-muted">
                    <OpinionsSummary key={"opinions"+this.props.document_cuid}
                                     document_cuid={this.props.document_cuid}
                                     opinions={this.props.opinions}
                                     comments={this.props.comments} />
                </div>
            </div>
        )
    }
}

export default Opinions;
