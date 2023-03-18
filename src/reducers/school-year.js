import { LOCATION_CHANGE } from 'connected-react-router';
import { CREATE_SCHOOL_YEAR_FAILURE,
  CREATE_SCHOOL_YEAR_REQUESTED,
  CREATE_SCHOOL_YEAR_SUCCESS,
  DELETE_SCHOOL_YEAR_FAILURE,
  DELETE_SCHOOL_YEAR_REQUESTED,
  DELETE_SCHOOL_YEAR_SUCCESS,
  FETCH_SINGLE_SCHOOL_YEAR_FAILURE,
  FETCH_SINGLE_SCHOOL_YEAR_REQUESTED,
  FETCH_SINGLE_SCHOOL_YEAR_SUCCESS,
  FETCH_SCHOOL_YEAR_FAILURE,
  FETCH_SCHOOL_YEAR_REQUESTED,
  FETCH_SCHOOL_YEAR_SUCCESS,
  UPDATE_SCHOOL_YEAR_FORM } from '../actions/school-year-action-type';

const initialState = {
  createSchoolYearStatus: 'pending',
  deleteSchoolYearStatus: 'pending',
  fetchSchoolYearsStatus: 'pending',
  fetchSingleSchoolYearStatus: 'pending',
  form: {
    back_to_school_date: null,
    registration_start_date: null,
    school_end_year: null,
    school_start_year: null,
    school_year_end_date: null,
  },
  schoolYears: [],
};

export default function schoolYears(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case CREATE_SCHOOL_YEAR_FAILURE:
      return {
        ...state,
        createSchoolYearStatus: 'failure',
      };

    case CREATE_SCHOOL_YEAR_REQUESTED:
      return {
        ...state,
        createSchoolYearStatus: 'creating',
      };

    case CREATE_SCHOOL_YEAR_SUCCESS:
      return {
        ...state,
        createSchoolYearStatus: 'success',
      };

    case DELETE_SCHOOL_YEAR_FAILURE:
      return {
        ...state,
        deleteSchoolYearStatus: 'failure',
      };

    case DELETE_SCHOOL_YEAR_REQUESTED:
      return {
        ...state,
        deleteSchoolYearStatus: 'deleting',
      };

    case DELETE_SCHOOL_YEAR_SUCCESS:
      return {
        ...state,
        deleteSchoolYearStatus: 'success',
        schoolYears: [...state.schoolYears].filter((schoolYear) => schoolYear.school_year_id.toString() !== payload.toString()),
      };

    case FETCH_SCHOOL_YEAR_FAILURE:
      return {
        ...state,
        fetchSchoolYearsStatus: 'failure',
      };

    case FETCH_SCHOOL_YEAR_REQUESTED:
      return {
        ...state,
        fetchSchoolYearsStatus: 'fetching',
      };

    case FETCH_SCHOOL_YEAR_SUCCESS:
      return {
        ...state,
        fetchSchoolYearsStatus: 'success',
        schoolYears: payload,
      };

    case FETCH_SINGLE_SCHOOL_YEAR_FAILURE:
      return {
        ...state,
        fetchSingleSchoolYearStatus: 'failure',
      };

    case FETCH_SINGLE_SCHOOL_YEAR_REQUESTED:
      return {
        ...state,
        fetchSingleSchoolYearStatus: 'fetching',
      };

    case FETCH_SINGLE_SCHOOL_YEAR_SUCCESS:
      return {
        ...state,
        fetchSingleSchoolYearStatus: 'success',
        form: {
          ...state.form,
          ...payload,
        },
      };

    case UPDATE_SCHOOL_YEAR_FORM:
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
