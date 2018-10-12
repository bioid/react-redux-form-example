import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer } from "redux-form";
import thunk from 'redux-thunk';
import peopleReducer from "./reducers/people";

export default createStore(
  combineReducers({
    form: reducer,
    people: peopleReducer 
  }),
  applyMiddleware(thunk)
);
