import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import ViewInbox from '../views/ViewInbox';
import ViewToday from '../views/ViewToday';
import ViewWeekdays from '../views/ViewWeekdays';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ViewToday} />
        <Route path="/inbox" component={ViewInbox} />
        <Route path="/today" component={ViewToday} />
        <Route path="/weekdays" component={ViewWeekdays} />
      </Switch>
    );
  }
}

export default App;
