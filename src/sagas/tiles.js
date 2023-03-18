import { all, call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { FETCH_TILES,
  fetchTilesFailure,
  fetchTilesRequested,
  fetchTilesSuccess,
  FETCH_SELECTED_TILES,
  fetchSelectedTilesFailure,
  fetchSelectedTilesRequested,
  fetchSelectedTilesSuccess } from '../actions/tiles-action-types';
import httpClient from './http-client';

function* fetchTilesHandler({ payload }) {
  yield put(fetchTilesRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'dashboard',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchTilesFailure(error));
  } else {
    yield put(fetchTilesSuccess(data.data.result));
  }
}
function* fetchSelectedTilesHandler({ payload }) {
  yield put(fetchSelectedTilesRequested());
  let from = moment().subtract(30, 'days').toDate();

  let to = moment().toDate();

  if (payload?.from) {
    from = payload?.from;
  }

  if (payload?.to) {
    to = payload?.to;
  }

  const request = {
    method: 'GET',
    params: {
      from: moment(from, 'X').startOf('day').toDate(),
      to: moment(to, 'X').endOf('day').toDate(),
    },
    url: 'dashboard-filter',
  };

  const {
    data, error,
  } = yield call(httpClient, request, false);

  if (error) {
    yield put(fetchSelectedTilesFailure(error));
  } else {
    yield put(fetchSelectedTilesSuccess(data.data.result));
  }
}
function* tiles() {
  yield all([
    takeLatest(FETCH_SELECTED_TILES, fetchSelectedTilesHandler),
    takeLatest(FETCH_TILES, fetchTilesHandler),
  ]);
}

export default tiles;
