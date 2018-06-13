import React, { Component } from 'react';
import LoginForm from '../components/login-form/Form';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  onUpdate = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleLogin = () => {
    // const login =
    //   this.state.email === 'admin' && this.state.password === 'admin';

    const { history } = this.props;
    history.push('/home');
    // history.push({
    //   pathname: '/home',
    //   state: { login }
    // });
  };

  handleSignup = () => {
    const { history } = this.props;
    history.push('/signup');
  };

  render() {
    return (
      <LoginForm
        clickLogin={this.handleLogin}
        signupRouter="signup"
        onUpdate={this.onUpdate}
      />
    );
  }
}

export default LoginView;
