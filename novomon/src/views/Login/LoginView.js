import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import InputWidthLabel from './InputWithLabel';
import StyledButton from './StyledButton';

const Wrapper = styled.form`
  position: relative;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 490px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const Title = styled.p`
  font-size: 2rem;
  text-align: center;
  padding: 0.5rem;
  color: ${oc.gray[6]};
`;

const SubTitle = styled.p`
  font-size: 0.8rem;
  text-align: center;
  color: ${oc.gray[5]};
  margin-bottom: 1rem;
`;

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = { account: '', password: '' };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleLogin = () => {};

  render() {
    return (
      <Wrapper>
        <Title>Log In</Title>
        <SubTitle>Please fill in the form to sign in!</SubTitle>
        <InputWidthLabel
          label="Account"
          name="account"
          placeholder="Enter Account"
          autoComplete="off"
          value={this.state.account}
          onChange={this.handleChange}
        />
        <InputWidthLabel
          label="Password"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <StyledButton onClick={this.handleLogin}>Log In</StyledButton>
      </Wrapper>
    );
  }
}

export default LoginView;
