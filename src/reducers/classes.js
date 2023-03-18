import { LOCATION_CHANGE } from 'connected-react-router';

import { CREATE_CLASS_FAILURE,
  CREATE_CLASS_REQUESTED,
  CREATE_CLASS_SUCCESS,
  DELETE_CLASS_FAILURE,
  DELETE_CLASS_REQUESTED,
  DELETE_CLASS_SUCCESS,
  FETCH_CLASSES_FAILURE,
  FETCH_CLASSES_REQUESTED,
  FETCH_CLASSES_SUCCESS,
  FETCH_SINGLE_CLASS_FAILURE,
  FETCH_SINGLE_CLASS_REQUESTED,
  FETCH_SINGLE_CLASS_SUCCESS,
  UPDATE_CLASSES_FORM } from '../actions/classes-action-types';

const initialState = {
  classes: [],
  createClassStatus: 'pending',
  deleteClassStatus: 'pending',
  fetchClassesStatus: 'pending',
  fetchSingleClassStatus: 'pending',
  form: {
    class_code: '',
    class_name: '',
    grade_id: null,
    max_no_of_student: '',
    status: null,
  },
};

export default function classes(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case CREATE_CLASS_FAILURE:
      return {
        ...state,
        createClassStatus: 'failure',
      };

    case CREATE_CLASS_REQUESTED:
      return {
        ...state,
        createClassStatus: 'creating',
      };

    case CREATE_CLASS_SUCCESS:
      return {
        ...state,
        createClassStatus: 'success',
      };

    case DELETE_CLASS_FAILURE:
      return {
        ...state,
        deleteClassStatus: 'failure',
      };

    case DELETE_CLASS_REQUESTED:
      return {
        ...state,
        deleteClassStatus: 'deleting',
      };

    case DELETE_CLASS_SUCCESS:
      return {
        ...state,
        classes: [...state.classes].filter((classItem) => classItem.class_id.toString() !== payload.toString()),
        deleteClassStatus: 'success',
      };

    case FETCH_CLASSES_FAILURE:
      return {
        ...state,
        fetchClassesStatus: 'failure',
      };

    case FETCH_CLASSES_REQUESTED:
      return {
        ...state,
        fetchClassesStatus: 'fetching',
      };

    case FETCH_CLASSES_SUCCESS:
      return {
        ...state,
        classes: payload,
        fetchClassesStatus: 'success',
      };

    case FETCH_SINGLE_CLASS_FAILURE:
      return {
        ...state,
        fetchSingleClassStatus: 'failure',
      };

    case FETCH_SINGLE_CLASS_REQUESTED:
      return {
        ...state,
        fetchSingleClassStatus: 'fetching',
      };

    case FETCH_SINGLE_CLASS_SUCCESS:
      return {
        ...state,
        fetchSingleClassStatus: 'success',
        form: {
          ...state.form,
          ...payload,
        },
      };

    case UPDATE_CLASSES_FORM:
      return {
        ...state,
        form: payload,
      };

    case LOCATION_CHANGE:
      return { ...initialState };

    default:
      return state;
  }
}
