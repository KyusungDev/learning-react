import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const IS_PROJECT_MENU_EXPANDED = 'Config/IS_MENU_EXPANDED';
const EXPAND_PROJECT_MENU = 'Config/EXPAND_PROJECT_MENU';

export const isProjectMenuExpanded = createAction(IS_PROJECT_MENU_EXPANDED);
export const ExpandProjectMenu = createAction(EXPAND_PROJECT_MENU);

export const isProjectMenuExpandedSync = (state = initialize) => dispatch => {
  console.log(state);
  dispatch(
    isProjectMenuExpanded({
      projectMenuExpand: state.projectMenuExpand
    })
  );
};

export const ExpandProjectMenuSync = state => dispatch => {
  console.log(state);
  dispatch(
    ExpandProjectMenu({
      projectMenuExpand: state
    })
  );
};

// 초기화
const initialize = {
  projectMenuExpand: true
};

export default handleActions(
  {
    [IS_PROJECT_MENU_EXPANDED]: (state, action) => {
      return produce(state, draftState => {
        draftState.projectMenuExpand = action.payload.projectMenuExpand;
      });
    },
    [EXPAND_PROJECT_MENU]: (state, action) => {
      return produce(state, draftState => {
        draftState.projectMenuExpand = action.payload.projectMenuExpand;
      });
    }
  },
  initialize
);
