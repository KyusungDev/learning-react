import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import oc from 'open-color';
import AddTodo from './AddTodo';
import moment from 'moment';
import 'moment/locale/ko';

const Wrapper = styled.div`
  margin-bottom: 40px;
`;

const TitleWrapper = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 1em;
  color: ${oc.gray[9]};
  padding-top: 10px;
  padding-left: 5px;

  & > small {
    font-weight: normal;
    font-size: 0.6em;
    color: ${oc.gray[5]};
    padding: 10px;
  }
`;

const TodoComponent = ({ isTitle, date, active, onClickAdd }) => {
  const newDate = !!date ? date : moment().format('YYYY-MM-DD');

  let text = moment(newDate).format('dd요일');
  const small = newDate === '' ? '' : moment(newDate).format('M월 D일 (dd)');
  if (moment().format('YYYY-MM-DD') === newDate) {
    text = `오늘`;
  }
  if (
    moment()
      .add(1, 'days')
      .format('YYYY-MM-DD') === newDate
  ) {
    text = `내일`;
  }

  return (
    <Wrapper>
      {isTitle && (
        <TitleWrapper>
          <Title>
            {text}
            <small>{small}</small>
          </Title>
          <hr style={{ opacity: '0.15' }} />
        </TitleWrapper>
      )}
      <AddTodo
        active={active}
        date={moment(newDate).format('YYYY-MM-DD')}
        onClickAdd={onClickAdd}
      />
    </Wrapper>
  );
};

TodoComponent.propTypes = {
  isTitle: propTypes.bool.isRequired,
  // date: propTypes.string.isRequired,
  onClickAdd: propTypes.func
};

export default TodoComponent;
