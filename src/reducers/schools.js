import { LOCATION_CHANGE } from 'connected-react-router';
import { ADD_SCHOOL_FAILURE,
  ADD_SCHOOL_REQUESTED,
  ADD_SCHOOL_SUCCESS,
  DELETE_SCHOOL_FAILURE,
  DELETE_SCHOOL_REQUESTED,
  DELETE_SCHOOL_SUCCESS,
  FETCH_CITIES_FAILURE,
  FETCH_CITIES_REQUESTED,
  FETCH_CITIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  FETCH_COUNTRIES_REQUESTED,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_SCHOOL_CATEGORIES_FAILURE,
  FETCH_SCHOOL_CATEGORIES_REQUESTED,
  FETCH_SCHOOL_CATEGORIES_SUCCESS,
  FETCH_SCHOOLS_FAILURE,
  FETCH_SCHOOLS_REQUESTED,
  FETCH_SCHOOLS_SUCCESS,
  FETCH_SINGLE_SCHOOL_FAILURE,
  FETCH_SINGLE_SCHOOL_REQUESTED,
  FETCH_SINGLE_SCHOOL_SUCCESS,
  UPDATE_SCHOOL_FORM } from '../actions/schools-action-types';

const initialState = {
  addSchoolStatus: 'pending',
  cities: [],
  counties: [],
  deleteSchoolStatus: 'pending',
  fetchCitiesStatus: 'pending',
  fetchCountiesStatus: 'pending',
  fetchSchoolCategoriesStatus: 'pending',
  fetchSchoolsStatus: 'pending',
  fetchSingleSchoolStatus: 'pending',
  form: {
    city_id: null,
    country_id: null,
    file: '',
    neighborhood: '',
    number: '',
    region: '',
    regional_delegation: '',
    school_address: '',
    school_category_id: null,
    school_email: '',
    school_licence_number: '',
    school_logo: null,
    school_name: '',
    school_password: '',
    school_phone_no: '',
    status: '',
    street: '',
    subdivision_delegation: '',
  },
  schoolCategories: [],
  schools: [],
};

export default function schools(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case ADD_SCHOOL_FAILURE:
      return {
        ...state,
        addSchoolStatus: 'failure',
      };

    case ADD_SCHOOL_REQUESTED:
      return {
        ...state,
        addSchoolStatus: 'creating',
      };

    case ADD_SCHOOL_SUCCESS:
      return {
        ...state,
        addSchoolStatus: 'success',
      };

    case DELETE_SCHOOL_FAILURE:
      return {
        ...state,
        deleteSchoolStatus: 'failure',
      };

    case DELETE_SCHOOL_REQUESTED:
      return {
        ...state,
        deleteSchoolStatus: 'deleting',
      };

    case DELETE_SCHOOL_SUCCESS:
      return {
        ...state,
        deleteSchoolStatus: 'success',
        schools: [...state.schools].filter((school) => school.school_id.toString() !== payload.toString()),
      };

    case FETCH_CITIES_FAILURE:
      return {
        ...state,
        fetchCitiesStatus: 'failure',
      };

    case FETCH_CITIES_REQUESTED:
      return {
        ...state,
        fetchCitiesStatus: 'fetching',
      };

    case FETCH_CITIES_SUCCESS:
      return {
        ...state,
        cities: payload,
        fetchCitiesStatus: 'success',
      };

    case FETCH_COUNTRIES_FAILURE:
      return {
        ...state,
        fetchCountiesStatus: 'failure',
      };

    case FETCH_COUNTRIES_REQUESTED:
      return {
        ...state,
        fetchCountiesStatus: 'fetching',
      };

    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        counties: payload,
        fetchCountiesStatus: 'success',
      };

    case FETCH_SCHOOL_CATEGORIES_FAILURE:
      return {
        ...state,
        fetchSchoolCategoriesStatus: 'failure',
      };

    case FETCH_SCHOOL_CATEGORIES_REQUESTED:
      return {
        ...state,
        fetchSchoolCategoriesStatus: 'fetching',
      };

    case FETCH_SCHOOL_CATEGORIES_SUCCESS:
      return {
        ...state,
        fetchSchoolCategoriesStatus: 'success',
        schoolCategories: payload,
      };

    case FETCH_SCHOOLS_FAILURE:
      return {
        ...state,
        fetchSchoolsStatus: 'failure',
      };

    case FETCH_SCHOOLS_REQUESTED:
      return {
        ...state,
        fetchSchoolsStatus: 'fetching',
      };

    case FETCH_SCHOOLS_SUCCESS:
      return {
        ...state,
        fetchSchoolsStatus: 'success',
        schools: payload,
      };

    case FETCH_SINGLE_SCHOOL_FAILURE:
      return {
        ...state,
        fetchSingleSchoolStatus: 'failure',
      };

    case FETCH_SINGLE_SCHOOL_REQUESTED:
      return {
        ...state,
        fetchSingleSchoolStatus: 'fetching',
      };

    case FETCH_SINGLE_SCHOOL_SUCCESS:
      return {
        ...state,
        fetchSingleSchoolStatus: 'success',
        form: {
          ...state.form,
          ...payload,
          file: encodeURI(payload.school_logo),
          school_logo: null,
        },
      };

    case UPDATE_SCHOOL_FORM:
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
