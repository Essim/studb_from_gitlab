import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {documentChangeVersion} from "../../../containers/DocumentPage/action";

export class VersionTimeline extends Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.documentChangeVersion(this.props.cuid);
    }

    render(){
        return(
            <li className="time-label selecteable">
                  <span onClick={this.handleClick}
                        className="bg-blue">
                    Version {this.props.version}
                  </span>
            </li>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        documentPage: state.documentPage,
    }
};

const dispatchToProps = {
    documentChangeVersion,
};

export default connect(mapStateToProps, dispatchToProps)(VersionTimeline);
