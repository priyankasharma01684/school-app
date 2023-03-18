import { createAction } from 'redux-actions';

export const CERTIFICATE_FORM = 'CERTIFICATE_FORM';
export const certificateForm = createAction(CERTIFICATE_FORM);

export const CERTIFICATE_FORM_FAILURE = 'CERTIFICATE_FORM_FAILURE';
export const certificateFormFailure = createAction(CERTIFICATE_FORM_FAILURE);

export const CERTIFICATE_FORM_REQUESTED = 'CERTIFICATE_FORM_REQUESTED';
export const certificateFormRequested = createAction(CERTIFICATE_FORM_REQUESTED);

export const CERTIFICATE_FORM_SUCCESS = 'CERTIFICATE_FORM_SUCCESS';
export const certificateFormSuccess = createAction(CERTIFICATE_FORM_SUCCESS);
