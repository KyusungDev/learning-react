import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as formActions } from '../../reducer';
import Form from './Form';

function mapStateToProps(state) {
  const { input } = state;
  return {
    input
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeItem: bindActionCreators(formActions.changeItem, dispatch),
    inputItem: bindActionCreators(formActions.inputItem, dispatch),
    addItem: bindActionCreators(formActions.addItem, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
