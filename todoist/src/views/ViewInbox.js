import React, { Component } from 'react';
import SubsectionHeader from './../components/SubsectionHeader';
import AddTodoButton from './../components/AddTodoButton';

class ViewInbox extends Component {
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
        <SubsectionHeader dayOfWeek={'관리함'} dateText={''} />
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

export default ViewInbox;
