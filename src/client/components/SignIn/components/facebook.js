import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';

export const APP_ID = '144211549652881';
export const AUTO_LOAD = false;
export const FIELDS = 'name,email,picture';
export const CSS_CLASS = 'btn btn-primary facebookBtn';
export const TEXT_BUTTON = "Facebook";

class Facebook extends Component {
    constructor(props) {
        super(props);

        this.callBack = this.callBack.bind(this);
    }

    callBack(response) {
        this.props.facebookOauth(response);
    }

    render() {
        return (
            <FacebookLogin
                appId={APP_ID}
                autoLoad={AUTO_LOAD}
                fields={FIELDS}
                callback={this.callBack}
                cssClass={CSS_CLASS}
                textButton={TEXT_BUTTON}
            />
        );
    }
}

Facebook.propTypes = {
    facebookOauth: PropTypes.func.isRequired,
};

export default Facebook;
