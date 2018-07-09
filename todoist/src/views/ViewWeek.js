import React, { Component } from 'react';
import Todo from './../components/Todo';
import moment from 'moment';
import Layout from '../styles/Layout';
import Title from '../styles/Title';

class ViewWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTodoItems: [...Array(7).keys()].map(() => false)
    };
  }

  handleClickAdd = (event, index) => {
    this.setState({
      activeTodoItems: [...Array(7).keys()].map(item => item === index)
    });
  };

  render() {
    const { activeTodoItems } = this.state;
    return (
      <Layout>
        <Title>다음 7일</Title>
        {[...Array(7).keys()].map(day => {
          return (
            <Todo
              key={day}
              isTitle={true}
              date={moment()
                .add(day, 'days')
                .format('YYYY-MM-DD')}
              active={activeTodoItems[day]}
              onClickAdd={e => this.handleClickAdd(e, day)}
            />
          );
        })}
      </Layout>
    );
  }
}

export default ViewWeek;
