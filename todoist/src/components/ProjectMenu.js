import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import AddProject from './AddProject';
import ProjectItem from './ProjectItem';
import { Vertical } from '../styles/Common';
import oc from 'open-color';
import { Icon } from 'react-icons-kit';
import { ic_chevron_right, ic_expand_more, ic_add } from 'react-icons-kit/md';

const Menu = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 45px;
  padding: 0 10px 0 40px;
  user-select: none;
  ${Vertical};

  &:hover {
    background-color: ${oc.gray[1]};
    cursor: pointer;
  }

  & > div.icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    padding-right: 5px;
  }

  & > div.icon-add {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);

    &:hover {
      color: ${oc.gray[9]};
    }
  }
`;

const AddRearWrapper = styled.span`
  position: relative;
  height: 100%;
  font-size: 0.8em;
  user-select: none;
  ${Vertical};

  & > span {
    color: ${oc.gray[7]};
    padding-left: 20px;
  }

  & > span:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  & > div.icon-add {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Items = styled.div`
  position: relative;
  height: 30px;
  padding-left: 20px;
`;

class ProjectMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      visiableAddFront: false,
      visiableAddRear: false
    };
  }

  handleClick = e => {
    this.setState({ expand: !this.state.expand });
  };

  handleClickAddFront = e => {
    e.stopPropagation();
    this.setState({
      visiableAddFront: true,
      visiableAddRear: false,
      expand: true
    });
  };

  handleClickAddRear = e => {
    e.stopPropagation();
    this.setState({ visiableAddFront: false, visiableAddRear: true });
  };

  handleClickAddProejct = e => {
    this.setState({ visiableAddFront: false, visiableAddRear: false });
  };

  handleClickCancelAddProject = e => {
    this.setState({ visiableAddFront: false, visiableAddRear: false });
  };

  render() {
    const { expand, visiableAddFront, visiableAddRear } = this.state;
    const projects = [
      {
        color: 'red',
        name: 'name'
      },
      {
        color: '',
        name: 'name2'
      }
    ];

    return (
      <div>
        <Menu onClick={this.handleClick}>
          <Icon
            className="icon"
            icon={expand ? ic_expand_more : ic_chevron_right}
            size={26}
          />
          <span>프로젝트</span>
          <Icon
            className="icon-add"
            icon={ic_add}
            size={26}
            onClick={this.handleClickAddFront}
          />
        </Menu>
        {expand && (
          <Items>
            {visiableAddFront && (
              <AddProject
                onClickAdd={this.handleClickAddProejct}
                onClickCancel={this.handleClickCancelAddProject}
              />
            )}
            {projects.map((item, index) => (
              <NavLink to={`/project/${index + 1}`} key={index}>
                <ProjectItem iconColor={item.color} name={item.name} />
              </NavLink>
            ))}
            {visiableAddRear && (
              <AddProject
                onClickAdd={this.handleClickAddProejct}
                onClickCancel={this.handleClickCancelAddProject}
              />
            )}
            <AddRearWrapper onClick={this.handleClickAddRear}>
              <Icon className="icon-add" icon={ic_add} size={16} />
              <span>프로젝트 추가</span>
            </AddRearWrapper>
          </Items>
        )}
      </div>
    );
  }
}

export default ProjectMenu;
