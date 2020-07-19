import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

/* action type */
const CHANGE_INPUT = 'search/CHANGE_INPUT';
const CHANGE_OPTION = 'search/CHANGE_OPTION';
const INITIALIZE = 'search/INITIALIZE';
const INITIALIZE_OPTION = 'search/INITIALIZE_OPTION';
const INITIALIZE_RESULT_LIST = 'serach/INITIALIZE_RESULT_LIST';

/* action */
export const changeInput = createAction(CHANGE_INPUT, (value) => value);
export const changeOption = createAction(CHANGE_OPTION, ({ key, value }) => ({
  key,
  value,
}));
export const initialize = createAction(INITIALIZE);
export const initializeOption = createAction(INITIALIZE_OPTION);
export const initializeResultList = createAction(
  INITIALIZE_RESULT_LIST,
  (requestList) => requestList,
);

/* initialize state */
const initialState = {
  query: '',
  option: {
    totalSort: '',
    totalTerm: '',
    wikiSort: '',
    wikilength: '',
    blogSort: '',
    blogTerm: '',
  },
  requestList: false,
};

/* reducer */
const search = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: value }) => ({ ...state, query: value }),
    [CHANGE_OPTION]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft.option[key] = value;
      }),
    [INITIALIZE]: () => initialState,
    [INITIALIZE_OPTION]: (state) => ({
      ...state,
      option: initialState.option,
    }),
    [INITIALIZE_RESULT_LIST]: (state, { payload: requestList }) => ({
      ...state,
      requestList,
    }),
  },
  initialState,
);

export default search;
