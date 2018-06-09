import React, { Component } from 'react';
import styled from 'styled-components';

const RemoveButton = styled.div`
  margin-right: 1rem;
  color: #e64980;
  font-weight: 600;
  opacity: 0;
`;

const TodoItemWrapper = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;

  &:hover {
    background: #e3fafc;
  }

  & + & {
    border-top: 1px solid #d8d8d8;
  }

  &:hover ${RemoveButton} {
    opacity: 1;
  }
`;

const TextWrapper = styled.div`
  flex: 1;
  word-break: break-all;
  ${props => props.checked && 'text-decoration: line-through; color: #adb5bd;'};
`;

const CheckMark = styled.div`
  font-size: 1.5rem;
  line-height: 1rem;
  margin-left: 1rem;
  color: #3bc9db;
  font-weight: 800;
`;

class TodoItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.checked !== nextProps.checked;
  }

  render() {
    const { text, checked, id, onToggle, onRemove } = this.props;
    return (
      <TodoItemWrapper onClick={() => onToggle(id)}>
        <RemoveButton
          onClick={e => {
            e.stopPropagation();
            onRemove(id);
          }}
        >
          &times;
        </RemoveButton>
        <TextWrapper checked={checked}>
          <div>{text}</div>
        </TextWrapper>
        {checked && <CheckMark />}
      </TodoItemWrapper>
    );
  }
}

export default TodoItem;
