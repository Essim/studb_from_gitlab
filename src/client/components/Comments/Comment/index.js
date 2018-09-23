import React, {Component} from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MarkdownArea from '../../MarkdownArea';
import {genericPrintDate} from '../../../util/dateHandler';
import Gravatar from 'react-gravatar';

class Comment extends Component {

    static propTypes = {
        comment: PropTypes.object.isRequired,
    };

    constructor(props) {
       super(props);
    }

    render() {
        return (
        <div className="box-comment">
            <Gravatar email={this.props.comment.name_author} default="identicon" className="img-circle img-sm" />

            <div className="comment-text">
                <span className="username">
                    { this.props.comment.name_author }
                    <span className="pull-right text-muted">{ genericPrintDate(this.props.comment.date) }</span>
                </span>
                <div className="comment-body">
                    { this.props.comment.logicalDelete
                        ? <span className='text-muted'>Ce commentaire a été supprimé</span>
                        : <MarkdownArea content={ this.props.comment.text }/>
                    }
                </div>
            </div>
      </div>
    );
  }

}

export default connect((state) => {
    return {
        connected : state.signin.connected,
        user : state.signin.user
    }
})(Comment);