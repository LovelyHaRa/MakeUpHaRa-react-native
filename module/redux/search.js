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
const SET_QUERY = 'search/SET_QUERY';
const CHANGE_OPTION = 'search/CHANGE_OPTION';
const SET_IS_EMPTY_RESULT = 'search/SET_IS_EMPTY_RESULT';
const INITIALIZE_IS_EMPTY_RESULT = 'search/INITIALIZE_IS_EMPTY_RESULT';
const INITIALIZE = 'search/INITIALIZE';
const INITIALIZE_OPTION = 'search/INITIALIZE_OPTION';
const INITIALIZE_RESULT_LIST = 'search/INITIALIZE_RESULT_LIST';
const SET_ACTION_STATE = 'search/SET_ACTION_STATE';
const [
  GET_TOTAL_LIST,
  GET_TOTAL_LIST_SUCCESS,
  GET_TOTAL_LIST_FAILURE,
] = createRequestActionTypes('search/GET_TOTAL_LIST');
const INITIALIZE_TOTAL_LIST = 'serach/INITIALIZE_TOTAL_LIST';

/* action */
export const changeInput = createAction(CHANGE_INPUT, (value) => value);
export const setQuery = createAction(SET_QUERY, (query) => query);
export const changeOption = createAction(CHANGE_OPTION, ({ key, value }) => ({
  key,
  value,
}));
export const setIsEmptyResult = createAction(
  SET_IS_EMPTY_RESULT,
  ({ key, value }) => ({ key, value }),
);
export const initializeIsEmptyResult = createAction(INITIALIZE_IS_EMPTY_RESULT);
export const initialize = createAction(INITIALIZE);
export const initializeOption = createAction(INITIALIZE_OPTION);
export const initializeResultList = createAction(
  INITIALIZE_RESULT_LIST,
  (requestList) => requestList,
);
export const setActionState = createAction(
  SET_ACTION_STATE,
  (actionState) => actionState,
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
  inputQuery: '',
  query: '',
  option: {
    totalSort: '',
    totalTerm: '',
    wikiSort: '',
    wikilength: '',
    blogSort: '',
    blogTerm: '',
  },
  actionState: false,
  isEmptyResult: { total: false, wiki: false, blog: false },
  requestList: false,
  totalList: [],
  totalListError: null,
};

/* reducer */
const search = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: value }) => ({
      ...state,
      inputQuery: value,
    }),
    [SET_QUERY]: (state, { payload: query }) => ({ ...state, query }),
    [CHANGE_OPTION]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft.option[key] = value;
      }),
    [SET_IS_EMPTY_RESULT]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft.isEmptyResult[key] = value;
      }),
    [INITIALIZE_IS_EMPTY_RESULT]: (state) => ({
      ...state,
      isEmptyResult: initialState.isEmptyResult,
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
    [SET_ACTION_STATE]: (state, { payload: actionState }) => ({
      ...state,
      actionState,
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
