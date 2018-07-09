import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import SvgIcon from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_playlist_add_check } from 'react-icons-kit/md/ic_playlist_add_check';
import { Input, Button, Icon, Popover } from 'antd';
import AddTodo from './AddTodo';
import moment from 'moment';

const SearchBar = styled(Input.Search)`
  top: -1px;
  color: ${oc.gray[6]};

  & > input {
    border: none;
    background-color: ${oc.gray[8]};
  }
  & > input:hover {
    background-color: ${oc.gray[7]};
  }
  & > input:focus {
    background-color: ${oc.gray[2]};
  }
`;

const MainIcon = styled(SvgIcon)`
  color: ${oc.gray[1]};

  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: ${oc.gray[8]};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SidebarWrapper = styled.div`
  width: 250px;
`;

const ViewWrapper = styled.div`
  width: 550px;
`;

const AddIconWrapper = styled.div`
  padding-left: 10px;
  width: 50px;
`;

class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = { visibleAddTodo: false };
  }

  handleClickAddTodo = e => {
    this.setState({ visibleAddTodo: true });
  };

  render() {
    const { visibleAddTodo } = this.state;
    const addTodoContent = (
      <AddTodo date={moment().format('YYYY-MM-DD')} enable={true} />
    );

    return (
      <Wrapper>
        <InnerWrapper>
          <SidebarWrapper>
            {' '}
            <MainIcon
              size={40}
              icon={ic_playlist_add_check}
              onClick={e => console.log('home')}
            />
          </SidebarWrapper>
          <ViewWrapper>
            <SearchBar
              placeholder="Search for..."
              onSearch={value => console.log(value)}
            />
          </ViewWrapper>
          <AddIconWrapper>
            <Popover
              content={addTodoContent}
              title="빠른 추가"
              trigger="click"
              // visible={visibleAddTodo}
            >
              <MainIcon
                size={35}
                icon={ic_add}
                onClick={this.handleClickAddTodo}
              />
            </Popover>
          </AddIconWrapper>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default TitleBar;
