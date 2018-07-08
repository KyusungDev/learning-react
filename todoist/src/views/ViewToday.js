import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import moment from 'moment';
import 'moment/locale/ko';
import Todo from './../components/Todo';

import Layout from '../styles/Layout';
import Title from '../styles/Title';

const TitleHasWeekday = styled(Title)`
  & > small {
    font-weight: normal;
    font-size: 0.6em;
    color: ${oc.gray[5]};
  }
`;

class ViewToday extends Component {
  render() {
    return (
      <Layout>
        <TitleHasWeekday>
          오늘 <small>{moment().format('M월 D일 (dd)')}</small>
        </TitleHasWeekday>
        <Todo isTitle={false} date={moment().format('YYYY-MM-DD')} />
      </Layout>
    );
  }
}

export default ViewToday;
