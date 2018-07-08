import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Todo from './../components/Todo';
import moment from 'moment';
import Layout from '../styles/Layout';
import Title from '../styles/Title';

class ViewWeekdays extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedTodoItem: undefined };
  }

  handleEvent = index => event => {
    // if (event.target.tagName === 'SPAN')
    //   this.setState({ selectedTodoItem: index });
  };

  // componentDidMount() {
  //   document.addEventListener('mouseup', this.handleEvent);
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { selectedTodoItem } = this.state;
  //   if (selectedTodoItem === nextState.selectedTodoItem) {
  //     return false;
  //   }

  //   return true;
  // }

  render() {
    return (
      <Layout>
        <Title>다음 7일</Title>
        {[...Array(7).keys()].map(day => {
          return (
            <div key={day} onClick={this.handleEvent(day)}>
              <Todo
                enable={this.state.selectedTodoItem == day ? true : false}
                isTitle={true}
                date={moment()
                  .add(day, 'days')
                  .format('YYYY-MM-DD')}
              />
            </div>
          );
        })}
      </Layout>
    );
  }
}

export default ViewWeekdays;
