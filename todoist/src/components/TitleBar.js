import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import SvgIcon from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_playlist_add_check } from 'react-icons-kit/md/ic_playlist_add_check';
import { Input, Button, Icon } from 'antd';

const Search = Input.Search;

const SearchBox = styled(Input.Search)`
  top: -2px;
  color: ${oc.gray[6]};
  border: none;
  outline: 0;

  & > input {
    border: none;
    background-color: ${oc.gray[8]};
  }
  & > input:hover {
    background-color: ${oc.gray[7]};
  }
  & > input:focus {
    outline: 0;
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

const TitleBar = () => {
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
          <SearchBox
            placeholder="Search for..."
            onSearch={value => console.log(value)}
          />
        </ViewWrapper>
        <AddIconWrapper>
          <MainIcon size={35} icon={ic_add} onClick={e => console.log('add')} />
        </AddIconWrapper>
      </InnerWrapper>
    </Wrapper>
  );
};

export default TitleBar;
