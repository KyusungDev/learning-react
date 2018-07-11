import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import AddProject from './AddProject';
import { Vertical } from '../styles/Common';
import oc from 'open-color';
import { Icon } from 'react-icons-kit';
import { ic_chevron_right, ic_expand_more, ic_add } from 'react-icons-kit/md';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoistActions from '../store/modules/Todoist';
import * as ConfigActions from '../store/modules/Config';

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

const AddRearWrapper = styled.div`
  position: relative;
  display: inline-block;
  height: 30px;
  font-size: 0.8em;
  user-select: none;
  padding-left: 10px;
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

const SubMenu = styled.div`
  position: relative;
  padding-left: 20px;
`;

const ProjectItem = styled(NavLink)`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 0.8em;
  padding-left: 11px;

  &:hover {
    color: ${oc.gray[7]};
    background-color: #fff;
  }

  &.active {
    text-decoration: none;
    background-color: #fff;
    color: ${oc.gray[9]};

    & > .name {
      font-weight: bold;
    }
  }

  & > .name {
    color: ${oc.gray[7]};
    padding-left: 5px;
  }
`;

const Marker = styled.span`
  color: ${props => props.color};
  opacity: 0.7;
`;

class ProjectMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: this.props.expand,
      todoist: this.props.todoist,
      visiableAddFront: false,
      visiableAddRear: false,
      selectedProejctId: ''
    };
  }

  handleClick = e => {
    this.props.configActions.ExpandProjectMenuSync(!this.props.expand);
  };

  handleClickAddFront = e => {
    e.stopPropagation();
    this.props.configActions.ExpandProjectMenuSync(true);
    this.setState({
      visiableAddFront: true,
      visiableAddRear: false
    });
  };

  handleClickAddRear = e => {
    this.setState({ visiableAddFront: false, visiableAddRear: true });
  };

  handleClickAddProejct = e => {
    this.setState({ visiableAddFront: false, visiableAddRear: false });
  };

  handleClickCancelAddProject = e => {
    this.setState({ visiableAddFront: false, visiableAddRear: false });
  };

  handleClickProjectItem = (e, id) => {
    this.setState({ selectedProejctId: id });
  };

  render() {
    const { expand } = this.props;
    const { visiableAddFront, visiableAddRear, todoist } = this.state;
    const projects = todoist.projects.map(item => {
      return {
        id: item.id,
        name: item.name,
        color: item.color
      };
    });

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
          <SubMenu>
            {visiableAddFront && (
              <AddProject
                color={oc.red[5]}
                onClickAdd={this.handleClickAddProejct}
                onClickCancel={this.handleClickCancelAddProject}
              />
            )}
            {projects.map(project => (
              <ProjectItem
                onClick={e => this.handleClickProjectItem(e, project.id)}
                isActive={() => this.state.selectedProejctId === project.id}
                to={`/project/${project.id}`}
                key={project.id}
              >
                <Marker color={project.color}>●</Marker>
                <span className="name">{project.name}</span>
              </ProjectItem>
            ))}
            {visiableAddRear && (
              <AddProject
                color={oc.blue[5]}
                onClickAdd={this.handleClickAddProejct}
                onClickCancel={this.handleClickCancelAddProject}
              />
            )}
            <AddRearWrapper onClick={this.handleClickAddRear}>
              <Icon className="icon-add" icon={ic_add} size={16} />
              <span>프로젝트 추가</span>
            </AddRearWrapper>
          </SubMenu>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todoist: state.Todoist.todoist,
    expand: state.Config.projectMenuExpand
  };
};

const mapDispatchToProps = dispatch => ({
  todoistActions: bindActionCreators(TodoistActions, dispatch),
  configActions: bindActionCreators(ConfigActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectMenu);
