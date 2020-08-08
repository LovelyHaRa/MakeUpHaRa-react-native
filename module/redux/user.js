import {
  createRequestActionTypes,
  createRequestSaga,
} from '../../lib/createRequest';
import { createAction, handleActions } from 'redux-actions';
import * as authAPI from '../../lib/api/auth';
import { takeLatest, call } from 'redux-saga/effects';

/* action type */
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);
const LOGOUT = 'user/LOGOUT';

/* action */
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

/* redux-saga */
const checkSaga = createRequestSaga(CHECK, authAPI.check);
function* logoutSaga() {
  yield call(authAPI.logout);
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

/* initialize state */
const initialState = {
  user: null,
  checkError: null,
};

/* reducer */
const user = handleActions(
  {
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: checkError }) => ({
      ...state,
      user: null,
      checkError,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);

export default user;
