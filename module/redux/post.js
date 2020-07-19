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
const [GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAILURE] = createRequestActionTypes(
  'post/GET_LIST',
);
const INITIALIZE_LIST = 'post/INITIALIZE_LIST';
const [
  GET_SEARCH_LIST,
  GET_SEARCH_LIST_SUCCESS,
  GET_SEARCH_LIST_FAILURE,
] = createRequestActionTypes('post/GET_SEARCH_LIST');
const INITIALIZE_SEARCH_LIST = 'post/INITIALIZE_SEARCH_LIST';

/* action */
export const readPost = createAction(READ_POST, (id) => id);
export const getList = createAction(
  GET_LIST,
  ({ page, tag, username, block, oldest, day }) => ({
    page,
    tag,
    username,
    block,
    oldest,
    day,
  }),
);
export const initializeList = createAction(INITIALIZE_LIST);
export const getSearchList = createAction(
  GET_SEARCH_LIST,
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
export const initializeSearchList = createAction(INITIALIZE_SEARCH_LIST);

/* redux-saga */
const readPostSaga = createRequestSaga(READ_POST, postAPI.readPost);
const getListSaga = createRequestSaga(GET_LIST, postAPI.getList);
const getSearchListSaga = createRequestSaga(GET_SEARCH_LIST, postAPI.getList);

export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
  yield takeLatest(GET_LIST, getListSaga);
  yield takeLatest(GET_SEARCH_LIST, getSearchListSaga);
}

/* initialize state */
const initialState = {
  post: null,
  postError: null,
  postList: [],
  postListError: null,
  searchPostList: [],
  searchPostListError: null,
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
    [INITIALIZE_LIST]: (state) => ({
      ...state,
      postList: [],
      postListError: null,
    }),
    [GET_SEARCH_LIST_SUCCESS]: (state, { payload: searchPostList }) => ({
      ...state,
      searchPostList,
      searchPostListError: null,
    }),
    [GET_SEARCH_LIST_FAILURE]: (state, { payload: searchPostListError }) => ({
      ...state,
      searchPostList: null,
      searchPostListError,
    }),
    [INITIALIZE_SEARCH_LIST]: (state) => ({
      ...state,
      searchPostList: [],
      searchPostListError: null,
    }),
  },
  initialState,
);

export default post;
