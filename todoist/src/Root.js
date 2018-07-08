import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { injectGlobal, css } from 'styled-components';
import reset from 'styled-reset';
import store from './store';
import App from './components/App';

const init = css`
  * {
    box-sizing: inherit;
  }
  *::before,
  *::after {
    box-sizing: inherit;
    outline: 0;
  }
  body {
    width: 100%;
    height: 100%;
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

const Root = () => {
  initStyle();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
