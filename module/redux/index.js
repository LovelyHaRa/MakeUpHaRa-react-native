import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import scan, { scanSaga } from './scan';
import post, { postSaga } from './post';

/* root reducer */
const rootReducer = combineReducers({ loading, scan, post });

/* root saga */
export function* rootSaga() {
  yield all([scanSaga(), postSaga()]);
}

export default rootReducer;
