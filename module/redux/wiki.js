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
const [
  GET_HISTORY,
  GET_HISTORY_SUCCESS,
  GET_HISTORY_FAILURE,
] = createRequestActionTypes('wiki/GET_HISTORY');
const [
  GET_REVISION_DOCUMENT,
  GET_REVISION_DOCUMENT_SUCCESS,
  GET_REVISION_DOCUMENT_FAILURE,
] = createRequestActionTypes('wiki/GET_REVISION_DOCUMENT');
const [
  FIND_LIST,
  FIND_LIST_SUCCESS,
  FIND_LIST_FAILURE,
] = createRequestActionTypes('wiki/FIND_LIST');
const INITIALIZE_FIND_LIST = 'wiki/INITIALIZE_FIND_LIST';
const [
  ADD_BARCODE_NUMBER,
  ADD_BARCODE_NUMBER_SUCCESS,
  ADD_BARCODE_NUMBER_FAILURE,
] = createRequestActionTypes('wiki/ADD_BARCODE_NUMBER');

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
export const getHistory = createAction(GET_HISTORY, ({ title }) => ({ title }));
export const getRevisionDocument = createAction(
  GET_REVISION_DOCUMENT,
  ({ title, r }) => ({ title, r }),
);
export const findList = createAction(FIND_LIST, ({ query, page }) => ({
  query,
  page,
}));
export const initializeFindList = createAction(INITIALIZE_FIND_LIST);
export const addBarcodeNumber = createAction(
  ADD_BARCODE_NUMBER,
  ({ title, code }) => ({ title, code }),
);

/* redux-saga */
const getSearchListSaga = createRequestSaga(
  GET_SEARCH_LIST,
  wikiAPI.getSearchList,
);
const readDocumentSaga = createRequestSaga(READ_DOCUMENT, wikiAPI.readDocument);
const getHistorySaga = createRequestSaga(GET_HISTORY, wikiAPI.getHistory);
const getRevisionDocumentSaga = createRequestSaga(
  GET_REVISION_DOCUMENT,
  wikiAPI.getRevisionDocument,
);
const findListSaga = createRequestSaga(FIND_LIST, wikiAPI.getSearchList);
const addBarcodeNumberSaga = createRequestSaga(
  ADD_BARCODE_NUMBER,
  wikiAPI.addBarcodeNumber,
);

export function* wikiSaga() {
  yield takeLatest(GET_SEARCH_LIST, getSearchListSaga);
  yield takeLatest(READ_DOCUMENT, readDocumentSaga);
  yield takeLatest(GET_HISTORY, getHistorySaga);
  yield takeLatest(GET_REVISION_DOCUMENT, getRevisionDocumentSaga);
  yield takeLatest(FIND_LIST, findListSaga);
  yield takeLatest(ADD_BARCODE_NUMBER, addBarcodeNumberSaga);
}

/* initialize state */
const initialState = {
  searchList: [],
  searchListError: null,
  document: null,
  documentError: null,
  historyList: null,
  historyListError: null,
  findList: [],
  findListError: null,
  addBarcodeNumberResult: null,
  addBarcodeNumberResultError: null,
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
    [INITIALIZE_SEARCH_LIST]: (state) => ({
      ...state,
      searchList: [],
      searchListError: null,
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
    [GET_HISTORY_SUCCESS]: (state, { payload: historyList }) => ({
      ...state,
      historyList,
      historyListError: null,
    }),
    [GET_HISTORY_FAILURE]: (state, { payload: historyListError }) => ({
      ...state,
      historyList: null,
      historyListError,
    }),
    [GET_REVISION_DOCUMENT_SUCCESS]: (state, { payload: document }) => ({
      ...state,
      document,
    }),
    [GET_REVISION_DOCUMENT_FAILURE]: (state, { payload: documentError }) => ({
      ...state,
      documentError,
    }),
    [FIND_LIST_SUCCESS]: (state, { payload: findList }) => ({
      ...state,
      findList,
      findListError: null,
    }),
    [FIND_LIST_FAILURE]: (state, { payload: findListError }) => ({
      ...state,
      findList: [],
      findListError,
    }),
    [INITIALIZE_FIND_LIST]: (state) => ({
      ...state,
      findList: [],
      findListError: null,
    }),
    [ADD_BARCODE_NUMBER_SUCCESS]: (
      state,
      { payload: addBarcodeNumberResult },
    ) => ({
      ...state,
      addBarcodeNumberResult,
      addBarcodeNumberResultError: null,
    }),
    [ADD_BARCODE_NUMBER_FAILURE]: (
      state,
      { payload: addBarcodeNumberResultError },
    ) => ({
      ...state,
      addBarcodeNumberResult: null,
      addBarcodeNumberResultError,
    }),
  },
  initialState,
);

export default wiki;
