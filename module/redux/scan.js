import { createAction, handleActions } from 'redux-actions';
import {
  createRequestActionTypes,
  createRequestSaga,
} from '../../lib/createRequest';
import * as wikiAPI from '../../lib/api/wiki';
import { takeLatest } from 'redux-saga/effects';

/* action type */
const [
  GET_DOCUNEMT_BY_BARCODE,
  GET_DOCUNEMT_BY_BARCODE_SUCCESS,
  GET_DOCUNEMT_BY_BARCODE_FAILURE,
] = createRequestActionTypes('scan/GET_DOCUNEMT_BY_BARCODE');
const [
  GET_HISTORY,
  GET_HISTORY_SUCCESS,
  GET_HISTORY_FAILURE,
] = createRequestActionTypes('scan/GET_HISTORY');
const [
  GET_REVISION_DOCUMENT,
  GET_REVISION_DOCUMENT_SUCCESS,
  GET_REVISION_DOCUMENT_FAILURE,
] = createRequestActionTypes('scan/GET_REVISION_DOCUMENT');

/* action */
export const getDocumentByBarcode = createAction(
  GET_DOCUNEMT_BY_BARCODE,
  ({ code }) => ({ code }),
);
export const getHistory = createAction(GET_HISTORY, ({ title }) => ({ title }));
export const getRevisionDocument = createAction(
  GET_REVISION_DOCUMENT,
  ({ title, r }) => ({ title, r }),
);

/* redux-saga */
const getDocumentByBarcodeSaga = createRequestSaga(
  GET_DOCUNEMT_BY_BARCODE,
  wikiAPI.getDocumentByBarcode,
);
const getHistorySaga = createRequestSaga(GET_HISTORY, wikiAPI.getHistory);
const getRevisionDocumentSaga = createRequestSaga(
  GET_REVISION_DOCUMENT,
  wikiAPI.getRevisionDocument,
);

export function* scanSaga() {
  yield takeLatest(GET_DOCUNEMT_BY_BARCODE, getDocumentByBarcodeSaga);
  yield takeLatest(GET_HISTORY, getHistorySaga);
  yield takeLatest(GET_REVISION_DOCUMENT, getRevisionDocumentSaga);
}

/* initialize state */
const initialState = {
  document: null,
  documentError: null,
  historyList: null,
  historyListError: null,
};

/* reducer */
const scan = handleActions(
  {
    [GET_DOCUNEMT_BY_BARCODE_SUCCESS]: (state, { payload: document }) => ({
      ...state,
      document,
    }),
    [GET_DOCUNEMT_BY_BARCODE_FAILURE]: (state, { payload: documentError }) => ({
      ...state,
      documentError,
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
  },
  initialState,
);

export default scan;
