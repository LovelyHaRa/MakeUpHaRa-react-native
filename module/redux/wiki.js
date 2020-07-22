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
// api - read
const [
  READ_DOCUMENT,
  READ_DOCUMENT_SUCCESS,
  READ_DOCUMENT_FAILURE,
] = createRequestActionTypes('wiki/READ_DOCUMENT');
const UNLOAD_DOCUMENT = 'wiki/UNLOAD_DOCUMENT'; // 위키 문서 뷰 언마운트시 문서 정보 제거

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
export const readDocument = createAction(READ_DOCUMENT, ({ id, r }) => ({
  id,
  r,
}));
export const unloadDocument = createAction(UNLOAD_DOCUMENT);

/* redux-saga */
const getSearchListSaga = createRequestSaga(
  GET_SEARCH_LIST,
  wikiAPI.getSearchList,
);
const readDocumentSaga = createRequestSaga(READ_DOCUMENT, wikiAPI.readDocument);

export function* wikiSaga() {
  yield takeLatest(GET_SEARCH_LIST, getSearchListSaga);
  yield takeLatest(READ_DOCUMENT, readDocumentSaga);
}

/* initialize state */
const initialState = {
  searchList: [],
  searchListError: null,
  document: null,
  documentError: null,
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
    [READ_DOCUMENT_SUCCESS]: (state, { payload: document }) => ({
      ...state,
      document,
      documentError: null,
    }),
    [READ_DOCUMENT_FAILURE]: (state, { payload: documentError }) => ({
      ...state,
      document: null,
      documentError,
    }),
    [UNLOAD_DOCUMENT]: (state) => ({
      ...state,
      document: null,
      documentError: null,
    }),
  },
  initialState,
);

export default wiki;
