import { createAction, handleActions } from 'redux-actions';
import {
  createRequestActionTypes,
  createRequestSaga,
} from '../../lib/createRequest';
import * as wikiAPI from '../../lib/api/wiki';
import { takeLatest } from 'redux-saga/effects';

/* action type */
const [
  GET_TITLE_BY_BARCODE,
  GET_TITLE_BY_BARCODE_SUCCESS,
  GET_TITLE_BY_BARCODE_FAILURE,
] = createRequestActionTypes('scan/GET_TITLE_BY_BARCODE');

/* action */
export const getTitleByBarcode = createAction(
  GET_TITLE_BY_BARCODE,
  ({ code }) => ({ code }),
);

/* redux-saga */
const getTitleByBarcodeSaga = createRequestSaga(
  GET_TITLE_BY_BARCODE,
  wikiAPI.getTitleByBarcode,
);

export function* scanSaga() {
  yield takeLatest(GET_TITLE_BY_BARCODE, getTitleByBarcodeSaga);
}

/* initialize state */
const initialState = {
  resultScan: null,
  resultScanError: null,
};

/* reducer */
const scan = handleActions(
  {
    [GET_TITLE_BY_BARCODE_SUCCESS]: (state, { payload: resultScan }) => ({
      ...state,
      resultScan,
    }),
    [GET_TITLE_BY_BARCODE_FAILURE]: (state, { payload: resultScanError }) => ({
      ...state,
      resultScanError,
    }),
  },
  initialState,
);

export default scan;
