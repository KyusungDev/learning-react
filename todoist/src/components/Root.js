import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import TitleBar from './TitleBar';
import MainView from '../views/MainView';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Root extends Component {
  render() {
    return (
      <Fragment>
        <TitleBar />
        <Wrapper>
          <MainView />
        </Wrapper>
      </Fragment>
    );
  }
}

export default Root;
