import React from 'react';
import styled from 'styled-components';
import TitleBar from '../components/TitleBar';
import Menu from '../components/Menu';
import Panel from './Panel';

const Layout = styled.div`
  height: 100vh;
  padding-top: 30px;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  width: 850px;
  height: 100%;
  margin: 0 auto;
`;

const LayoutStyle = ({ children }) => (
  <Layout>
    <TitleBar />
    <Wrap>
      <Menu />
      <Panel>{children}</Panel>
    </Wrap>
  </Layout>
);

export default LayoutStyle;
