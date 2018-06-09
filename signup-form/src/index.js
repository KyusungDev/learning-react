import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import reset from 'styled-reset';
import App from './App';

const initStyle = () => injectGlobal`
  ${reset}
  * { box-sizing: inherit; }
  body { box-sizing: border-box; }
`;

initStyle();
ReactDOM.render(<App />, document.getElementById('root'));
