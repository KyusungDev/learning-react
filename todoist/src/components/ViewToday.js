import React, { Component } from 'react';
import { getTodayString } from './../utils/DateUtil';
import DateTitle from './DateTitle';
import AddTodo from './AddTodo';

class ViewToday extends Component {
  render() {
    return (
      <div>
        <DateTitle dayOfWeek={'오늘'} date={getTodayString()} />
        <AddTodo />
      </div>
    );
  }
}

export default ViewToday;
