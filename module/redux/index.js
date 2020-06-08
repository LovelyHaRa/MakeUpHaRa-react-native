import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import scan, { scanSaga } from './scan';

/* root reducer */
const rootReducer = combineReducers({ loading, scan });

/* root saga */
export function* rootSaga() {
  yield all([scanSaga()]);
}

export default rootReducer;
