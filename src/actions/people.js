import { getAllPeople } from '../api';

export const FETCH_PEOPLE_REQUEST = 'FETCH_PEOPLE_REQUEST';
export const fetchPeopleRequest = function() {
    return { type: FETCH_PEOPLE_REQUEST };
};

export const FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS';
export const fetchPeopleSuccess = function(people) {
  return { 
      type: FETCH_PEOPLE_SUCCESS, 
      people 
  };
};

export const FETCH_PEOPLE_ERROR = 'FETCH_PEOPLE_ERROR';
export const fetchPeopleError = function(error) {
  return {
      type: FETCH_PEOPLE_ERROR,
      error
  }
}

export const PERSON_SELECTED = 'PERSON_SELECTED';
export const personSelected = function(personId) {
  return {
    type: PERSON_SELECTED,
    personSelected: personId
  }
}

export const TOGGLE_EDITING = 'TOGGLE_EDITING';
export const toggleEditing = function() {
  return {
    type: TOGGLE_EDITING
  }
}

export const fetchPeople = function() {
  return function(dispatch) {
      dispatch(fetchPeopleRequest());
      return getAllPeople()
          .then(People => dispatch(fetchPeopleSuccess(People)))
          .catch(error => dispatch(fetchPeopleError(error)));
  }
};
