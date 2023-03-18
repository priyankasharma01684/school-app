import { createAction } from 'redux-actions';

export const CREATE_PAYMENT_TYPE = 'CREATE_PAYMENT_TYPE';
export const createPaymentType = createAction(CREATE_PAYMENT_TYPE);

export const CREATE_PAYMENT_TYPE_FAILURE = 'CREATE_PAYMENT_TYPE_FAILURE';
export const createPaymentTypeFailure = createAction(CREATE_PAYMENT_TYPE_FAILURE);

export const CREATE_PAYMENT_TYPE_REQUESTED = 'CREATE_PAYMENT_TYPE_REQUESTED';
export const createPaymentTypeRequested = createAction(CREATE_PAYMENT_TYPE_REQUESTED);

export const CREATE_PAYMENT_TYPE_SUCCESS = 'CREATE_PAYMENT_TYPE_SUCCESS';
export const createPaymentTypeSuccess = createAction(CREATE_PAYMENT_TYPE_SUCCESS);

export const DELETE_PAYMENT_TYPE = 'DELETE_PAYMENT_TYPE';
export const deletePaymentType = createAction(DELETE_PAYMENT_TYPE);

export const DELETE_PAYMENT_TYPE_FAILURE = 'DELETE_PAYMENT_TYPE_FAILURE';
export const deletePaymentTypeFailure = createAction(DELETE_PAYMENT_TYPE_FAILURE);

export const DELETE_PAYMENT_TYPE_REQUESTED = 'DELETE_PAYMENT_TYPE_REQUESTED';
export const deletePaymentTypeRequested = createAction(DELETE_PAYMENT_TYPE_REQUESTED);

export const DELETE_PAYMENT_TYPE_SUCCESS = 'DELETE_PAYMENT_TYPE_SUCCESS';
export const deletePaymentTypeSuccess = createAction(DELETE_PAYMENT_TYPE_SUCCESS);

export const EDIT_PAYMENT_TYPE = 'EDIT_PAYMENT_TYPE';
export const editPaymentType = createAction(EDIT_PAYMENT_TYPE);

export const EDIT_PAYMENT_TYPE_FAILURE = 'EDIT_PAYMENT_TYPE_FAILURE';
export const editPaymentTypeFailure = createAction(EDIT_PAYMENT_TYPE_FAILURE);

export const EDIT_PAYMENT_TYPE_REQUESTED = 'EDIT_PAYMENT_TYPE_REQUESTED';
export const editPaymentTypeRequested = createAction(EDIT_PAYMENT_TYPE_REQUESTED);

export const EDIT_PAYMENT_TYPE_SUCCESS = 'EDIT_PAYMENT_TYPE_SUCCESS';
export const editPaymentTypeSuccess = createAction(EDIT_PAYMENT_TYPE_SUCCESS);

export const FETCH_SINGLE_PAYMENT_TYPE = 'FETCH_SINGLE_PAYMENT_TYPE';
export const fetchSinglePaymentType = createAction(FETCH_SINGLE_PAYMENT_TYPE);

export const FETCH_SINGLE_PAYMENT_TYPE_FAILURE = 'FETCH_SINGLE_PAYMENT_TYPE_FAILURE';
export const fetchSinglePaymentTypeFailure = createAction(FETCH_SINGLE_PAYMENT_TYPE_FAILURE);

export const FETCH_SINGLE_PAYMENT_TYPE_REQUESTED = 'FETCH_SINGLE_PAYMENT_TYPE_REQUESTED';
export const fetchSinglePaymentTypeRequested = createAction(FETCH_SINGLE_PAYMENT_TYPE_REQUESTED);

export const FETCH_SINGLE_PAYMENT_TYPE_SUCCESS = 'FETCH_SINGLE_PAYMENT_TYPE_SUCCESS';
export const fetchSinglePaymentTypeSuccess = createAction(FETCH_SINGLE_PAYMENT_TYPE_SUCCESS);

export const FETCH_PAYMENT_TYPE = 'FETCH_PAYMENT_TYPE';
export const fetchPaymentType = createAction(FETCH_PAYMENT_TYPE);

export const FETCH_PAYMENT_TYPE_FAILURE = 'FETCH_PAYMENT_TYPE_FAILURE';
export const fetchPaymentTypeFailure = createAction(FETCH_PAYMENT_TYPE_FAILURE);

export const FETCH_PAYMENT_TYPE_REQUESTED = 'FETCH_PAYMENT_TYPE_REQUESTED';
export const fetchPaymentTypeRequested = createAction(FETCH_PAYMENT_TYPE_REQUESTED);

export const FETCH_PAYMENT_TYPE_SUCCESS = 'FETCH_PAYMENT_TYPE_SUCCESS';
export const fetchPaymentTypeSuccess = createAction(FETCH_PAYMENT_TYPE_SUCCESS);

export const UPDATE_PAYMENT_TYPE_FORM = 'UPDATE_PAYMENT_TYPE_FORM';
export const updatePaymentTypeForm = createAction(UPDATE_PAYMENT_TYPE_FORM);
