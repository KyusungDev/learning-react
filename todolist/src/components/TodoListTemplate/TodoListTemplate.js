import React from 'react';
import styled from 'styled-components';

const Template = styled.div`
  background: white;
  width: 512px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin: 0 auto;
  margin-top: 4rem;
`;

const FormSection = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #22b8cf;
`;

const TodosSection = styled.section`
  min-height: 5rem;
`;

const Title = styled.div`
  padding: 2rem;
  font-size: 2.5rem;
  text-align: center;
  font-weight: 100;
  background: #22b8cf;
  color: white;
`;

function TodoListTemplate({ form, children }) {
  return (
    <Template>
      <Title>할 일 목록</Title>
      <FormSection>{form}</FormSection>
      <TodosSection>{children}</TodosSection>
    </Template>
  );
}

export default TodoListTemplate;
