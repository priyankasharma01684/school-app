import { createAction } from 'redux-actions';

export const DOWNLOAD_FILE = 'DOWNLOAD_FILE';
export const downloadFile = createAction(DOWNLOAD_FILE);

export const DOWNLOAD_FILE_FAILURE = 'DOWNLOAD_FILE_FAILURE';
export const downloadFileFailure = createAction(DOWNLOAD_FILE_FAILURE);

export const DOWNLOAD_FILE_REQUESTED = 'DOWNLOAD_FILE_REQUESTED';
export const downloadFileRequested = createAction(DOWNLOAD_FILE_REQUESTED);

export const DOWNLOAD_FILE_SUCCESS = 'DOWNLOAD_FILE_SUCCESS';
export const downloadFileSuccess = createAction(DOWNLOAD_FILE_SUCCESS);
