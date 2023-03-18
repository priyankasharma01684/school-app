import { createAction } from 'redux-actions';

export const ADD_SCHOOL = 'ADD_SCHOOL';
export const addSchool = createAction(ADD_SCHOOL);

export const ADD_SCHOOL_FAILURE = 'ADD_SCHOOL_FAILURE';
export const addSchoolFailure = createAction(ADD_SCHOOL_FAILURE);

export const ADD_SCHOOL_REQUESTED = 'ADD_SCHOOL_REQUESTED';
export const addSchoolRequested = createAction(ADD_SCHOOL_REQUESTED);

export const ADD_SCHOOL_SUCCESS = 'ADD_SCHOOL_SUCCESS';
export const addSchoolSuccess = createAction(ADD_SCHOOL_SUCCESS);

export const DELETE_SCHOOL = 'DELETE_SCHOOL';
export const deleteSchool = createAction(DELETE_SCHOOL);

export const DELETE_SCHOOL_FAILURE = 'DELETE_SCHOOL_FAILURE';
export const deleteSchoolFailure = createAction(DELETE_SCHOOL_FAILURE);

export const DELETE_SCHOOL_REQUESTED = 'DELETE_SCHOOL_REQUESTED';
export const deleteSchoolRequested = createAction(DELETE_SCHOOL_REQUESTED);

export const DELETE_SCHOOL_SUCCESS = 'DELETE_SCHOOL_SUCCESS';
export const deleteSchoolSuccess = createAction(DELETE_SCHOOL_SUCCESS);

export const EDIT_SCHOOL = 'EDIT_SCHOOL';
export const editSchool = createAction(EDIT_SCHOOL);

export const EDIT_SCHOOL_FAILURE = 'EDIT_SCHOOL_FAILURE';
export const editSchoolFailure = createAction(EDIT_SCHOOL_FAILURE);

export const EDIT_SCHOOL_REQUESTED = 'EDIT_SCHOOL_REQUESTED';
export const editSchoolRequested = createAction(EDIT_SCHOOL_REQUESTED);

export const EDIT_SCHOOL_SUCCESS = 'EDIT_SCHOOL_SUCCESS';
export const editSchoolSuccess = createAction(EDIT_SCHOOL_SUCCESS);

export const FETCH_SCHOOLS = 'FETCH_SCHOOLS';
export const fetchSchools = createAction(FETCH_SCHOOLS);

export const FETCH_SCHOOLS_FAILURE = 'FETCH_SCHOOLS_FAILURE';
export const fetchSchoolsFailure = createAction(FETCH_SCHOOLS_FAILURE);

export const FETCH_SCHOOLS_REQUESTED = 'FETCH_SCHOOLS_REQUESTED';
export const fetchSchoolsRequested = createAction(FETCH_SCHOOLS_REQUESTED);

export const FETCH_SCHOOLS_SUCCESS = 'FETCH_SCHOOLS_SUCCESS';
export const fetchSchoolsSuccess = createAction(FETCH_SCHOOLS_SUCCESS);

export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
export const fetchCountries = createAction(FETCH_COUNTRIES);

export const FETCH_COUNTRIES_FAILURE = 'FETCH_COUNTRIES_FAILURE';
export const fetchCountriesFailure = createAction(FETCH_COUNTRIES_FAILURE);

export const FETCH_COUNTRIES_REQUESTED = 'FETCH_COUNTRIES_REQUESTED';
export const fetchCountriesRequested = createAction(FETCH_COUNTRIES_REQUESTED);

export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const fetchCountriesSuccess = createAction(FETCH_COUNTRIES_SUCCESS);

export const FETCH_CITIES = 'FETCH_CITIES';
export const fetchCities = createAction(FETCH_CITIES);

export const FETCH_CITIES_FAILURE = 'FETCH_CITIES_FAILURE';
export const fetchCitiesFailure = createAction(FETCH_CITIES_FAILURE);

export const FETCH_CITIES_REQUESTED = 'FETCH_CITIES_REQUESTED';
export const fetchCitiesRequested = createAction(FETCH_CITIES_REQUESTED);

export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS';
export const fetchCitiesSuccess = createAction(FETCH_CITIES_SUCCESS);

export const FETCH_SCHOOL_CATEGORIES = 'FETCH_SCHOOL_CATEGORIES';
export const fetchSchoolCategories = createAction(FETCH_SCHOOL_CATEGORIES);

export const FETCH_SCHOOL_CATEGORIES_FAILURE = 'FETCH_SCHOOL_CATEGORIES_FAILURE';
export const fetchSchoolCategoriesFailure = createAction(FETCH_SCHOOL_CATEGORIES_FAILURE);

export const FETCH_SCHOOL_CATEGORIES_REQUESTED = 'FETCH_SCHOOL_CATEGORIES_REQUESTED';
export const fetchSchoolCategoriesRequested = createAction(FETCH_SCHOOL_CATEGORIES_REQUESTED);

export const FETCH_SCHOOL_CATEGORIES_SUCCESS = 'FETCH_SCHOOL_CATEGORIES_SUCCESS';
export const fetchSchoolCategoriesSuccess = createAction(FETCH_SCHOOL_CATEGORIES_SUCCESS);

export const FETCH_SINGLE_SCHOOL = 'FETCH_SINGLE_SCHOOL';
export const fetchSingleSchool = createAction(FETCH_SINGLE_SCHOOL);

export const FETCH_SINGLE_SCHOOL_FAILURE = 'FETCH_SINGLE_SCHOOL_FAILURE';
export const fetchSingleSchoolFailure = createAction(FETCH_SINGLE_SCHOOL_FAILURE);

export const FETCH_SINGLE_SCHOOL_REQUESTED = 'FETCH_SINGLE_SCHOOL_REQUESTED';
export const fetchSingleSchoolRequested = createAction(FETCH_SINGLE_SCHOOL_REQUESTED);

export const FETCH_SINGLE_SCHOOL_SUCCESS = 'FETCH_SINGLE_SCHOOL_SUCCESS';
export const fetchSingleSchoolSuccess = createAction(FETCH_SINGLE_SCHOOL_SUCCESS);

export const UPDATE_SCHOOL_FORM = 'UPDATE_SCHOOL_FORM';
export const updateSchoolForm = createAction(UPDATE_SCHOOL_FORM);
