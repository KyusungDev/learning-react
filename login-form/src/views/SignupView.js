import React, { Component } from 'react';
import SingupForm from '../components/signup-form/Form';

class SignupView extends Component {
  handleClickSignup = e => {
    console.log(this.props);
    const { history } = this.props;
    history.push('/login');
  };

  render() {
    return <SingupForm clickSignup={this.handleClickSignup} />;
  }
}

export default SignupView;
