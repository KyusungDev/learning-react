import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const TextWrapper = styled.div`
  margin-bottom: 10px;
`;

const WeekdayText = styled.span`
  font-weight: bold;
  font-size: 1em;
  color: ${oc.gray[9]};
  padding-top: 10px;
  padding-left: 5px;
`;

const DateText = styled.span`
  font-size: 0.6em;
  color: ${oc.gray[5]};
  padding: 10px;
`;

const DateTitle = ({ dayOfWeek, date }) => {
  return (
    <TextWrapper>
      <WeekdayText>{dayOfWeek}</WeekdayText>
      <DateText>{date}</DateText>
      <hr style={{ opacity: '0.15' }} />
    </TextWrapper>
  );
};

export default DateTitle;
