import React, { Component } from 'react';
import Todo from './../components/Todo';
import moment from 'moment';
import Layout from '../styles/Layout';
import Title from '../styles/Title';

class ViewInbox extends Component {
  render() {
    return (
      <Layout>
        <Title>관리함</Title>
        <Todo isTitle={false} date={moment().format('YYYY-MM-DD')} />
      </Layout>
    );
  }
}

export default ViewInbox;
