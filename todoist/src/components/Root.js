import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import TitleBar from './TitleBar';
import MainView from './MainView';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Root extends Component {
  render() {
    return (
      <div>
        <TitleBar />
        <Wrapper>
          <MainView />
        </Wrapper>
      </div>
    );
  }
}

export default Root;
