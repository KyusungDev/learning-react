import React, { Component } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import oc from 'open-color';
import { Input, Icon, Button } from 'antd';

const InputName = styled(Input)`
  width: 90%;
  top: -1px;
  color: ${oc.gray[6]};
  margin: 5px 0 5px 0;

  & > input {
    border: 1px solid ${oc.gray[2]};
    outline: 0;
  }
`;

class AddProjectComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true, name: '' };
  }

  handleClickAdd = e => {
    if (this.props.onClickAdd) {
      this.props.onClickAdd(e);
    }

    this.setState({ visible: false });
  };

  handleClickCancel = e => {
    if (this.props.onClickCancel) {
      this.props.onClickCancel(e);
    }

    this.setState({ visible: false });
  };

  emitEmpty = () => {
    this.setState({ name: '' });
  };

  onChangeName = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    const { name } = this.state;

    return this.state.visible ? (
      <div>
        <InputName
          placeholder="프로젝트 이름"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          suffix={<Icon type="close-circle" onClick={this.emitEmpty} />}
          value={name}
          onChange={this.onChangeName}
        />

        <Button type="primary" size="small" onClick={this.handleClickAdd}>
          프로젝트 추가
        </Button>
        <span style={{ marginLeft: '5px' }} />
        <Button size="small" onClick={this.handleClickCancel}>
          취소
        </Button>
      </div>
    ) : null;
  }
}

AddProjectComponent.propTypes = {
  onClickAdd: propTypes.func.isRequired,
  onClickCancel: propTypes.func.isRequired
};

export default AddProjectComponent;

// emitEmpty = () => {
//   this.userNameInput.focus();
//   this.setState({ userName: '' });
// }

// onChangeUserName = (e) => {
//   this.setState({ userName: e.target.value });
// }

// render() {
//   const { userName } = this.state;
//   const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
//   return (
//     <Input
//       placeholder="Enter your username"
//       prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//       suffix={suffix}
//       value={userName}
//       onChange={this.onChangeUserName}
//       ref={node => this.userNameInput = node}
//     />
//   );
//}
