import React, { Component } from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";

export default class Comments extends Component {

    static propTypes = {
        mainComments: PropTypes.bool,
        comments: PropTypes.array.isRequired
    };

    static defaultProps = {
        comments: [],
        mainComments: false,
    };

    render () {
        return (<div className="box-comments">
            {this.props.comments.map((comment) => <Comment key={comment.cuid} comment={comment}/>)}
        </div>);
    }

}

