// Actions
const ITEM_CHANGE = 'ITEM_CHANGE';
const ITEM_INPUT = 'ITEM_INPUT';
const ITEM_ADD = 'ITEM_ADD';
const ITEM_TOGGLE = 'ITEM_TOGGLE';
const ITEM_REMOVE = 'ITEM_REMOVE';

// Action Creators
function changeItem(event) {
  return {
    type: ITEM_CHANGE,
    event
  };
}

function inputItem(event) {
  return {
    type: ITEM_INPUT,
    event
  };
}

function toggleItem(id) {
  return {
    type: ITEM_TOGGLE,
    id
  };
}

function addItem() {
  return {
    type: ITEM_ADD
  };
}

function removeItem(id) {
  return {
    type: ITEM_REMOVE,
    id
  };
}

// Reducer
const initialState = {
  input: '',
  todos: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ITEM_CHANGE:
      return applyChangeItem(state, action);
    case ITEM_INPUT:
      return applyInputItem(state, action);
    case ITEM_TOGGLE:
      return applyToggleItem(state, action);
    case ITEM_ADD:
      return applyAddItem(state, action);
    case ITEM_REMOVE:
      return applyRemoveItem(state, action);

    default:
      return state;
  }
}

// Reducer Functions
function applyChangeItem(state, action) {
  return {
    ...state,
    input: action.event.target.value
  };
}

function applyInputItem(state, action) {
  return action.event.key === 'Enter'
    ? applyAddItem(state, action)
    : { ...state };
}

function applyAddItem(state, action) {
  const { input, todos } = state;
  if (input === '') {
    return {
      ...state
    };
  } else {
    return {
      input: '',
      todos: todos.concat({
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        text: input,
        checked: false
      })
    };
  }
}

function applyToggleItem(state, action) {
  const { todos } = state;

  const index = todos.findIndex(todo => todo.id === action.id);
  const selected = todos[index];
  const nextTodos = [...todos];

  nextTodos[index] = {
    ...selected,
    checked: !selected.checked
  };

  return {
    ...state,
    todos: nextTodos
  };
}

function applyRemoveItem(state, action) {
  const { todos } = state;
  return {
    ...state,
    todos: todos.filter(todo => todo.id !== action.id)
  };
}

const actionCreators = {
  changeItem,
  inputItem,
  toggleItem,
  addItem,
  removeItem
};

export { actionCreators };
export default reducer;
