import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import {
  createRequestActionTypes,
  createRequestSaga,
} from '../../lib/createRequest';
import * as authAPI from '../../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

/* action type */
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
);

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

/* redux-saga */
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const registerSaga = createRequestSaga(REGISTER, authAPI.register);

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(REGISTER, registerSaga);
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
  },
  initialState,
);

export default auth;
