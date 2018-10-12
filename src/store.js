import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { reducer } from "redux-form";
import thunk from 'redux-thunk';
import peopleReducer from "./reducers/people";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    form: reducer,
    people: peopleReducer 
  }),
  composeEnhancers(
    applyMiddleware(thunk)
  )
);
