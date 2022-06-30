import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// Redux middleware that allows to dispatch plain actions
// import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers';

const initialState = {};

export const store: any = createStore(
    rootReducer, 
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
    // composeWithDevTools(applyMiddleware(logger, thunk)),
);