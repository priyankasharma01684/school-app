import { createAction } from 'redux-actions';

export const ADD_GRADE = 'ADD_GRADE';
export const addGrade = createAction(ADD_GRADE);

export const ADD_GRADE_FAILURE = 'ADD_GRADE_FAILURE';
export const addGradeFailure = createAction(ADD_GRADE_FAILURE);

export const ADD_GRADE_REQUESTED = 'ADD_GRADE_REQUESTED';
export const addGradeRequested = createAction(ADD_GRADE_REQUESTED);

export const ADD_GRADE_SUCCESS = 'ADD_GRADE_SUCCESS';
export const addGradeSuccess = createAction(ADD_GRADE_SUCCESS);

export const EDIT_GRADE = 'EDIT_GRADE';
export const editGrade = createAction(EDIT_GRADE);

export const EDIT_GRADE_FAILURE = 'EDIT_GRADE_FAILURE';
export const editGradeFailure = createAction(EDIT_GRADE_FAILURE);

export const EDIT_GRADE_REQUESTED = 'EDIT_GRADE_REQUESTED';
export const editGradeRequested = createAction(EDIT_GRADE_REQUESTED);

export const EDIT_GRADE_SUCCESS = 'EDIT_GRADE_SUCCESS';
export const editGradeSuccess = createAction(EDIT_GRADE_SUCCESS);

export const DELETE_GRADE = 'DELETE_GRADE';
export const deleteGrade = createAction(DELETE_GRADE);

export const DELETE_GRADE_FAILURE = 'DELETE_GRADE_FAILURE';
export const deleteGradeFailure = createAction(DELETE_GRADE_FAILURE);

export const DELETE_GRADE_REQUESTED = 'DELETE_GRADE_REQUESTED';
export const deleteGradeRequested = createAction(DELETE_GRADE_REQUESTED);

export const DELETE_GRADE_SUCCESS = 'DELETE_GRADE_SUCCESS';
export const deleteGradeSuccess = createAction(DELETE_GRADE_SUCCESS);

export const FETCH_GRADE = 'FETCH_GRADE';
export const fetchGrade = createAction(FETCH_GRADE);

export const FETCH_GRADE_FAILURE = 'FETCH_GRADE_FAILURE';
export const fetchGradeFailure = createAction(FETCH_GRADE_FAILURE);

export const FETCH_GRADE_REQUESTED = 'FETCH_GRADE_REQUESTED';
export const fetchGradeRequested = createAction(FETCH_GRADE_REQUESTED);

export const FETCH_GRADE_SUCCESS = 'FETCH_GRADE_SUCCESS';
export const fetchGradeSuccess = createAction(FETCH_GRADE_SUCCESS);

export const FETCH_SINGLE_GRADE = 'FETCH_SINGLE_GRADE';
export const fetchSingleGrade = createAction(FETCH_SINGLE_GRADE);

export const FETCH_SINGLE_GRADE_FAILURE = 'FETCH_SINGLE_GRADE_FAILURE';
export const fetchSingleGradeFailure = createAction(FETCH_SINGLE_GRADE_FAILURE);

export const FETCH_SINGLE_GRADE_REQUESTED = 'FETCH_SINGLE_GRADE_REQUESTED';
export const fetchSingleGradeRequested = createAction(FETCH_SINGLE_GRADE_REQUESTED);

export const FETCH_SINGLE_GRADE_SUCCESS = 'FETCH_SINGLE_GRADE_SUCCESS';
export const fetchSingleGradeSuccess = createAction(FETCH_SINGLE_GRADE_SUCCESS);

export const UPDATE_GRADE_FORM = 'UPDATE_GRADE_FORM';
export const updateGradeForm = createAction(UPDATE_GRADE_FORM);
