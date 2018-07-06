import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Input, DatePicker, Button } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import SvgIcon from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';

const InputGroup = Input.Group;

const AddTodoText = styled.span`
  color: ${oc.gray[5]};
  transition: color 0.3s ease;

  &:hover {
    color: ${oc.gray[8]};
    text-decoration: underline;
    transition: color 0.3s ease;
  }
`;

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { addable: true };
  }

  handleClick = e => {
    console.log(e);
    this.setState({ addable: !this.state.addable });
  };

  handleClickAdd = e => {
    console.log('추가');
    this.setState({ addable: !this.state.addable });
  };

  render() {
    const add = this.state.addable;
    const today = new Date();
    console.log(today.toISOString().substring(0, 10));
    return add ? (
      <div>
        <AddTodoText onClick={this.handleClick}>
          <SvgIcon size={13} icon={ic_add} /> 작업 추가
        </AddTodoText>
      </div>
    ) : (
      <div>
        <InputGroup compact>
          <Input style={{ width: '75%' }} placeholder="작업 추가" />
          <DatePicker
            style={{ width: '25%' }}
            defaultValue={moment(today, 'YYYY-MM-DD')}
          />
        </InputGroup>
        <Button type="primary" onClick={this.handleClickAdd}>
          작업 추가
        </Button>
        <Button onClick={this.handleClick}>취소</Button>
      </div>
    );
  }
}

export default AddTodo;

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
