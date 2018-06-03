import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { injectGlobal } from 'styled-components';
import reducer from './reducer';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import TodoListTemplate from './components/TodoListTemplate/TodoListTemplate';

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background: #f9f9f9;
  }
`;

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TodoListTemplate form={<Form />}>
          <TodoItemList />
        </TodoListTemplate>
      </Provider>
    );
  }
}

export default App;
