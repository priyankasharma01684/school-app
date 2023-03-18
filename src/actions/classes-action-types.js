import { createAction } from 'redux-actions';

export const CREATE_CLASS = 'CREATE_CLASS';
export const createClass = createAction(CREATE_CLASS);

export const CREATE_CLASS_FAILURE = 'CREATE_CLASS_FAILURE';
export const createClassFailure = createAction(CREATE_CLASS_FAILURE);

export const CREATE_CLASS_REQUESTED = 'CREATE_CLASS_REQUESTED';
export const createClassRequested = createAction(CREATE_CLASS_REQUESTED);

export const CREATE_CLASS_SUCCESS = 'CREATE_CLASS_SUCCESS';
export const createClassSuccess = createAction(CREATE_CLASS_SUCCESS);

export const DELETE_CLASS = 'DELETE_CLASS';
export const deleteClass = createAction(DELETE_CLASS);

export const DELETE_CLASS_FAILURE = 'DELETE_CLASS_FAILURE';
export const deleteClassFailure = createAction(DELETE_CLASS_FAILURE);

export const DELETE_CLASS_REQUESTED = 'DELETE_CLASS_REQUESTED';
export const deleteClassRequested = createAction(DELETE_CLASS_REQUESTED);

export const DELETE_CLASS_SUCCESS = 'DELETE_CLASS_SUCCESS';
export const deleteClassSuccess = createAction(DELETE_CLASS_SUCCESS);

export const EDIT_CLASS = 'EDIT_CLASS';
export const editClass = createAction(EDIT_CLASS);

export const EDIT_CLASS_FAILURE = 'EDIT_CLASS_FAILURE';
export const editClassFailure = createAction(EDIT_CLASS_FAILURE);

export const EDIT_CLASS_REQUESTED = 'EDIT_CLASS_REQUESTED';
export const editClassRequested = createAction(EDIT_CLASS_REQUESTED);

export const EDIT_CLASS_SUCCESS = 'EDIT_CLASS_SUCCESS';
export const editClassSuccess = createAction(EDIT_CLASS_SUCCESS);

export const FETCH_SINGLE_CLASS = 'FETCH_SINGLE_CLASS';
export const fetchSingleClass = createAction(FETCH_SINGLE_CLASS);

export const FETCH_SINGLE_CLASS_FAILURE = 'FETCH_SINGLE_CLASS_FAILURE';
export const fetchSingleClassFailure = createAction(FETCH_SINGLE_CLASS_FAILURE);

export const FETCH_SINGLE_CLASS_REQUESTED = 'FETCH_SINGLE_CLASS_REQUESTED';
export const fetchSingleClassRequested = createAction(FETCH_SINGLE_CLASS_REQUESTED);

export const FETCH_SINGLE_CLASS_SUCCESS = 'FETCH_SINGLE_CLASS_SUCCESS';
export const fetchSingleClassSuccess = createAction(FETCH_SINGLE_CLASS_SUCCESS);

export const FETCH_CLASSES = 'FETCH_CLASSES';
export const fetchClasses = createAction(FETCH_CLASSES);

export const FETCH_CLASSES_FAILURE = 'FETCH_CLASSES_FAILURE';
export const fetchClassesFailure = createAction(FETCH_CLASSES_FAILURE);

export const FETCH_CLASSES_REQUESTED = 'FETCH_CLASSES_REQUESTED';
export const fetchClassesRequested = createAction(FETCH_CLASSES_REQUESTED);

export const FETCH_CLASSES_SUCCESS = 'FETCH_CLASSES_SUCCESS';
export const fetchClassesSuccess = createAction(FETCH_CLASSES_SUCCESS);

export const UPDATE_CLASSES_FORM = 'UPDATE_CLASSES_FORM';
export const updateClassesForm = createAction(UPDATE_CLASSES_FORM);
