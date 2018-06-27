import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import InputWidthLabel from './InputWithLabel';
import StyledButton from './StyledButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../store/modules/Auth';

const Wrapper = styled.form`
  position: relative;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 350px;
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

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleLogin();
    }
  };

  handleLogin = () => {
    const account = this.state.account;
    const password = this.state.password;

    if (account === 'admin' && password === 'admin') {
      const { AuthActions, history } = this.props;
      AuthActions.setLoginStateAsync(true);
      history.push('/home');
    } else {
      alert('ㅋㅋㅋ');
    }
  };

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
          onKeyPress={this.handleKeyPress}
        />
        <StyledButton onClick={this.handleLogin}>Log In</StyledButton>
      </Wrapper>
    );
  }
}

// store의 state를 props로 가져오기
const mapStateToProps = state => {
  return { isLoginSuccess: state.Auth.isLoginSuccess };
};

// action을 props로 가져오기
const mapDispatchToProps = dispatch => ({
  AuthActions: bindActionCreators(authActions, dispatch)
});

// connect HOC을 이용하여 적용
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);
