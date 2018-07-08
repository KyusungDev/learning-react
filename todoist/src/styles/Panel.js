import React from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  width: 600px;
  height: 100%;
  padding: 40px;
  background-color: #fff;
  border-left: 1px solid #f5f5f5;
  border-right: 1px solid #f5f5f5;
`;

const PanelStyle = ({ children }) => <Panel>{children}</Panel>;

export default PanelStyle;
