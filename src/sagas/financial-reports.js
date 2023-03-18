import { all, call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_FINANCIAL_REPORT,
  fetchFinancialReportFailure,
  fetchFinancialReportRequested,
  fetchFinancialReportSuccess,
  FETCH_FILTER_FINANCIAL_REPORT,
  fetchFilterFinancialReportFailure,
  fetchFilterFinancialReportRequested,
  fetchFilterFinancialReportSuccess,
  FETCH_RECAP_TABLE,
  fetchRecapTableFailure,
  fetchRecapTableRequested,
  fetchRecapTableSuccess } from '../actions/financial-reports-action-types';
import httpClient from './http-client';

export function* fetchRecapTableHandler({ payload }) {
  yield put(fetchRecapTableRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'recap-report',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchRecapTableFailure(error));
  } else {
    yield put(fetchRecapTableSuccess(data.data.result));
  }
}

export function* fetchFinancialReportHandler({ payload }) {
  yield put(fetchFinancialReportRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'information-report',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchFinancialReportFailure(error));
  } else {
    yield put(fetchFinancialReportSuccess(data.data.result));
  }
}

export function* fetchFilterFinancialReportHandler({ payload }) {
  yield put(fetchFilterFinancialReportRequested());

  const values = payload.class_id?.map((u) => u.value);
  const valueArray = [];

  valueArray.push(values);
  const request = {
    method: 'GET',

    params: {
      class_id: (valueArray || '').toString(),
      section: payload.section?.value,
    },
    url: 'information-filter',
  };
  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchFilterFinancialReportFailure(error));
  } else {
    yield put(fetchFilterFinancialReportSuccess(data?.data?.result || []));
  }
}

function* FinanceReport() {
  yield all([
    takeLatest(FETCH_RECAP_TABLE, fetchRecapTableHandler),
    takeLatest(FETCH_FINANCIAL_REPORT, fetchFinancialReportHandler),
    takeLatest(FETCH_FILTER_FINANCIAL_REPORT, fetchFilterFinancialReportHandler),
  ]);
}

export default FinanceReport;
