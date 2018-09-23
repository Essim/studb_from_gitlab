import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FadeIn from "./components/FadeIn";
import styled, { injectGlobal } from "styled-components";
import Navbar from "./components/Navbar";
import Feed from './containers/Feed';
import Profile from './containers/Profile';
import Document from './containers/DocumentPage';
import ZoneAdmin from './containers/ZoneAdmin';
import ContentWrapper from "./components/ContentWrapper";
import {FetchFeed} from "./dataloading";

//========================
// GLOBAL STYLES
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Montserrat');
  *{
    box-sizing: border-box;
  }
  html, body{
    height : 100%;
  }
  body {
    margin: 0;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    height : 100%;
  }
  #app {
    height : 100%;
  }
`;
//========================

//========================
// STYLED COMPONENTS
const Root = styled.div`
  height: 100%;
  width: 100%;
`;

const RootMain = styled.div`

`;
//========================

//========================
// RedirectWithStatus
// Un component qui redirige depuis un code http
// Exemple le code 500 renvoie vers le path /error
// ensuite avec Route on peux facilement afficher un component
const RedirectWithStatus = ({ from, to }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.status = to.state.status;
      return <Redirect from={from} to={to} />;
    }}
  />
);
RedirectWithStatus.propTypes = {
  from: PropTypes.any,
  to: PropTypes.any
};
//========================

//========================
// Fading Route
// Un component qui permet de faire un joli effet de transition
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <FadeIn>
        <Component {...props} />
      </FadeIn>
    )}
  />
);
FadingRoute.propTypes = {
  component: PropTypes.any
};
//========================

//========================
// LOAD DATA for SERVER RENDERING
// Nous utilisons cette config pour dire au serveur
// quel action émettre pour la récupération de donné asynchrone avant de render le chemin
// C'est utile pour le server rendering et quand on veux pré-remplir le store de redux
// pour une route en particulier
export const loadData = [
];
//========================

//========================
// APP
//

export default class App extends Component {
    render() {
        return (
            <Root className="hold-transition skin-blue-light sidebar-mini">
                <RootMain className="wrapper">
                    <Header />
                    <Switch>
                        <FadingRoute path="/" component={Navbar}/>
                    </Switch>
                    <ContentWrapper>
                        <Switch>
                            <FadingRoute exact path="/" component={Feed} />
                            <FadingRoute path="/search" component={Feed} />
                            <FadingRoute path="/user" component={Profile} />
                            <FadingRoute exact path="/document/:cuidDoc" component={Document} />
                            <FadingRoute path="/admin" component={ZoneAdmin} />
                        </Switch>
                    </ContentWrapper>
                    <Footer />
                </RootMain>
            </Root>
        );
    }
}
//========================
