import { createAction } from 'redux-actions';

export const CREATE_ENROLLMENT = 'CREATE_ENROLLMENT';
export const createEnrollment = createAction(CREATE_ENROLLMENT);

export const CREATE_ENROLLMENT_FAILURE = 'CREATE_ENROLLMENT_FAILURE';
export const createEnrollmentFailure = createAction(CREATE_ENROLLMENT_FAILURE);

export const CREATE_ENROLLMENT_REQUESTED = 'CREATE_ENROLLMENT_REQUESTED';
export const createEnrollmentRequested = createAction(CREATE_ENROLLMENT_REQUESTED);

export const CREATE_ENROLLMENT_SUCCESS = 'CREATE_ENROLLMENT_SUCCESS';
export const createEnrollmentSuccess = createAction(CREATE_ENROLLMENT_SUCCESS);

export const DELETE_ENROLLMENT = 'DELETE_ENROLLMENT';
export const deleteEnrollment = createAction(DELETE_ENROLLMENT);

export const DELETE_ENROLLMENT_FAILURE = 'DELETE_ENROLLMENT_FAILURE';
export const deleteEnrollmentFailure = createAction(DELETE_ENROLLMENT_FAILURE);

export const DELETE_ENROLLMENT_REQUESTED = 'DELETE_ENROLLMENT_REQUESTED';
export const deleteEnrollmentRequested = createAction(DELETE_ENROLLMENT_REQUESTED);

export const DELETE_ENROLLMENT_SUCCESS = 'DELETE_ENROLLMENT_SUCCESS';
export const deleteEnrollmentSuccess = createAction(DELETE_ENROLLMENT_SUCCESS);

export const EDIT_ENROLLMENT = 'EDIT_ENROLLMENT';
export const editEnrollment = createAction(EDIT_ENROLLMENT);

export const EDIT_ENROLLMENT_FAILURE = 'EDIT_ENROLLMENT_FAILURE';
export const editEnrollmentFailure = createAction(EDIT_ENROLLMENT_FAILURE);

export const EDIT_ENROLLMENT_REQUESTED = 'EDIT_ENROLLMENT_REQUESTED';
export const editEnrollmentRequested = createAction(EDIT_ENROLLMENT_REQUESTED);

export const EDIT_ENROLLMENT_SUCCESS = 'EDIT_ENROLLMENT_SUCCESS';
export const editEnrollmentSuccess = createAction(EDIT_ENROLLMENT_SUCCESS);

export const FETCH_SINGLE_ENROLLMENT = 'FETCH_SINGLE_ENROLLMENT';
export const fetchSingleEnrollment = createAction(FETCH_SINGLE_ENROLLMENT);

export const FETCH_SINGLE_ENROLLMENT_FAILURE = 'FETCH_SINGLE_ENROLLMENT_FAILURE';
export const fetchSingleEnrollmentFailure = createAction(FETCH_SINGLE_ENROLLMENT_FAILURE);

export const FETCH_SINGLE_ENROLLMENT_REQUESTED = 'FETCH_SINGLE_ENROLLMENT_REQUESTED';
export const fetchSingleEnrollmentRequested = createAction(FETCH_SINGLE_ENROLLMENT_REQUESTED);

export const FETCH_SINGLE_ENROLLMENT_SUCCESS = 'FETCH_SINGLE_ENROLLMENT_SUCCESS';
export const fetchSingleEnrollmentSuccess = createAction(FETCH_SINGLE_ENROLLMENT_SUCCESS);

export const FETCH_ENROLLMENT = 'FETCH_ENROLLMENT';
export const fetchEnrollment = createAction(FETCH_ENROLLMENT);

export const FETCH_ENROLLMENT_FAILURE = 'FETCH_ENROLLMENT_FAILURE';
export const fetchEnrollmentFailure = createAction(FETCH_ENROLLMENT_FAILURE);

export const FETCH_ENROLLMENT_REQUESTED = 'FETCH_ENROLLMENT_REQUESTED';
export const fetchEnrollmentRequested = createAction(FETCH_ENROLLMENT_REQUESTED);

export const FETCH_ENROLLMENT_SUCCESS = 'FETCH_ENROLLMENT_SUCCESS';
export const fetchEnrollmentSuccess = createAction(FETCH_ENROLLMENT_SUCCESS);

export const UPDATE_ENROLLMENT_FORM = 'UPDATE_ENROLLMENT_FORM';
export const updateEnrollmentForm = createAction(UPDATE_ENROLLMENT_FORM);

export const FETCH_ENROLLED_STUDENTS = 'FETCH_ENROLLED_STUDENTS';
export const fetchEnrolledStudents = createAction(FETCH_ENROLLED_STUDENTS);

export const FETCH_ENROLLED_STUDENTS_FAILURE = 'FETCH_ENROLLED_STUDENTS_FAILURE';
export const fetchEnrolledStudentsFailure = createAction(FETCH_ENROLLED_STUDENTS_FAILURE);

export const FETCH_ENROLLED_STUDENTS_REQUESTED = 'FETCH_ENROLLED_STUDENTS_REQUESTED';
export const fetchEnrolledStudentsRequested = createAction(FETCH_ENROLLED_STUDENTS_REQUESTED);

export const FETCH_ENROLLED_STUDENTS_SUCCESS = 'FETCH_ENROLLED_STUDENTS_SUCCESS';
export const fetchEnrolledStudentsSuccess = createAction(FETCH_ENROLLED_STUDENTS_SUCCESS);


export const FETCH_STUDENTS_INSTALLMENT = 'FETCH_STUDENTS_INSTALLMENT';
export const fetchStudentsInstallment = createAction(FETCH_STUDENTS_INSTALLMENT);

export const FETCH_STUDENTS_INSTALLMENT_FAILURE = 'FETCH_STUDENTS_INSTALLMENT_FAILURE';
export const fetchStudentsInstallmentFailure = createAction(FETCH_STUDENTS_INSTALLMENT_FAILURE);

export const FETCH_STUDENTS_INSTALLMENT_REQUESTED = 'FETCH_STUDENTS_INSTALLMENT_REQUESTED';
export const fetchStudentsInstallmentRequested = createAction(FETCH_STUDENTS_INSTALLMENT_REQUESTED);

export const FETCH_STUDENTS_INSTALLMENT_SUCCESS = 'FETCH_STUDENTS_INSTALLMENT_SUCCESS';
export const fetchStudentsInstallmentSuccess = createAction(FETCH_STUDENTS_INSTALLMENT_SUCCESS);
