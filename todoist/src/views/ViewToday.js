import React, { Component } from 'react';
import { getTodayString } from './../utils/DateUtil';
import SubsectionHeader from './../components/SubsectionHeader';
import AddTodoButton from './../components/AddTodoButton';

class ViewToday extends Component {
  constructor(props) {
    super(props);
    this.state = { editState: false };
  }

  handleClickEanbleEdit = e => {
    this.setState({ editState: true });
  };

  handleClickAddTodo = e => {
    this.setState({ editState: false });
  };

  handleClickCancel = e => {
    this.setState({ editState: false });
  };

  render() {
    const { editState } = this.state;
    return (
      <div>
        <SubsectionHeader dayOfWeek={'오늘'} dateText={getTodayString()} />
        <AddTodoButton
          onClickEnableEdit={this.handleClickEanbleEdit}
          onClickAddTodo={this.handleClickAddTodo}
          onClickCancel={this.handleClickCancel}
          editState={editState}
          date={new Date()}
        />
      </div>
    );
  }
}

export default ViewToday;
