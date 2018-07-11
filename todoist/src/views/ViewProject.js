import React, { Component } from 'react';
// import styled from 'styled-components';
import querySyring from 'query-string';
import Todo from './../components/Todo';
import Title from '../styles/Title';
import Layout from '../styles/Layout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/modules/Todoist';

class ViewProejct extends Component {
  constructor(props) {
    super(props);

    console.log('viewproejct');
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
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { projects, items } = this.props.todoist;
    const itemList = items.filter(item => item.project_id === parseInt(id));
    const project = projects.filter(project => project.id === parseInt(id));
    const title = project.length === 1 ? project[0].name : '';

    return (
      <Layout>
        <Title>{title}</Title>
        {itemList.map(item => <div key={item.id}>{item.content}</div>)}
        <Todo isTitle={false} />
      </Layout>
    );
  }
}

// export default ViewProejct;

// store의 state를 props로 가져오기
const mapStateToProps = state => {
  return { todoist: state.Todoist.todoist };
};

// action을 props로 가져오기
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

// connect HOC을 이용하여 적용
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProejct);
