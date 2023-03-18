import { createAction } from 'redux-actions';

export const ADD_CLASS = 'ADD_CLASS';
export const addClass = createAction(ADD_CLASS);

export const ADD_CLASS_FAILURE = 'ADD_CLASS_FAILURE';
export const addClassFailure = createAction(ADD_CLASS_FAILURE);

export const ADD_CLASS_REQUESTED = 'ADD_CLASS_REQUESTED';
export const addClassRequested = createAction(ADD_CLASS_REQUESTED);

export const ADD_CLASS_SUCCESS = 'ADD_CLASS_SUCCESS';
export const addClassSuccess = createAction(ADD_CLASS_SUCCESS);

export const DELETE_CLASS = 'DELETE_CLASS';
export const deleteClass = createAction(DELETE_CLASS);

export const DELETE_CLASS_FAILURE = 'DELETE_CLASS_FAILURE';
export const deleteClassFailure = createAction(DELETE_CLASS_FAILURE);

export const DELETE_CLASS_REQUESTED = 'DELETE_CLASS_REQUESTED';
export const deleteClassRequested = createAction(DELETE_CLASS_REQUESTED);

export const DELETE_CLASS_SUCCESS = 'DELETE_CLASS_SUCCESS';
export const deleteClassSuccess = createAction(DELETE_CLASS_SUCCESS);

export const FETCH_CLASS = 'FETCH_CLASS';
export const fetchClass = createAction(FETCH_CLASS);

export const FETCH_CLASS_FAILURE = 'FETCH_CLASS_FAILURE';
export const fetchClassFailure = createAction(FETCH_CLASS_FAILURE);

export const FETCH_CLASS_REQUESTED = 'FETCH_CLASS_REQUESTED';
export const fetchClassRequested = createAction(FETCH_CLASS_REQUESTED);

export const FETCH_CLASS_SUCCESS = 'FETCH_CLASS_SUCCESS';
export const fetchClassSuccess = createAction(FETCH_CLASS_SUCCESS);
