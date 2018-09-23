import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';

export const CLIENT_ID = '741207909010-8mq8ggk33ulpcnpr4m4reaud9sq5e7d1.apps.googleusercontent.com';
export const AUTO_LOAD = false;
export const CSS_CLASS = 'btn btn-danger googleBtn';
export const BUTTON_TEXT = "Google";

class Google extends Component {
    constructor(props) {
        super(props);
        this.callBack = this.callBack.bind(this);
    }

    callBack(response) {
        this.props.googleOauth(response);
    }

    render() {
        return (
            <GoogleLogin
                clientId={CLIENT_ID}
                autoLoad={AUTO_LOAD}
                className={CSS_CLASS}
                onSuccess={this.callBack}
                buttonText={BUTTON_TEXT}
            />
        );
    }
}

Google.propTypes = {
    googleOauth: PropTypes.func.isRequired,
};

export default Google;

