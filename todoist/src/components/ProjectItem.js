import React from 'react';
import styled from 'styled-components';
import { Vertical } from '../styles/Common';
import oc from 'open-color';

const Item = styled.div`
  position: relative;
  height: 30px;
  font-size: 0.8em;
  user-select: none;
  padding-left: 2px;
  ${Vertical};
  & > .name {
    color: ${oc.gray[7]};
    padding-left: 5px;
  }

  &:active {
    background-color: red;
  }

  /* & > .icon {
    color: ${oc.gray[7]};
    transform: translateY(-50%);
  } */
`;

const Marker = styled.span`
  color: ${props => props.color};
  opacity: 0.7;
`;

const ProjectItem = ({ iconColor, name }) => {
  return (
    <Item>
      <Marker color={iconColor}>●</Marker>
      <span className="name">{name}</span>
    </Item>
  );
};

export default ProjectItem;
