import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Icon } from 'react-icons-kit';
import { ic_archive, ic_today, ic_view_week } from 'react-icons-kit/md';
import { NavLink } from 'react-router-dom';
import { Vertical } from '../styles/Common';
import ProjectMenu from './ProjectMenu';

const Menu = styled.div`
  width: 250px;
  height: 100%;
  padding: 30px 0;
  background-color: ${oc.gray[0]};
`;

const Nav = styled.div`
  width: 100%;
  font-size: 0.9em;
  color: ${oc.gray[7]};
`;

const Item = styled(NavLink)`
  position: relative;
  display: block;
  width: 100%;
  height: 45px;
  padding: 0 10px 0 40px;
  ${Vertical} /* &::before { content: ''; display: inline-block; height: 100%; vertical-align: middle; }
  & > span { display: inline-block; vertical-align: middle; } */
 
  &:hover {
    color: ${oc.gray[7]};
    background-color: #fff;
  }

  &.active {
    background-color: #fff;
    color: ${oc.gray[9]};
    font-weight: bold;
  }

  & > div.icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    padding-right: 5px;
  }
  /* &:first-child > div.icon {
    left: 0;
  } */
`;

const MenuComponent = () => (
  <Menu>
    <Nav>
      <Item to="/inbox">
        <Icon className="icon" icon={ic_archive} size="24" />
        <span>관리함</span>
      </Item>
      <Item to="/today">
        <Icon className="icon" icon={ic_today} size="24" />
        <span>오늘</span>
      </Item>
      <Item to="/week">
        <Icon className="icon" icon={ic_view_week} size="24" />
        <span>다음 7일</span>
      </Item>
      <ProjectMenu />
    </Nav>
  </Menu>
);

export default MenuComponent;
