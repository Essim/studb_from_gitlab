import React, {Component} from "react";
import PropTypes from 'prop-types';


class DislikeCounter extends Component {

    static propTypes = {
        items: PropTypes.array,
    };

    static defaultProps = {
        items: [],
    };

    render() {
        return (
          <span>{this.props.items.length} <i className="fa fa-thumbs-o-down"/></span>
        );
    }
}

export default DislikeCounter;
