import { createAction } from 'redux-actions';

export const DOWNLOAD_SAMPLE_FILE = 'DOWNLOAD_SAMPLE_FILE';
export const downloadSampleFile = createAction(DOWNLOAD_SAMPLE_FILE);

export const DOWNLOAD_SAMPLE_FILE_FAILURE = 'DOWNLOAD_SAMPLE_FILE_FAILURE';
export const downloadSampleFileFailure = createAction(DOWNLOAD_SAMPLE_FILE_FAILURE);

export const DOWNLOAD_SAMPLE_FILE_REQUESTED = 'DOWNLOAD_SAMPLE_FILE_REQUESTED';
export const downloadSampleFileRequested = createAction(DOWNLOAD_SAMPLE_FILE_REQUESTED);

export const DOWNLOAD_SAMPLE_FILE_SUCCESS = 'DOWNLOAD_SAMPLE_FILE_SUCCESS';
export const downloadSampleFileSuccess = createAction(DOWNLOAD_SAMPLE_FILE_SUCCESS);

export const UPLOAD_BULK_DATA_FILE = 'UPLOAD_BULK_DATA_FILE';
export const uploadBulkDataFile = createAction(UPLOAD_BULK_DATA_FILE);

export const UPLOAD_BULK_DATA_FILE_FAILURE = 'UPLOAD_BULK_DATA_FILE_FAILURE';
export const uploadBulkDataFileFailure = createAction(UPLOAD_BULK_DATA_FILE_FAILURE);

export const UPLOAD_BULK_DATA_FILE_REQUESTED = 'UPLOAD_BULK_DATA_FILE_REQUESTED';
export const uploadBulkDataFileRequested = createAction(UPLOAD_BULK_DATA_FILE_REQUESTED);

export const UPLOAD_BULK_DATA_FILE_SUCCESS = 'UPLOAD_BULK_DATA_FILE_SUCCESS';
export const uploadBulkDataFileSuccess = createAction(UPLOAD_BULK_DATA_FILE_SUCCESS);
