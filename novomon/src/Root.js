import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { injectGlobal, css } from 'styled-components';
import reset from 'styled-reset';
import App from './components/App';
import store from './store';

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

const Root = () => {
  initStyle();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
