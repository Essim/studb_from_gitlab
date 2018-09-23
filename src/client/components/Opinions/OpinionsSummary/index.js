import React, {Component} from "react";
import PropTypes from 'prop-types';
import DocumentCounter from "../../DocumentCounter/index";

export default class OpinionsSummary extends Component {

    static propTypes = {
        document_cuid: PropTypes.string.isRequired,
        opinions: PropTypes.array.isRequired,
        comments: PropTypes.array,
    };

    render() {
        return [
            <DocumentCounter
                key={"countLike" + this.props.document_cuid}
                counter="like"
                items={this.props.opinions.filter((opinion) =>
                    opinion.logicalDelete === false && opinion.report === false && opinion.state === true
                )}/>,
            <span key={"span1" + this.props.document_cuid}>&nbsp;&nbsp;</span>,
            <DocumentCounter key={"countDislike" + this.props.document_cuid} counter="dislike"
                 items={this.props.opinions.filter((opinion) =>
                     opinion.logicalDelete === false && opinion.report === false && opinion.state === false
                 )}/>,
            <span key={"span2" + this.props.document_cuid}>&nbsp;&nbsp;</span>,
            typeof this.props.comments !== "undefined" ?
                <DocumentCounter key={"countComment" + this.props.document_cuid} counter="comment"
                     items={this.props.comments.filter((comment) =>
                         !comment.logicalDelete
                     )}/> : "",
        ]
    }
}
