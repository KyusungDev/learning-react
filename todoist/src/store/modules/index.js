import { combineReducers } from 'redux';

const modules = {};

const req = require.context('.', true, /^(?!.\/index).*.js$/);
req.keys().forEach(key => {
  const regex = /.\/(.*?).js$/;
  const moduleName = regex.test(key) && key.match(regex)[1];

  modules[moduleName] = req(key).default;
});

export default combineReducers(modules);
