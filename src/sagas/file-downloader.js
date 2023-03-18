import { all, call, put, takeLatest } from 'redux-saga/effects';
import { DOWNLOAD_FILE, downloadFileFailure, downloadFileRequested, downloadFileSuccess } from '../actions/file-downloader-action-types';
import httpClient from './http-client';

export function* downloadFileHandler({ payload }) {
  yield put(downloadFileRequested());

  const request = {
    method: 'GET',
    responseType: 'blob',
    url: payload.url,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(downloadFileFailure(error));
  } else {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');

    link.setAttribute('download', payload.filename);
    link.href = url;

    document.body.appendChild(link);

    link.click();

    yield put(downloadFileSuccess());
  }
}

function* FileDownloader() {
  yield all([
    takeLatest(DOWNLOAD_FILE, downloadFileHandler),
  ]);
}

export default FileDownloader;
