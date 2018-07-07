import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { getDayOfWeek, getFullDateString } from './../utils/DateUtil';
import SubsectionHeader from './../components/SubsectionHeader';
import AddTodoButton from './../components/AddTodoButton';

const TitleWrapper = styled.div`
  font-size: 1.2em;
  margin-left: 3px;
  margin-bottom: 30px;
`;

const SpaceBetweenItem = styled.div`
  margin-bottom: 40px;
`;

class ViewWeekdays extends Component {
  constructor(props) {
    super(props);
    this.state = { editStates: this.getDefaultEditStates() };
  }

  getDefaultEditStates() {
    return [...Array(7).keys()].map(() => false);
  }

  handleClickEanbleEdit = (e, data) => {
    const { index } = data;
    let defaultEditStates = this.getDefaultEditStates();
    defaultEditStates[index] = true;
    this.setState({ editStates: defaultEditStates });
  };

  handleClickAddTodo = (e, data) => {
    this.setState({ editStates: this.getDefaultEditStates() });
  };

  handleClickCancel = (e, data) => {
    this.setState({ editStates: this.getDefaultEditStates() });
  };

  render() {
    const today = new Date();
    const todayDate = today.getDate();
    const { editStates } = this.state;

    return (
      <div>
        <TitleWrapper>다음 7일</TitleWrapper>
        {[...Array(7).keys()].map((item, index) => {
          const date = new Date();
          date.setDate(todayDate + item);

          const dayOfWeek =
            item === 0
              ? '오늘'
              : item === 1
                ? '내일'
                : getDayOfWeek(date.getDay()) + '요일';

          const dateText = getFullDateString(
            date.getMonth(),
            date.getDate(),
            date.getDay()
          );

          return (
            <Fragment key={index}>
              <SubsectionHeader dayOfWeek={dayOfWeek} dateText={dateText} />
              <AddTodoButton
                index={index}
                onClickEnableEdit={this.handleClickEanbleEdit}
                onClickAddTodo={this.handleClickAddTodo}
                onClickCancel={this.handleClickCancel}
                enableEditing={editStates[index]}
                date={date}
              />
              <SpaceBetweenItem />
            </Fragment>
          );
        })}
      </div>
    );
  }
}

export default ViewWeekdays;
