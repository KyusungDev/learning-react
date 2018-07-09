import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ViewInbox from '../views/ViewInbox';
import ViewToday from '../views/ViewToday';
import ViewWeek from '../views/ViewWeek';
import ViewProject from '../views/ViewProject';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={ViewToday} />
      <Route path="/inbox" component={ViewInbox} />
      <Route path="/today" component={ViewToday} />
      <Route path="/week" component={ViewWeek} />
      <Route path="/project/:id" component={ViewProject} />
      <Redirect to="/today" />
    </Switch>
  );
};

export default App;
