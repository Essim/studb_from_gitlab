import React, {Component} from 'react';
import PropTypes from 'prop-types';
import OutlookLogin from 'react-ms-login';

export const CLIENT_ID = '17ab317a-2eb7-4346-ab2a-65c786611e61';
export const CSS_CLASS = 'btn btn-info outlookBtn';
export const REDIRECT_URI = 'http://localhost:8888';
export const SCOPES = ['user.readbasic.all'];
export const BTN_CONTENT = "S'inscrire avec Outlook";

class Outlook extends Component {
    constructor(props) {
        super(props);
        this.callBack = this.callBack.bind(this);
        /* this.callBackMail = this.callBackMail.bind(this);
            this.getUserEmail = this.getUserEmail.bind(this); */
    }

    callBack(response) {
        console.log(response);
        this.props.outlookOauth(response);
    }

    /*
      callBackMail(error, mail) {
          console.log(mail);
      }

      getUserEmail(token, callBack) {
          console.log(microsoftGraph);
          const client = microsoftGraph.Client.init({
              authProvider: (done) => {
                  done(null, token);
              }
          });

          client
              .api('/me')
              .get((err, res) => {
                  if(err) {
                      callBack(err, null);
                  } else {
                      callBack(null, res.mail);
                  }
              });
      }
  */
    render() {
        return (
            <OutlookLogin
                clientId={CLIENT_ID}
                redirectUri={REDIRECT_URI}
                scopes={SCOPES}
                cssClass={CSS_CLASS}
                btnContent={BTN_CONTENT}
                handleLogin={this.callBack}
            />
        );
    }
}

Outlook.propTypes = {
    outlookOauth: PropTypes.func.isRequired,
};

export default Outlook;
