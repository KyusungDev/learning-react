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
const Wrapper = styled.div`
  width: 520px;
`;

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

class AddTodoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { enable: false };
  }

  handleClickEnableEdit = e => {
    this.setState({ enable: true });
  };

  handleClickCancel = e => {
    this.setState({ enable: false });
  };

  handleClickAddTodo = e => {
    this.setState({ enable: false });
  };

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps, nextState);
    // if (
    //   JSON.stringify(nextProps) === JSON.stringify(this.props) &&
    //   JSON.stringify(nextState) === JSON.stringify(this.state)
    // )
    //   return false;
    // console.log(nextProps, nextState);
    return true;
  }

  componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate', prevProps, this.props);
    // if (this.props.enable === false) {
    //   this.setState({ enable: false });
    // }
  }

  render() {
    const { date } = this.props;
    const { enable } = this.state;
    return enable ? (
      <Wrapper>
        <InputGroup>
          <Input style={{ width: '75%' }} placeholder="작업 추가" />
          <DatePicker style={{ width: '25%' }} defaultValue={moment(date)} />
        </InputGroup>
        <div style={{ marginBottom: '5px' }} />
        <Button type="primary" size="small" onClick={this.handleClickAddTodo}>
          작업 추가
        </Button>
        <span style={{ marginLeft: '5px' }} />
        <Button size="small" onClick={this.handleClickCancel}>
          취소
        </Button>
      </Wrapper>
    ) : (
      <AddTodoText onClick={this.handleClickEnableEdit}>
        <SvgIcon size={13} icon={ic_add} /> 작업 추가
      </AddTodoText>
    );
  }
}

export default AddTodoComponent;

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
