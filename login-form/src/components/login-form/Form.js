import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import oc from 'open-color';
import InputWidthLabel from './../InputWithLabel';
import StyledButton from './../StyledButton';

const Wrapper = styled.form`
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
  color: ${oc.gray[5]};
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  font-size: 1rem;
  display: block;
  text-align: right;
  color: ${oc.teal[7]};
  margin-top: 0.5rem;
`;

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.props.onUpdate(e);
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Wrapper>
        <Title>Log In</Title>
        <SubTitle>Please fill in the form to sign in!</SubTitle>
        <InputWidthLabel
          label="Email"
          name="email"
          placeholder="Enter Email"
          autoComplete="off"
          value={this.state.email}
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
        <StyledButton onClick={this.props.clickLogin}>Log In</StyledButton>
        <StyledLink to={this.props.signupRouter}>Create Account</StyledLink>
      </Wrapper>
    );
  }
}

export default Form;
