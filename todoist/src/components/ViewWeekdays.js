import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { getDayOfWeek, getFullDateString } from './../utils/DateUtil';
import DateTitle from './DateTitle';
import AddTodo from './AddTodo';

const TitleWrapper = styled.div`
  font-size: 1.2em;
  margin-left: 3px;
  margin-bottom: 30px;
`;

const AddTodoButtonWrapper = styled.div`
  padding-left: 10px;
  margin-bottom: 40px;
`;

class ViewWeekdays extends Component {
  render() {
    const today = new Date();
    const todayDate = today.getDate();
    return (
      <div>
        <TitleWrapper>다음 7일</TitleWrapper>
        {[0, 1, 2, 3, 4, 5, 6].map(x => {
          const day = today;
          day.setDate(todayDate + x);

          const dayOfWeek =
            x === 0
              ? '오늘'
              : x === 1
                ? '내일'
                : getDayOfWeek(day.getDay()) + '요일';
          const date = getFullDateString(
            day.getMonth(),
            day.getDate(),
            day.getDay()
          );
          return (
            <Fragment>
              <DateTitle dayOfWeek={dayOfWeek} date={date} />
              <AddTodoButtonWrapper>
                <AddTodo />
              </AddTodoButtonWrapper>
            </Fragment>
          );
        })}
      </div>
    );
  }
}

export default ViewWeekdays;
