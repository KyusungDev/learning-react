import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
  margin-top: 1.5rem;
  height: 3rem;
  background: ${oc.teal[6]};
  color: white;
  padding-top: 0.9rem;

  text-align: center;
  font-size: 1rem;

  cursor: pointer;
  user-select: none;
  transition: 0.2s all;

  &:hover {
    background: ${oc.teal[5]};
  }

  &:active {
    background: ${oc.teal[7]};
  }
`;

const StyledButton = ({ children, onClick }) => (
  <Wrapper onClick={onClick}>{children}</Wrapper>
);

export default StyledButton;
