import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {giveDocumentOpinion} from "../actions";
import {OPINION_REPORT} from "../../../constants";

/**
 * TODO:ADD REPORT BUTTON LOGIC
 */
class ReportButton extends Component {

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
            OPINION_REPORT,
            this.props.document_cuid,
            this.props.user
        );
    }


    render() {
        // connecté ?
        if (!this.props.connected) {
            return "";
        }

        const reported = this.props.opinions.some(opinion =>
            opinion.cuid_author === this.props.user.cuid
            && opinion.report === true
        );

        if (reported) {
            return (<span className='label label-danger'>
                <i className="fa fa-warning"/>&nbsp;Déja reporté
            </span>);
        }

        return (
            <button type="button" className="btn btn-danger btn-xs"
                    onClick={this.handleClick}>
                <i className="fa fa-warning"/>&nbsp;Signaler
            </button>
        );
    }
}


export default connect((state) => {
    return {
        connected: state.signin.connected,
        user: state.signin.user,
    }
}, {giveDocumentOpinion})(ReportButton);
