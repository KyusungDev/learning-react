import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { injectGlobal, css } from 'styled-components';
import reset from 'styled-reset';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';
import App from './components/App';

const init = css`
  * {
    box-sizing: inherit;
  }
  body {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
const initStyle = () => injectGlobal`
  ${reset}
  ${init}
`;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      );
    }}
  />
);

const Root = () => {
  initStyle();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginView} />
        <Route path="/signup" component={SignupView} />
        <PrivateRoute path="/" component={App} />
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
