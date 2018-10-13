import {
  FETCH_PEOPLE_REQUEST,
  FETCH_PEOPLE_SUCCESS,
  FETCH_PEOPLE_ERROR,
  PERSON_SELECTED,
  TOGGLE_EDITING
} from '../actions/people';

const initialState = {
  people: [],
  loading: true,
  error: null,
  personSelected: null,
  editing: false
};

export default function peopleReducer(state=initialState, action) {
  /*
    console.log(state);
    console.log(action);
  */
  if (action.type === FETCH_PEOPLE_REQUEST) {
      return Object.assign({}, state, {
          loading: true,
          error: null
      });
  }
  if (action.type === FETCH_PEOPLE_SUCCESS) {
      return Object.assign({}, state, {
          loading: false,
          error: null,
          people: action.people
      });
  }
  if (action.type === FETCH_PEOPLE_ERROR) {
      return Object.assign({}, state, {
          loading: false,
          error: action.error,
      });
  }
  if (action.type === PERSON_SELECTED) {
    return Object.assign({}, state, {
      personSelected: action.personSelected
    });
  }
  if (action.type === TOGGLE_EDITING) {
    return Object.assign({}, state, {
      editing: !state.editing
    });
  }
  return state;
}
