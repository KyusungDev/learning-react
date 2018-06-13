import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

import HomeView from '../views/HomeView';

const Header = styled.div`
  width: 100%;
  height: 50px;
  background-color: #333;
  color: #fff;
  & > span.guide {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  & > a {
    display: inline-block;
    padding: 0 20px;
    vertical-align: middle;
  }
`;
const Logo = styled.div`
  display: inline-block;
  width: 120px;
  vertical-align: middle;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 500;
`;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   console.log('app');
  //   console.log(this.props);
  //   this.state = { login: false };
  // }

  handleGoHome = () => {
    const { history } = this.props;
    history.push('/home');
  };

  render() {
    return (
      <div>
        <Header>
          <span className="guide" />
          <Logo>LOGO</Logo>
          <NavLink to="/home">home</NavLink>
          <Link to="/login">login</Link>
        </Header>
        <Wrap>
          <Switch>
            <Route path="/home" component={HomeView} />
            <Redirect to="/home" />
          </Switch>
        </Wrap>
      </div>
    );
  }
}

export default App;
