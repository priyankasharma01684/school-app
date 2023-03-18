import { createAction } from 'redux-actions';

export const CREATE_INSTALLMENT = 'CREATE_INSTALLMENT';
export const createInstallment = createAction(CREATE_INSTALLMENT);

export const CREATE_INSTALLMENT_FAILURE = 'CREATE_INSTALLMENT_FAILURE';
export const createInstallmentFailure = createAction(CREATE_INSTALLMENT_FAILURE);

export const CREATE_INSTALLMENT_REQUESTED = 'CREATE_INSTALLMENT_REQUESTED';
export const createInstallmentRequested = createAction(CREATE_INSTALLMENT_REQUESTED);

export const CREATE_INSTALLMENT_SUCCESS = 'CREATE_INSTALLMENT_SUCCESS';
export const createInstallmentSuccess = createAction(CREATE_INSTALLMENT_SUCCESS);

export const DELETE_INSTALLMENT = 'DELETE_INSTALLMENT';
export const deleteInstallment = createAction(DELETE_INSTALLMENT);

export const DELETE_INSTALLMENT_FAILURE = 'DELETE_INSTALLMENT_FAILURE';
export const deleteInstallmentFailure = createAction(DELETE_INSTALLMENT_FAILURE);

export const DELETE_INSTALLMENT_REQUESTED = 'DELETE_INSTALLMENT_REQUESTED';
export const deleteInstallmentRequested = createAction(DELETE_INSTALLMENT_REQUESTED);

export const DELETE_INSTALLMENT_SUCCESS = 'DELETE_INSTALLMENT_SUCCESS';
export const deleteInstallmentSuccess = createAction(DELETE_INSTALLMENT_SUCCESS);

export const EDIT_INSTALLMENT = 'EDIT_INSTALLMENT';
export const editInstallment = createAction(EDIT_INSTALLMENT);

export const EDIT_INSTALLMENT_FAILURE = 'EDIT_INSTALLMENT_FAILURE';
export const editInstallmentFailure = createAction(EDIT_INSTALLMENT_FAILURE);

export const EDIT_INSTALLMENT_REQUESTED = 'EDIT_INSTALLMENT_REQUESTED';
export const editInstallmentRequested = createAction(EDIT_INSTALLMENT_REQUESTED);

export const EDIT_INSTALLMENT_SUCCESS = 'EDIT_INSTALLMENT_SUCCESS';
export const editInstallmentSuccess = createAction(EDIT_INSTALLMENT_SUCCESS);

export const FETCH_SINGLE_INSTALLMENT = 'FETCH_SINGLE_INSTALLMENT';
export const fetchSingleInstallment = createAction(FETCH_SINGLE_INSTALLMENT);

export const FETCH_SINGLE_INSTALLMENT_FAILURE = 'FETCH_SINGLE_INSTALLMENT_FAILURE';
export const fetchSingleInstallmentFailure = createAction(FETCH_SINGLE_INSTALLMENT_FAILURE);

export const FETCH_SINGLE_INSTALLMENT_REQUESTED = 'FETCH_SINGLE_INSTALLMENT_REQUESTED';
export const fetchSingleInstallmentRequested = createAction(FETCH_SINGLE_INSTALLMENT_REQUESTED);

export const FETCH_SINGLE_INSTALLMENT_SUCCESS = 'FETCH_SINGLE_INSTALLMENT_SUCCESS';
export const fetchSingleInstallmentSuccess = createAction(FETCH_SINGLE_INSTALLMENT_SUCCESS);

export const FETCH_INSTALLMENT = 'FETCH_INSTALLMENT';
export const fetchInstallment = createAction(FETCH_INSTALLMENT);

export const FETCH_INSTALLMENT_FAILURE = 'FETCH_INSTALLMENT_FAILURE';
export const fetchInstallmentFailure = createAction(FETCH_INSTALLMENT_FAILURE);

export const FETCH_INSTALLMENT_REQUESTED = 'FETCH_INSTALLMENT_REQUESTED';
export const fetchInstallmentRequested = createAction(FETCH_INSTALLMENT_REQUESTED);

export const FETCH_INSTALLMENT_SUCCESS = 'FETCH_INSTALLMENT_SUCCESS';
export const fetchInstallmentSuccess = createAction(FETCH_INSTALLMENT_SUCCESS);

export const UPDATE_INSTALLMENT_FORM = 'UPDATE_INSTALLMENT_FORM';
export const updateInstallmentForm = createAction(UPDATE_INSTALLMENT_FORM);
