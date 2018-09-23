import React, { Component } from "react";
import PropTypes from "prop-types";
import {giveDocumentOpinion} from "../actions";
import {connect} from "react-redux";
import {OPINION_DISLIKE} from "../../../constants";

/**
 * TODO:ADD DISLIKE BUTTON LOGIC
 */
class DislikeButton extends Component {

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
            OPINION_DISLIKE,
            this.props.document_cuid,
            this.props.user
        );
    }

    render() {
        // connecté ?
        if (!this.props.connected) {
            return "";
        }

        //A déja like/dislike
        const liked = this.props.opinions.find(opinion => opinion.cuid_author === this.props.user.cuid && opinion.report === false);

        if (typeof liked === "undefined") {
            return (
                <button type="button"
                        className="btn btn-danger btn-xs"
                        onClick={this.handleClick}>
                    <i className="fa fa-thumbs-o-down"/>
                    Dislike
                </button>
            );
        } else if (liked.state === false) {
            return (<span className="label label-danger">
                <i className="fa fa-thumbs-o-down"/>&nbsp;
                Déja disliké !
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
}, { giveDocumentOpinion })(DislikeButton);
