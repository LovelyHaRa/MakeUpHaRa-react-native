import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import scan, { scanSaga } from './scan';
import post, { postSaga } from './post';
import search, { searchSaga } from './search';
import wiki, { wikiSaga } from './wiki';
import auth from './auth';

/* root reducer */
const rootReducer = combineReducers({
  loading,
  scan,
  post,
  search,
  wiki,
  auth,
});

/* root saga */
export function* rootSaga() {
  yield all([scanSaga(), postSaga(), wikiSaga(), searchSaga()]);
}

export default rootReducer;
