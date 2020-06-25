import React from 'react';
import Main from './Main';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './module/redux/index';
import { Provider } from 'react-redux';
import { AppearanceProvider } from 'react-native-appearance';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default function App() {
  return (
    <AppearanceProvider>
      <Provider store={store}>
        <Main />
      </Provider>
    </AppearanceProvider>
  );
}
