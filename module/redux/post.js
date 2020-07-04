import { createAction, handleActions } from 'redux-actions';
import {
  createRequestActionTypes,
  createRequestSaga,
} from '../../lib/createRequest';
import * as postAPI from '../../lib/api/post';
import { takeLatest } from 'redux-saga/effects';

/* action type */
const [
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
] = createRequestActionTypes('post/READ_POST');
<<<<<<< HEAD
const [GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAILURE] = createRequestActionTypes(
  'post/GET_LIST',
);

/* action */
export const readPost = createAction(READ_POST, (id) => id);
export const getList = createAction(
  GET_LIST,
  ({ page, tag, username, query, block, oldest, day }) => ({
    page,
    tag,
    username,
    query,
    block,
    oldest,
    day,
  }),
);

/* redux-saga */
const readPostSaga = createRequestSaga(READ_POST, postAPI.readPost);
const getListSaga = createRequestSaga(GET_LIST, postAPI.getList);

export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
  yield takeLatest(GET_LIST, getListSaga);
=======

/* action */
export const readPost = createAction(READ_POST, (id) => id);

/* redux-saga */
const readPostSaga = createRequestSaga(READ_POST, postAPI.readPost);

export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
>>>>>>> 7271b9899b89b0151d28cff8855027a3bdeea3ba
}

/* initialize state */
const initialState = {
  post: null,
  postError: null,
<<<<<<< HEAD
  postList: [],
  postListError: null,
=======
>>>>>>> 7271b9899b89b0151d28cff8855027a3bdeea3ba
};

/* reducer */
const post = handleActions(
  {
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
      postError: null,
    }),
    [READ_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      post: null,
      postError,
    }),
<<<<<<< HEAD
    [GET_LIST_SUCCESS]: (state, { payload: postList }) => ({
      ...state,
      postList,
      postListError: null,
    }),
    [GET_LIST_FAILURE]: (state, { payload: postListError }) => ({
      ...state,
      postList: null,
      postListError,
    }),
=======
>>>>>>> 7271b9899b89b0151d28cff8855027a3bdeea3ba
  },
  initialState,
);

export default post;
