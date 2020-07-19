import { createAction, handleActions } from 'redux-actions';
import {
  createRequestActionTypes,
  createRequestSaga,
} from '../../lib/createRequest';
import * as wikiAPI from '../../lib/api/wiki';
import { takeLatest } from 'redux-saga/effects';

/* action type */
const [
  GET_SEARCH_LIST,
  GET_SEARCH_LIST_SUCCESS,
  GET_SEARCH_LIST_FAILURE,
] = createRequestActionTypes('wiki/GET_SEARCH_LIST');
const INITIALIZE_SEARCH_LIST = 'wiki/INITIALIZE_SEARCH_LIST';

/* action */
export const getSearchList = createAction(
  GET_SEARCH_LIST,
  ({ query, oldest, shortest, longest, page, block }) => ({
    query,
    oldest,
    shortest,
    longest,
    page,
    block,
  }),
);
export const initializeSearchList = createAction(INITIALIZE_SEARCH_LIST);

/* redux-saga */
const getSearchListSaga = createRequestSaga(
  GET_SEARCH_LIST,
  wikiAPI.getSearchList,
);

export function* wikiSaga() {
  yield takeLatest(GET_SEARCH_LIST, getSearchListSaga);
}

/* initialize state */
const initialState = {
  searchList: [],
  searchListError: null,
};

/* reducer */
const wiki = handleActions(
  {
    [GET_SEARCH_LIST_SUCCESS]: (state, { payload: searchList }) => ({
      ...state,
      searchList,
      searchListError: null,
    }),
    [GET_SEARCH_LIST_FAILURE]: (state, { payload: searchListError }) => ({
      ...state,
      searchList: [],
      searchListError,
    }),
  },
  initialState,
);

export default wiki;
