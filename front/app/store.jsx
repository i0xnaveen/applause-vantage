// src/store/configureStore.js
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createReducer from './reducers' 
import rootSaga from './rootSaga'     

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware()

  const middlewares = [sagaMiddleware]
  const enhancers = [applyMiddleware(...middlewares)]

  const store = createStore(
    createReducer(), 
    initialState,
    compose(...enhancers),
  )

  // ✅ Run the root saga
  store.runSaga = sagaMiddleware.run
  store.runSaga(rootSaga)

  return store
}
