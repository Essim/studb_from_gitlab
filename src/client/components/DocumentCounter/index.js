import React, {Component} from "react";
import PropTypes from "prop-types";
import LikeCounter from "./LikeCounter";
import DislikeCounter from "./DislikeCounter";
import CommentCounter from "./CommentCounter";

export class DocumentCounter extends Component {

    static propTypes = {
        counter: PropTypes.oneOf(['like', 'dislike', 'comment']),
        items: PropTypes.array
    };

    render() {
        switch (this.props.counter){
            case "like":
                return <LikeCounter items={this.props.items}/>;
            case "dislike":
                return <DislikeCounter items={this.props.items}/>;
            case "comment":
                return <CommentCounter items={this.props.items}/>;
        }
    }
}

export default DocumentCounter;
