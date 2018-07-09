import React, { Component } from 'react';
// import styled from 'styled-components';
import querySyring from 'query-string';

import Layout from '../styles/Layout';

class ViewProejct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      JSON.stringify(nextProps) === JSON.stringify(this.props) &&
      JSON.stringify(nextState) === JSON.stringify(this.state)
    )
      return false;
    return true;
  }

  render() {
    const list = [
      { id: 1, name: '1' },
      { id: 1, name: '2' },
      { id: 2, name: '3' },
      { id: 1, name: '4' },
      { id: 1, name: '5' },
      { id: 2, name: '11' }
    ];

    const {
      match: {
        params: { id }
      }
    } = this.props;
    const newList = list.filter(item => item.id == id);
    return (
      <Layout>
        <div>ViewProejct</div>
        {newList.map(item => <div key={item.name}>{item.name}</div>)}
      </Layout>
    );
  }
}

export default ViewProejct;
