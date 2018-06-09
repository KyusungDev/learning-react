import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import InputWidthLabel from './InputWithLabel';
import SignupButton from './SignupButton';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
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
  text-aglin: left;
  color: ${oc.gray[5]};
  margin-bottom: 1rem;
`;

class Form extends Component {
  handleSingupButtonClick() {
    console.log('click!');
  }
  render() {
    return (
      <Wrapper>
        <Title>Create Account</Title>
        <SubTitle>Please fill in the form to create an account!</SubTitle>
        <InputWidthLabel
          label="Username"
          name="username"
          placeholder="Enter Username"
          autoComplete="off"
        />
        <InputWidthLabel
          label="Email"
          name="email"
          placeholder="Enter Email"
          autoComplete="off"
        />
        <InputWidthLabel
          label="Password"
          type="password"
          name="password"
          placeholder="Enter Password"
        />
        <InputWidthLabel
          label="Confirm Password"
          type="password"
          name="psw-repeat"
          placeholder="Confirm Password"
        />
        <SignupButton onClick={this.handleSingupButtonClick}>
          Sign Up
        </SignupButton>
      </Wrapper>
    );
  }
}

export default Form;
