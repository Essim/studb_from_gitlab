import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {giveDocumentOpinion} from "../actions";
import {OPINION_LIKE} from "../../../constants";


class LikeButton extends Component {

    static propTypes = {
        opinions: PropTypes.array.isRequired,
        document_cuid: PropTypes.string.isRequired,
        connected: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,

        giveDocumentOpinion: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();

        this.props.giveDocumentOpinion(
            OPINION_LIKE,
            this.props.document_cuid,
            this.props.user
        );
    }

    render() {
        if (!this.props.connected) {
            return "";
        }

        const liked = this.props.opinions.find(opinion => opinion.cuid_author === this.props.user.cuid && opinion.report === false);

        if (typeof liked === "undefined") {
            return (<button type="button"
                            className="btn btn-success btn-xs"
                            onClick={this.handleClick}>
                <i className="fa fa-thumbs-o-up"/>&nbsp;Like
            </button>);
        } else if (liked.state === true) {
            return (<span className="label label-primary">
                <i className="fa fa-thumbs-o-up"/>&nbsp;Déja liké !
            </span>);
        } else {
            return "";
        }
    }
}


export default connect((state) => {
    return {
        connected: state.signin.connected,
        user: state.signin.user,
    }
}, { giveDocumentOpinion })(LikeButton);
