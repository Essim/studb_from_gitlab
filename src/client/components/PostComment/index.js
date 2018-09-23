import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import {commentDocument} from "./action";
import Gravatar from 'react-gravatar';

export class PostComment extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        connected: PropTypes.bool.isRequired,
        document: PropTypes.string.isRequired,
        commentDocument: PropTypes.func.isRequired,
        commenting: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = { input: "", focus: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ input: e.target.value });
    }

    handleBlur() {
        if (!this.state.input) {
            this.setState({ focus: false });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.props.commenting.loading) {
            return;
        }

        if (this.props.connected && this.state.input && !/^\s*$/.test(this.state.input)) {
            this.props.commentDocument(this.props.document, {
                cuid_author: this.props.user.cuid,
                name_author: this.props.user.pseudo,
                text: this.state.input,
                mainComment: true,
            });
        }

        this.setState({ input : '', focus: false });
    }

    renderInput() {
        if (!this.state.focus) {
            return (<Input
                onFocus={() => this.setState({focus: true})}
                className="form-control input-sm"
                value={this.state.input}
                placeholder="Lache un commentaire !"
                onChange={this.handleChange} />);
        }

        return [
            (<Input
                autoFocus
                className="form-control input-sm"
                type="textarea"
                value={this.state.input}
                onBlur={this.handleBlur}
                onChange={this.handleChange} />),
            (<Input type="submit" />)
        ];
    }

    render() {
        if (!this.props.connected) {
            return (<p className="text-muted text-center">
                Vous devez être connecté pour pouvoir commenter !
            </p>)
        }

        // todo : implement user profileStats pic ?
        return (
            <form action="#" method="post" onSubmit={this.handleSubmit.bind(this)}>
                <Gravatar email={this.props.user.pseudo} default="identicon" className="img-responsive img-circle img-sm" />
                <div className="img-push">
                    {this.renderInput()}
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        connected: state.signin.connected,
        user : state.signin.user,
        commenting: state.commenter,
    }
};

export default connect (mapStateToProps, {
    commentDocument
})(PostComment);

