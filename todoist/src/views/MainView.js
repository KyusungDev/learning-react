import React, { Component, Fragments } from 'react';
import styled from 'styled-components';
import { Nav, NavIcon, NavText } from './../components/nav/Nav';
import SvgIcon from 'react-icons-kit';
import oc from 'open-color';
import { ic_archive } from 'react-icons-kit/md/ic_archive';
import { ic_today } from 'react-icons-kit/md/ic_today';
import { ic_view_week } from 'react-icons-kit/md/ic_view_week';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { withRR4 } from './../components/nav/withRR4';
import ViewInbox from '../views/ViewInbox';
import ViewToday from '../views/ViewToday';
import ViewWeekdays from '../views/ViewWeekdays';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const SidebarWrapper = styled.div`
  width: 250px;
  background-color: ${oc.gray[1]};
  box-shadow: -1px 0px 1px rgba(0, 0, 0, 0.1);
  padding-top: 20px;
`;

const ViewWrapper = styled.div`
  width: 600px;
  padding: 30px;
  background-color: ${oc.gray[0]};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
`;

const SideNav = withRR4();

class MainView extends Component {
  render() {
    return (
      <Wrapper>
        <SidebarWrapper>
          <SideNav
            // highlightColor={`${oc.gray[2]}`}
            highlightBgColor={`${oc.gray[2]}`}
            defaultSelected="today"
          >
            <Nav id="inbox">
              <NavIcon>
                <SvgIcon size={20} icon={ic_archive} />
              </NavIcon>
              <NavText> 관리함 </NavText>
            </Nav>

            <Nav id="today">
              <NavIcon>
                <SvgIcon size={20} icon={ic_today} />
              </NavIcon>
              <NavText> 오늘 </NavText>
            </Nav>
            <Nav id="weekdays">
              <NavIcon>
                <SvgIcon size={20} icon={ic_view_week} />
              </NavIcon>
              <NavText> 다음 7일 </NavText>
            </Nav>
          </SideNav>
        </SidebarWrapper>
        <ViewWrapper>
          <Route exact path="/" component={ViewToday} />
          <Route path="/inbox" component={ViewInbox} />
          <Route path="/today" component={ViewToday} />
          <Route path="/weekdays" component={ViewWeekdays} />
        </ViewWrapper>
      </Wrapper>
    );
  }
}

export default MainView;
