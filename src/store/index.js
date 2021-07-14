import { applyMiddleware, compose, createStore } from 'redux';
import { } from 'react-redux';
import trunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { rootReducer } from './reducers';
import { actions } from './actions';

const initialState = {};
const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(trunk, logger)),
);
export { store, actions };