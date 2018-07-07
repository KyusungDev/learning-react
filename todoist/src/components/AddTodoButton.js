import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import oc from 'open-color';
import { Input, DatePicker, Button } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import SvgIcon from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';

const InputGroup = Input.Group;

const AddTodoText = styled.span`
  padding-left: 3px;
  color: ${oc.gray[5]};
  transition: color 0.3s ease;

  &:hover {
    color: ${oc.gray[8]};
    text-decoration: underline;
    transition: color 0.3s ease;
  }
`;

class AddTodoButton extends Component {
  constructor(props) {
    super(props);
    this.state = { enableEditing: false };
  }

  handleClickEnableEdit = e => {
    const { onClickEnableEdit } = this.props;
    if (onClickEnableEdit) {
      onClickEnableEdit(e, { ...this.props });
    } else {
      this.setState({ enableEditing: true });
    }
  };

  handleClickCancel = e => {
    const { onClickCancel } = this.props;
    if (onClickCancel) {
      onClickCancel(e, { ...this.props });
    } else {
      this.setState({ enableEditing: false });
    }
  };

  handleClickAddTodo = e => {
    const { onClickAddTodo } = this.props;
    if (onClickAddTodo) {
      onClickAddTodo(e, { ...this.props });
    } else {
      this.setState({ enableEditing: false });
    }
  };

  render() {
    const { enableEditing } = this.props;
    const { date } = this.props;
    return enableEditing ? (
      <div>
        <InputGroup compact>
          <Input style={{ width: '75%' }} placeholder="작업 추가" />
          <DatePicker
            style={{ width: '25%' }}
            defaultValue={moment(date, 'YYYY-MM-DD')}
          />
        </InputGroup>
        <div style={{ marginBottom: '5px' }} />
        <Button type="primary" size="small" onClick={this.handleClickAddTodo}>
          작업 추가
        </Button>
        <span style={{ marginLeft: '5px' }} />
        <Button size="small" onClick={this.handleClickCancel}>
          취소
        </Button>
      </div>
    ) : (
      <AddTodoText onClick={this.handleClickEnableEdit}>
        <SvgIcon size={13} icon={ic_add} /> 작업 추가
      </AddTodoText>
    );
  }
}

AddTodoButton.propTypes = {
  onClickAddTodo: PropTypes.func,
  onClickAddCancel: PropTypes.func,
  onClickEnableEdit: PropTypes.func,
  date: PropTypes.instanceOf(Date)
};

export default AddTodoButton;

// import moment from 'moment';
// import { DatePicker } from 'antd';

// const { MonthPicker, RangePicker } = DatePicker;

// function range(start, end) {
//   const result = [];
//   for (let i = start; i < end; i++) {
//     result.push(i);
//   }
//   return result;
// }

// function disabledDate(current) {
//   // Can not select days before today and today
//   return current && current < moment().endOf('day');
// }
