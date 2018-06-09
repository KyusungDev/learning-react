import React from 'react';
import styled from 'styled-components';

const FormWrapper = styled.div`
  display: flex;
`;

const InputText = styled.input`
  flex: 1; /* 버튼을 뺀 빈 공간을 모두 채워줍니다 */
  font-size: 1.25rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #c5f6fa;
`;

const CreateButton = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: 1rem;
  background: #22b8cf;
  border-radius: 3px;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #3bc9db;
  }
`;

function Form({ input, changeItem, addItem, inputItem }) {
  return (
    <FormWrapper>
      <InputText value={input} onChange={changeItem} onKeyPress={inputItem} />
      <CreateButton onClick={addItem}>추가</CreateButton>
    </FormWrapper>
  );
}

export default Form;
