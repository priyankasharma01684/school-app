import { DOWNLOAD_SAMPLE_FILE_FAILURE,
  DOWNLOAD_SAMPLE_FILE_REQUESTED,
  DOWNLOAD_SAMPLE_FILE_SUCCESS,
  UPLOAD_BULK_DATA_FILE_FAILURE,
  UPLOAD_BULK_DATA_FILE_REQUESTED,
  UPLOAD_BULK_DATA_FILE_SUCCESS } from '../actions/bulk-upload-action-types';

const initialState = {
  downloadFileStatus: 'pending',
  uploadFileStatus: 'pending',
};

export default function app(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case DOWNLOAD_SAMPLE_FILE_FAILURE:
      return {
        ...state,
        downloadFileStatus: 'failure',
      };

    case DOWNLOAD_SAMPLE_FILE_REQUESTED:
      return {
        ...state,
        downloadFileStatus: 'downloading',
      };

    case DOWNLOAD_SAMPLE_FILE_SUCCESS:
      return {
        ...state,
        downloadFileStatus: 'success',
      };

    case UPLOAD_BULK_DATA_FILE_FAILURE:
      return {
        ...state,
        uploadFileStatus: 'failure',
      };

    case UPLOAD_BULK_DATA_FILE_REQUESTED:
      return {
        ...state,
        uploadFileStatus: 'uploading',
      };

    case UPLOAD_BULK_DATA_FILE_SUCCESS:
      return {
        ...state,
        drawer: payload,
        uploadFileStatus: 'success',
      };

    default:
      return state;
  }
}
