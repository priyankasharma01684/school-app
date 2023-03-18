import { LOCATION_CHANGE } from 'connected-react-router';
import { ADD_GRADE_FAILURE,
  ADD_GRADE_REQUESTED,
  ADD_GRADE_SUCCESS,
  DELETE_GRADE_FAILURE,
  DELETE_GRADE_REQUESTED,
  DELETE_GRADE_SUCCESS,
  FETCH_GRADE_FAILURE,
  FETCH_GRADE_REQUESTED,
  FETCH_GRADE_SUCCESS,
  FETCH_SINGLE_GRADE_FAILURE,
  FETCH_SINGLE_GRADE_REQUESTED,
  FETCH_SINGLE_GRADE_SUCCESS,
  UPDATE_GRADE_FORM } from '../actions/grades-action-types';

const initialState = {
  addGradeStatus: 'pending',
  deleteGradeStatus: 'pending',
  fetchGradeStatus: 'pending',
  fetchSingleGradeStatus: 'pending',
  form: {
    grade_code: '',
    grade_name: '',
    section: null,
    status: null,
  },
  grades: [],
};

export default function grades(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case ADD_GRADE_FAILURE:
      return {
        ...state,
        addGradeStatus: 'failure',
      };

    case ADD_GRADE_REQUESTED:
      return {
        ...state,
        addGradeStatus: 'creating',
      };

    case ADD_GRADE_SUCCESS:
      return {
        ...state,
        addGradeStatus: 'success',
      };

    case DELETE_GRADE_FAILURE:
      return {
        ...state,
        deleteGradeStatus: 'failure',
      };

    case DELETE_GRADE_REQUESTED:
      return {
        ...state,
        deleteGradeStatus: 'deleting',
      };

    case DELETE_GRADE_SUCCESS:
      return {
        ...state,
        deleteGradeStatus: 'success',
        grades: [...state.grades].filter((grade) => grade.grade_id.toString() !== payload.toString()),
      };

    case FETCH_GRADE_FAILURE:
      return {
        ...state,
        fetchGradeStatus: 'failure',
      };

    case FETCH_GRADE_REQUESTED:
      return {
        ...state,
        fetchGradeStatus: 'fetching',
      };

    case FETCH_GRADE_SUCCESS:
      return {
        ...state,
        fetchGradeStatus: 'success',
        grades: payload,
      };

    case FETCH_SINGLE_GRADE_FAILURE:
      return {
        ...state,
        fetchSingleGradeStatus: 'failure',
      };

    case FETCH_SINGLE_GRADE_REQUESTED:
      return {
        ...state,
        fetchSingleGradeStatus: 'fetching',
      };

    case FETCH_SINGLE_GRADE_SUCCESS:
      return {
        ...state,
        fetchSingleGradeStatus: 'success',
        form: {
          ...state.form,
          ...payload,
        },
      };

    case UPDATE_GRADE_FORM:
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
