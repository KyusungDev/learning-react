import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../reducer';
import TodoItemList from './TodoItemList';

function mapStateToProps(state) {
  const { input, todos } = state;
  return {
    input,
    todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleItem: bindActionCreators(actionCreators.toggleItem, dispatch),
    removeItem: bindActionCreators(actionCreators.removeItem, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItemList);
