import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { injectGlobal, css } from 'styled-components';
import reset from 'styled-reset';
import store from './store';
import Root from './components/Root';

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

class App extends Component {
  render() {
    initStyle();
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Root} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
