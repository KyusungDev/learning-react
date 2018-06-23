import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './modules';

const configure = () => {
  let store = createStore(reducers, applyMiddleware(thunk));
  if (process.env.NODE_ENV === 'development') {
    store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
  }

  return store;
};

export default configure;
