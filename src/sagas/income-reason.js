import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ADD_INCOME_REASON,
  addIncomeReasonFailure,
  addIncomeReasonRequested,
  addIncomeReasonSuccess,
  DELETE_INCOME_REASON,
  deleteIncomeReasonFailure,
  deleteIncomeReasonRequested,
  deleteIncomeReasonSuccess,
  FETCH_INCOME_REASON,
  fetchIncomeReasonFailure,
  fetchIncomeReasonRequested,
  fetchIncomeReasonSuccess,
  FETCH_SINGLE_INCOME_REASON,
  fetchSingleIncomeReasonFailure,
  fetchSingleIncomeReasonRequested,
  fetchSingleIncomeReasonSuccess,
  EDIT_INCOME_REASON,
  editIncomeReasonFailure,
  editIncomeReasonRequested,
  editIncomeReasonSuccess } from '../actions/income-reason-action-types';
import httpClient from './http-client';
import Alert from '../utility/alert';
import { history } from '../index';

export function* addIncomeReasonHandler({ payload }) {
  yield put(addIncomeReasonRequested());
  const body = new FormData();

  body.append('income_reason_code', payload.income_reason_code);
  body.append('income_reason_description', payload.income_reason_description);
  body.append('source_of_income_id', payload.source_of_income_id.value);
  body.append('status', payload.status.value);

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'add-income-reason',
  };
  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(addIncomeReasonFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/income-reasons');
      },
      icon: 'success',
      message: 'Income reason created successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);
console.log(payload);
    yield put(addIncomeReasonSuccess());
  }
}

export function* editIncomeReasonHandler({ payload }) {
  yield put(editIncomeReasonRequested());

  const request = {
    method: 'PUT',
    params: {
      income_reason_code: payload.income_reason_code,
      income_reason_description: payload.income_reason_description,
      source_of_income_id: payload.source_of_income_id.value,
      status: payload.status.value,
    },
    url: `update-income-reason/${payload.income_reason_id}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(editIncomeReasonFailure(error));
  } else {
    const alertProps = {
      callback: () => {
        history.push('/income-reasons');
      },
      icon: 'success',
      message: 'Income reason updated successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(editIncomeReasonSuccess());
  }
}

export function* deleteIncomeReasonHandler({ payload }) {
  yield put(deleteIncomeReasonRequested());

  const request = {
    method: 'DELETE',
    url: `delete-income-reason/${payload}`,
  };

  const { error } = yield call(httpClient, request);

  if (error) {
    yield put(deleteIncomeReasonFailure(error));
  } else {
    const alertProps = {
      icon: 'success',
      message: 'Income reason deleted successfully.',
      title: 'Success',
    };

    Alert.alert(alertProps);

    yield put(deleteIncomeReasonSuccess(payload));
  }
}

export function* fetchIncomeReasonHandler({ payload }) {
  yield put(fetchIncomeReasonRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'list-income-reason',
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchIncomeReasonFailure(error));
  } else {
    yield put(fetchIncomeReasonSuccess(data.data.result));
  }
}

export function* fetchSingleIncomeReasonHandler({ payload }) {
  yield put(fetchSingleIncomeReasonRequested());

  const request = {
    method: 'GET',
    url: `view-income-reason/${payload}`,
  };

  const {
    data, error,
  } = yield call(httpClient, request);

  if (error) {
    yield put(fetchSingleIncomeReasonFailure(error));
  } else {
    const { result } = data.data;

    const res = {
      ...data.data.result,
      id: result.income_reason_id,
      source_of_income_id: {
        label: result.source_of_income_description,
        value: result.source_of_income_id,
      },
      status: result.status === 1 ? {
        label: 'Active',
        value: 1,
      } : {
        label: 'Inactive',
        value: 0,
      },
    };

    yield put(fetchSingleIncomeReasonSuccess(res));
  }
}

function* IncomeReason() {
  yield all([
    takeLatest(ADD_INCOME_REASON, addIncomeReasonHandler),
    takeLatest(DELETE_INCOME_REASON, deleteIncomeReasonHandler),
    takeLatest(FETCH_INCOME_REASON, fetchIncomeReasonHandler),
    takeLatest(FETCH_SINGLE_INCOME_REASON, fetchSingleIncomeReasonHandler),
    takeLatest(EDIT_INCOME_REASON, editIncomeReasonHandler),
  ]);
}

export default IncomeReason;
