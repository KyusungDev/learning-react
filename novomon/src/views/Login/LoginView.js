import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import InputWidthLabel from './InputWithLabel';
import StyledButton from './StyledButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../store/modules/Auth';
import Fade from '@material-ui/core/Fade';

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

const IncorrectBlock = styled.div`
  position: relative;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
`;

const IncorrectMessage = styled.p`
  margin: 10px;
  padding: 10px;
  text-align: center;
  color: ${oc.red[7]};
  background-color: ${oc.red[1]};
  border: solid 1px ${oc.red[2]};
  border-radius: 10px;
`;

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = { account: '', password: '', showIncorrectMsg: false };
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
      history.goBack();
    } else {
      this.setState({ showIncorrectMsg: true });
      setTimeout(() => this.setState({ showIncorrectMsg: false }), 3000);
    }
  };

  render() {
    return (
      <Fragment>
        <Wrapper>
          <Title>로그인</Title>
          <InputWidthLabel
            name="account"
            placeholder="아이디를 입력해주세요"
            autoComplete="off"
            value={this.state.account}
            onChange={this.handleChange}
            autoFocus
          />
          <InputWidthLabel
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            value={this.state.password}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <StyledButton onClick={this.handleLogin}>로그인</StyledButton>
          <Fade in={this.state.showIncorrectMsg}>
            <IncorrectBlock>
              <IncorrectMessage>
                아이디 또는 비밀번호가 올바르지 않습니다.
              </IncorrectMessage>
            </IncorrectBlock>
          </Fade>
        </Wrapper>
      </Fragment>
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
