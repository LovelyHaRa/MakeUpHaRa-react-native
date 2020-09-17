import {
  createRequestActionTypes,
  createRequestSaga,
} from '../../lib/createRequest';
import { createAction, handleActions } from 'redux-actions';
import * as authAPI from '../../lib/api/auth';
import * as userAPI from '../../lib/api/user';
import { takeLatest, call } from 'redux-saga/effects';
import produce from 'immer';

/* action type */
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);
const LOGOUT = 'user/LOGOUT';
const CHANGE_FIELD = 'user/CHANGE_FIELD';
const [
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
] = createRequestActionTypes('user/CHANGE_PASSWORD');
const INITIALIZE_CHANGE_PASSWORD = 'user/INITIALIZE_CHANGE_PASSWORD';

/* action */
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({ form, key, value }),
);
export const changePassword = createAction(
  CHANGE_PASSWORD,
  ({ id, password, newPassword }) => ({ id, password, newPassword }),
);
export const initializeChangePassword = createAction(
  INITIALIZE_CHANGE_PASSWORD,
);

/* redux-saga */
const checkSaga = createRequestSaga(CHECK, authAPI.check);
function* logoutSaga() {
  yield call(authAPI.logout);
}
const changePasswordSaga = createRequestSaga(
  CHANGE_PASSWORD,
  userAPI.changePassword,
);

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
}

/* initialize state */
const initialState = {
  user: null,
  checkError: null,
  password: {
    curPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
  changePasswordResult: null,
  changePasswordError: null,
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
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [CHANGE_PASSWORD_SUCCESS]: (state, { payload: changePasswordResult }) => ({
      ...state,
      changePasswordResult: !!changePasswordResult,
      changePasswordError: null,
    }),
    [CHANGE_PASSWORD_FAILURE]: (state, { payload: changePasswordError }) => ({
      ...state,
      changePasswordResult: null,
      changePasswordError,
    }),
    [INITIALIZE_CHANGE_PASSWORD]: (state) => ({
      ...state,
      changePasswordResult: null,
      changePasswordError: null,
      password: {
        curPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    }),
  },
  initialState,
);

export default user;
