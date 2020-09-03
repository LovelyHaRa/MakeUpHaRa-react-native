import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import {
  createRequestActionTypes,
  createRequestSaga,
} from '../../lib/createRequest';
import * as authAPI from '../../lib/api/auth';
import * as userAPI from '../../lib/api/user';
import { debounce, takeLatest } from 'redux-saga/effects';

/* action type */
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
);
const [
  CHECK_EXIST_USERNAME,
  CHECK_EXIST_USERNAME_SUCCESS,
  CHECK_EXIST_USERNAME_FAILURE,
] = createRequestActionTypes('auth/CHECK_EXIST_USERNAME');
const [
  CHECK_EXIST_NAME,
  CHECK_EXIST_NAME_SUCCESS,
  CHECK_EXIST_NAME_FAILURE,
] = createRequestActionTypes('auth/CHECK_EXIST_NAME');

/* action */
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({ form, key, value }),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));
export const register = createAction(
  REGISTER,
  ({ username, password, name }) => ({ username, password, name }),
);
export const checkExistUsername = createAction(
  CHECK_EXIST_USERNAME,
  (username) => username,
);
export const checkExistName = createAction(
  CHECK_EXIST_NAME,
  ({ username, name }) => ({ username, name }),
);

/* redux-saga */
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const checkExistUsernameSaga = createRequestSaga(
  CHECK_EXIST_USERNAME,
  userAPI.checkExistUsername,
);
const checkExistNameSaga = createRequestSaga(
  CHECK_EXIST_NAME,
  userAPI.checkExistName,
);

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(REGISTER, registerSaga);
  yield debounce(500, CHECK_EXIST_USERNAME, checkExistUsernameSaga);
  yield debounce(500, CHECK_EXIST_NAME, checkExistNameSaga);
}

/* initialize state */
const initialState = {
  login: {
    username: '',
    password: '',
  },
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
    name: '',
  },
  auth: null,
  authError: null,
  registerResult: null,
  registerResultError: null,
  checkExistUsernameResult: null,
  checkExistUsernameResultError: null,
  checkExistNameResult: null,
  checkExistNameResultError: null,
};

/* reducer */
const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      checkExistUsernameResult: null,
      checkExistUsernameResultError: null,
      checkExistNameResult: null,
      checkExistNameResultError: null,
      registerResult: null,
      registerResultError: null, // 폼 전환 시 회원인증 에러 초기화
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [LOGIN_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      auth: null,
      authError,
    }),
    [REGISTER_SUCCESS]: (state, { payload: registerResult }) => ({
      ...state,
      registerResult,
      registerResultError: null,
    }),
    [REGISTER_FAILURE]: (state, { payload: registerResultError }) => ({
      ...state,
      registerResult: null,
      registerResultError,
    }),
    [CHECK_EXIST_USERNAME_SUCCESS]: (
      state,
      { payload: checkExistUsernameResult },
    ) => ({
      ...state,
      checkExistUsernameResult,
      checkExistUsernameResultError: null,
    }),
    [CHECK_EXIST_USERNAME_FAILURE]: (
      state,
      { payload: checkExistUsernameResultError },
    ) => ({
      ...state,
      checkExistUsernameResult: null,
      checkExistUsernameResultError,
    }),
    [CHECK_EXIST_NAME_SUCCESS]: (state, { payload: checkExistNameResult }) => ({
      ...state,
      checkExistNameResult,
      checkExistNameResultError: null,
    }),
    [CHECK_EXIST_NAME_FAILURE]: (
      state,
      { payload: checkExistNameResultError },
    ) => ({
      ...state,
      checkExistNameResult: null,
      checkExistNameResultError,
    }),
  },
  initialState,
);

export default auth;
