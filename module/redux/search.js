import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import {
  createRequestActionTypes,
  createRequestSaga,
} from '../../lib/createRequest';
import * as searchAPI from '../../lib/api/search';
import { takeLatest } from 'redux-saga/effects';

/* action type */
const CHANGE_INPUT = 'search/CHANGE_INPUT';
const CHANGE_OPTION = 'search/CHANGE_OPTION';
const INITIALIZE = 'search/INITIALIZE';
const INITIALIZE_OPTION = 'search/INITIALIZE_OPTION';
const INITIALIZE_RESULT_LIST = 'serach/INITIALIZE_RESULT_LIST';
const [
  GET_TOTAL_LIST,
  GET_TOTAL_LIST_SUCCESS,
  GET_TOTAL_LIST_FAILURE,
] = createRequestActionTypes('search/GET_TOTAL_LIST');
const INITIALIZE_TOTAL_LIST = 'serach/INITIALIZE_TOTAL_LIST';

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
export const getTotalList = createAction(
  GET_TOTAL_LIST,
  ({ query, page, block }) => ({ query, page, block }),
);
export const initializeTotalList = createAction(INITIALIZE_TOTAL_LIST);

/* redux-saga */
const getTotalListSaga = createRequestSaga(
  GET_TOTAL_LIST,
  searchAPI.TotalSearch,
);

export function* searchSaga() {
  yield takeLatest(GET_TOTAL_LIST, getTotalListSaga);
}

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
  totalList: [],
  totalListError: null,
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
    [GET_TOTAL_LIST_SUCCESS]: (state, { payload: totalList }) => ({
      ...state,
      totalList,
      totalListError: null,
    }),
    [GET_TOTAL_LIST_FAILURE]: (state, { payload: totalListError }) => ({
      ...state,
      totalList: [],
      totalListError,
    }),
    [INITIALIZE_TOTAL_LIST]: (state) => ({
      ...state,
      totalList: [],
      totalListError: null,
    }),
  },
  initialState,
);

export default search;
