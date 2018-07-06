import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${oc.gray[8]};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
`;

const TitleBar = () => {
  return <Wrapper />;
};

export default TitleBar;
