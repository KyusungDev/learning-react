import React, { Component } from 'react';
import SubsectionHeader from './../components/SubsectionHeader';
import AddTodoButton from './../components/AddTodoButton';

class ViewInbox extends Component {
  constructor(props) {
    super(props);
    this.state = { enableEditing: false };
  }

  handleClickEanbleEdit = e => {
    this.setState({ enableEditing: true });
  };

  handleClickAddTodo = e => {
    this.setState({ enableEditing: false });
  };

  handleClickCancel = e => {
    this.setState({ enableEditing: false });
  };

  render() {
    const { enableEditing } = this.state;
    return (
      <div>
        <SubsectionHeader dayOfWeek={'관리함'} dateText={''} />
        <AddTodoButton
          onClickEnableEdit={this.handleClickEanbleEdit}
          onClickAddTodo={this.handleClickAddTodo}
          onClickCancel={this.handleClickCancel}
          enableEditing={enableEditing}
          date={new Date()}
        />
      </div>
    );
  }
}

export default ViewInbox;
