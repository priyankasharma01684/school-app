import { createAction } from 'redux-actions';

export const CREATE_STUDENT = 'CREATE_STUDENT';
export const createStudent = createAction(CREATE_STUDENT);

export const CREATE_STUDENT_FAILURE = 'CREATE_STUDENT_FAILURE';
export const createStudentFailure = createAction(CREATE_STUDENT_FAILURE);

export const CREATE_STUDENT_REQUESTED = 'CREATE_STUDENT_REQUESTED';
export const createStudentRequested = createAction(CREATE_STUDENT_REQUESTED);

export const CREATE_STUDENT_SUCCESS = 'CREATE_STUDENT_SUCCESS';
export const createStudentSuccess = createAction(CREATE_STUDENT_SUCCESS);

export const DELETE_STUDENT = 'DELETE_STUDENT';
export const deleteStudent = createAction(DELETE_STUDENT);

export const DELETE_STUDENT_FAILURE = 'DELETE_STUDENT_FAILURE';
export const deleteStudentFailure = createAction(DELETE_STUDENT_FAILURE);

export const DELETE_STUDENT_REQUESTED = 'DELETE_STUDENT_REQUESTED';
export const deleteStudentRequested = createAction(DELETE_STUDENT_REQUESTED);

export const DELETE_STUDENT_SUCCESS = 'DELETE_STUDENT_SUCCESS';
export const deleteStudentSuccess = createAction(DELETE_STUDENT_SUCCESS);

export const EDIT_MORATORIUM_DATE = 'EDIT_MORATORIUM_DATE';
export const editMoratoriumDate = createAction(EDIT_MORATORIUM_DATE);

export const EDIT_MORATORIUM_FAILURE = 'EDIT_MORATORIUM_FAILURE';
export const editMoratoriumDateFailure = createAction(EDIT_MORATORIUM_FAILURE);

export const EDIT_MORATORIUM_REQUESTED = 'EDIT_MORATORIUM_REQUESTED';
export const editMoratoriumDateRequested = createAction(EDIT_MORATORIUM_REQUESTED);

export const EDIT_MORATORIUM_SUCCESS = 'EDIT_MORATORIUM_SUCCESS';
export const editMoratoriumDateSuccess = createAction(EDIT_MORATORIUM_SUCCESS);

export const EDIT_STUDENT = 'EDIT_STUDENT';
export const editStudent = createAction(EDIT_STUDENT);

export const EDIT_STUDENT_FAILURE = 'EDIT_STUDENT_FAILURE';
export const editStudentFailure = createAction(EDIT_STUDENT_FAILURE);

export const EDIT_STUDENT_REQUESTED = 'EDIT_STUDENT_REQUESTED';
export const editStudentRequested = createAction(EDIT_STUDENT_REQUESTED);

export const EDIT_STUDENT_SUCCESS = 'EDIT_STUDENT_SUCCESS';
export const editStudentSuccess = createAction(EDIT_STUDENT_SUCCESS);

export const FETCH_SINGLE_STUDENT = 'FETCH_SINGLE_STUDENT';
export const fetchSingleStudent = createAction(FETCH_SINGLE_STUDENT);

export const FETCH_SINGLE_STUDENT_FAILURE = 'FETCH_SINGLE_STUDENT_FAILURE';
export const fetchSingleStudentFailure = createAction(FETCH_SINGLE_STUDENT_FAILURE);

export const FETCH_SINGLE_STUDENT_REQUESTED = 'FETCH_SINGLE_STUDENT_REQUESTED';
export const fetchSingleStudentRequested = createAction(FETCH_SINGLE_STUDENT_REQUESTED);

export const FETCH_SINGLE_STUDENT_SUCCESS = 'FETCH_SINGLE_STUDENT_SUCCESS';
export const fetchSingleStudentSuccess = createAction(FETCH_SINGLE_STUDENT_SUCCESS);

export const FETCH_STUDENTS = 'FETCH_STUDENTS';
export const fetchStudents = createAction(FETCH_STUDENTS);

export const FETCH_STUDENTS_FAILURE = 'FETCH_STUDENTS_FAILURE';
export const fetchStudentsFailure = createAction(FETCH_STUDENTS_FAILURE);

export const FETCH_STUDENTS_REQUESTED = 'FETCH_STUDENTS_REQUESTED';
export const fetchStudentsRequested = createAction(FETCH_STUDENTS_REQUESTED);

export const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
export const fetchStudentsSuccess = createAction(FETCH_STUDENTS_SUCCESS);

export const UPDATE_STUDENT_FORM = 'UPDATE_STUDENT_FORM';
export const updateStudentForm = createAction(UPDATE_STUDENT_FORM);

export const UPDATE_MORATORIUM_DATE = 'UPDATE_MORATORIUM_DATE';
export const updateMoratoriumDate = createAction(UPDATE_MORATORIUM_DATE);

export const FETCH_CLASS_STUDENTS = 'FETCH_CLASS_STUDENTS';
export const fetchClassStudents = createAction(FETCH_CLASS_STUDENTS);

export const FETCH_CLASS_STUDENTS_FAILURE = 'FETCH_CLASS_STUDENTS_FAILURE';
export const fetchClassStudentsFailure = createAction(FETCH_CLASS_STUDENTS_FAILURE);

export const FETCH_CLASS_STUDENTS_REQUESTED = 'FETCH_CLASS_STUDENTS_REQUESTED';
export const fetchClassStudentsRequested = createAction(FETCH_CLASS_STUDENTS_REQUESTED);

export const FETCH_CLASS_STUDENTS_SUCCESS = 'FETCH_CLASS_STUDENTS_SUCCESS';
export const fetchClassStudentsSuccess = createAction(FETCH_CLASS_STUDENTS_SUCCESS);
