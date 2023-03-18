import { all, call, put, takeLatest } from 'redux-saga/effects';
import { DOWNLOAD_SAMPLE_FILE,
  downloadSampleFileFailure,
  downloadSampleFileRequested,
  downloadSampleFileSuccess,
  UPLOAD_BULK_DATA_FILE,
  uploadBulkDataFileFailure,
  uploadBulkDataFileRequested,
  uploadBulkDataFileSuccess } from '../actions/bulk-upload-action-types';
import httpClient from './http-client';
import Alert from '../utility/alert';

export function* downloadSampleFileHandler({ payload }) {
  yield put(downloadSampleFileRequested());
  const body = new FormData();

  body.append('type', payload.type);

  const request = {
    data: body,
    method: 'POST',
    url: 'import-sample-excel',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(downloadSampleFileFailure(error));
  } else {
    window.open(data.result, '_blank');

    yield put(downloadSampleFileSuccess());
  }
}

export function* uploadBulkDataFileHandler({ payload }) {
  yield put(uploadBulkDataFileRequested());

  const body = new FormData();

  body.append('file', payload.file, payload.file.name);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: payload.url,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(uploadBulkDataFileFailure(error));
  } else {
    const alertProps = {
      icon: 'success',
      message: 'Records imported successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    if (payload.callback) {
      payload.callback();
    }

    yield put(uploadBulkDataFileSuccess());
  }
}

function* FileDownloader() {
  yield all([
    takeLatest(DOWNLOAD_SAMPLE_FILE, downloadSampleFileHandler),
    takeLatest(UPLOAD_BULK_DATA_FILE, uploadBulkDataFileHandler),
  ]);
}

export default FileDownloader;
